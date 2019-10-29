import { Component, OnInit } from '@angular/core';
import { ApplyMaterialBizService } from './apply-material.biz.service';
import { ApplyMaterialInfo } from 'app/domain';
import { AppBaseComponent } from 'app/apps/app-base-component';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { FoundationService, ProgCodeDataService } from 'app/services';
import { ApplyMaterialDropdownInfo } from './apply-material.info';

@Component({
    selector: 'app-apply-material',
    templateUrl: './apply-material.component.html',
    styleUrls: ['./apply-material.component.scss']
})
export class ApplyMaterialComponent extends AppBaseComponent implements OnInit {

    errorMessage = '';
    downloadUrl = '';
    displayCategory;
    lstNewItems: ApplyMaterialInfo[];
    lstDropdownInfo: ApplyMaterialDropdownInfo[] = [];
    queryObj = {
        isCompleted: 'N',
        dsApplier: [],
        applier: '',
        applierConfig: null,
        dsApplyId: [],
        apply_id: '',
        applyIdConfig: null,
        isBeforeQuery: true
    };
    applier = '';
    lstDisplayCategory = [{
        value: 1,
        description: '未结案申请',
        iconClass: 'fa-search'
    }, {
        value: 2,
        description: '已结案申请',
        iconClass: 'fa-search'
    }, {
        value: 3,
        description: '新增申请',
        iconClass: 'fa-plus'
    }];
    dsMaterialTypeahead = [];
    lstTodoApplies: string[];
    lstDoneApplies: string[];
    lstApplierId: string[];
    lstDisplay: ApplyMaterialInfo[];

    constructor(
        private bizSvc: ApplyMaterialBizService,
        private foundationSvc: FoundationService,
        private progCodeDataService: ProgCodeDataService,
        protected activatedRoute: ActivatedRoute
    ) {
        super(activatedRoute);
    }

    ngOnInit() {
        this.bizSvc.setComponent(this);
        this.lstTodoApplies = super.getApiResovleData('lstApplier') as string[];
        if (_.isEmpty(this.lstTodoApplies)) {
            this.lstTodoApplies = [];
        }
        this.initMaterialTypeahead();
        this.displayCategory = this.lstDisplayCategory[0];
        this.initSelectCategory(this.lstTodoApplies);
    }

    private initMaterialTypeahead() {
        _.each(super.getApiResovleData('lstMaterial'), (item: ApplyMaterialDropdownInfo) => {
            item.dropdownText = `${item.material_id} (${item.material}：${item.unit}：${item.unit_price} 元)`;
            this.dsMaterialTypeahead.push(item.dropdownText);
            this.lstDropdownInfo.push(item);
        });
        this.dsMaterialTypeahead = _.orderBy(this.dsMaterialTypeahead);
    }

    private initSelectCategory(lstApplier: string[]) {
        this.queryObj.applierConfig = this.getQueryTypeaheadConfig(lstApplier,
            '', (changeItem) => {
                this.queryObj.applier = changeItem;
                this.queryObj.apply_id = '';
                if (_.isEmpty(changeItem)) {
                    this.queryObj.applyIdConfig.componentApi.resetDataSourceAndSelectedValue([], '');
                } else {
                    this.bizSvc.getApplierIds({
                        applier: changeItem,
                        isCompleted: this.queryObj.isCompleted,
                        callbackFn: (lstApplierId) => {
                            this.queryObj.apply_id = _.size(lstApplierId) === 0 ? '' : lstApplierId[0];
                            this.queryObj.applyIdConfig.componentApi.resetDataSourceAndSelectedValue(lstApplierId, this.queryObj.apply_id);
                        }
                    });
                }
            });
        this.queryObj.applyIdConfig = this.getQueryTypeaheadConfig([], '', (changeItem) => {
            this.queryObj.apply_id = changeItem;
        });
    }

    private initQueryObj(isCompleted) {
        this.queryObj = {
            isCompleted: isCompleted,
            dsApplier: [],
            applier: '',
            applierConfig: null,
            dsApplyId: [],
            apply_id: '',
            applyIdConfig: null,
            isBeforeQuery: true
        };
    }

    onSelectCategory(category) {
        if (category.value === 1) {
            this.displayCategory = category;
            this.initQueryObj('N');
            this.initSelectCategory(this.lstTodoApplies);
        } else if (category.value === 2) {
            // this.ApplyMaterialBizService
            this.bizSvc.getAppierLst({
                isCompleted: 'Y',
                callbackFn: (lstAppler: string[]) => {
                    this.initQueryObj('Y');
                    this.lstDoneApplies = _.isEmpty(lstAppler) ? [] : lstAppler;
                    this.displayCategory = category;
                    this.initSelectCategory(this.lstDoneApplies);
                }
            });

        } else if (category.value === 3) {
            this.displayCategory = category;
            this.applier = '';
            const newItem = {
                apply_id: 'AM' + moment().format('YYYYMMDDHHmmssSSS')
            };
            this.setTypeaheadCompConfig(newItem, [...this.dsMaterialTypeahead]);
            this.lstNewItems = [newItem];
        }
    }

    isDisabledSaveStoreIn() {
        return _.isEmpty(this.applier) || _.some(this.lstNewItems, (item: ApplyMaterialInfo) => {
            return _.isEmpty(item.material_id) || _.isEmpty(item.apply_qty) || item.apply_qty === 0;
        });
    }


    private checkInput(): boolean {
        let isValid = true;
        this.errorMessage = '';
        _.each(this.lstNewItems, (item: ApplyMaterialInfo) => {
            item.isErrorApplyQty = undefined;
            if (!this.foundationSvc.isPositiveInteger(item.apply_qty)) {
                isValid = false;
                item.isErrorApplyQty = true;
            }
        });
        if (!isValid) {
            this.errorMessage = '*. 请输入有效的申请数量！';
            this.foundationSvc.onWarning('保存失败');
        }
        return isValid;
    }
    onSaveNewApply() {
        if (this.checkInput()) {
            const layerIndex = this.foundationSvc.showProcessLayer();
            _.each(this.lstNewItems, (item: ApplyMaterialInfo, index) => {
                item.action = 'C';
                item.sequence = index + 1;
                item.apply_operator = this.progCodeDataService.USER_INFO.user_name;
                item.apply_date = moment().format('YYYY-MM-DD HH:mm:ss');
                item.issued_qty = 0;
                item.spill_qty = 0;
                item.status = 'N';
                item.is_completed = 'N';
                item.applier = this.applier;
            });
            this.bizSvc.applyMaterials(this.lstNewItems, (tmpNewItems: ApplyMaterialInfo[]) => {
                if (!_.includes(this.lstTodoApplies, tmpNewItems[0].applier)) {
                    this.lstTodoApplies = [tmpNewItems[0].applier, ...this.lstTodoApplies];
                }
                this.onSelectCategory(this.lstDisplayCategory[0]);
                this.foundationSvc.onSuccess(`物料申请成功，申请单号：${this.lstNewItems[0].apply_id}`);
                this.foundationSvc.closeProcessLayer(layerIndex);
            }, () => {
                this.foundationSvc.closeProcessLayer(layerIndex);
            });
        }
    }

    addNewRow(iRow) {
        const newItem = {
            apply_id: this.lstNewItems[0].apply_id
        };
        this.setTypeaheadCompConfig(newItem, [...this.dsMaterialTypeahead]);
        this.lstNewItems.splice(iRow + 1, 0, newItem);
    }

    removeRow(iRow) {
        this.lstNewItems.splice(iRow, 1);
    }

    setTypeaheadCompConfig(item: ApplyMaterialInfo, dataSource) {
        item.typeaheadCompConfig = {
            inputPlaceHolder: '请选择物料',
            callbackFn: {
                getCustomDisplayText: (selectedValue: string) => {
                    const findOne = _.find(this.lstDropdownInfo, {
                        dropdownText: selectedValue
                    }) as ApplyMaterialDropdownInfo;
                    item.material_id = _.get(findOne, 'material_id', '');
                    item.material = _.get(findOne, 'material', '');
                    item.unit = _.get(findOne, 'unit', '');
                    item.unit_price = _.get(findOne, 'unit_price', '');
                    return item.material_id;
                },
            },
            initData: {
                selectedValue: '',
                dataSource: dataSource
            }
        };
    }

    getQueryTypeaheadConfig(dataSource, placeHolder, callbackFn) {
        return {
            inputPlaceHolder: placeHolder,
            callbackFn: {
                onChanged: (selectedValue) => {
                    callbackFn(selectedValue);
                }
            },
            initData: {
                selectedValue: '',
                dataSource: dataSource
            },
            componnetApi: {}
        };
    }

    deleteOneItem(deleteItem: ApplyMaterialInfo) {
        this.foundationSvc.onConfirm(`是否确定删除该笔物料申请？`,
            (index, layero) => {
                const layerIndex = this.foundationSvc.showProcessLayer();
                this.bizSvc.deleteOneItem(deleteItem, () => {
                    this.lstDisplay = _.filter(this.lstDisplay,
                        (item: ApplyMaterialInfo) => {
                            return item.apply_id !== deleteItem.apply_id || item.sequence !== deleteItem.sequence;
                        });
                    this.foundationSvc.onSuccess('删除物料申请记录成功！');
                    this.foundationSvc.closeProcessLayer(layerIndex);
                    layero.close(index);
                }, () => {
                    this.foundationSvc.closeProcessLayer(layerIndex);
                });
            }
        );
    }

    onSearchSupplyMaterial() {
        const layerIndex = this.foundationSvc.showProcessLayer();
        this.bizSvc.getApplyMaterialsById({
            apply_id: this.queryObj.apply_id,
            onSuccessFn: (applyList: ApplyMaterialInfo[]) => {
                this.lstDisplay = [...applyList];
                this.queryObj.isBeforeQuery = false;
                this.foundationSvc.closeProcessLayer(layerIndex);
            },
            onFailedFn: () => {
                this.foundationSvc.closeProcessLayer(layerIndex);
            }
        });
    }

    onDownload() {
        this.bizSvc.onDownloadStoreOut(this.queryObj.apply_id);
    }

}
