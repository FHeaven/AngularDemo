import { StoreInDropdownInfo } from './respository-manage.info';
import { Component, OnInit } from '@angular/core';
import { RespositoryManageBizService } from './respository-manage.biz.service';
import { StoreInInfo, StoreInStatusInfo } from 'app/domain';
import { AppBaseComponent } from 'app/apps/app-base-component';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as momnet from 'moment';
import { FoundationService, ProgCodeDataService } from 'app/services';

@Component({
    selector: 'app-respository-manage',
    templateUrl: './respository-manage.component.html',
    styleUrls: ['./respository-manage.component.scss']
})
export class RespositoryManageComponent extends AppBaseComponent implements OnInit {

    displayCategory;
    vendorName = '';
    lstDropdownInfo: StoreInDropdownInfo[] = [];
    downloadUrl = '';
    inputStoreInId = '';
    lstDisplayCategory = [{
        value: 1,
        description: '库存情况',
        iconClass: 'fa-coins'
    }, {
        value: 2,
        description: '入库查询',
        iconClass: 'fa-search'
    }, {
        value: 3,
        description: '新增入库',
        iconClass: 'fa-plus'
    }, {
        value: 4,
        description: '下载进仓单',
        iconClass: 'fa-file-download'
    }];


    /**
     * 新增入库
     */
    errorMessage = '';
    lstNewStoreIn: StoreInInfo[];
    dsMaterialTypeahead = [];

    /**
     * 入库查询
     */
    lstAllStoreIn: StoreInInfo[];
    lstDisplayStoreIn: StoreInInfo[];
    storeInFilterString;
    pagingStoreInObj = {
        itemsPerPage: 10,
        totalItems: 0,
        currentPageIndex: 1,
        onPageChange: (value) => {
            this.filterStoreIn(false);
        }
    };

    /**
     * 库存情况
     */
    lstAllStoreStatus: StoreInStatusInfo[];
    lstDisplayStoreStatus: StoreInStatusInfo[];
    storeStatusFilterString;
    pagingStoreStatusObj = {
        itemsPerPage: 10,
        totalItems: 0,
        currentPageIndex: 1,
        onPageChange: (value) => {
            this.filterStoreStatus(false);
        }
    };

    constructor(
        private bizSvc: RespositoryManageBizService,
        private foundationSvc: FoundationService,
        private progCodeDataService: ProgCodeDataService,
        protected activatedRoute: ActivatedRoute
    ) {
        super(activatedRoute);
    }

    ngOnInit() {
        this.bizSvc.setComponent(this);
        this.lstAllStoreIn = super.getApiResovleData('lstStoreIn') as StoreInInfo[];
        this.calculateStoreStatus();
        this.onSelectCategory(this.lstDisplayCategory[0]);
        this.initMaterialTypeahead();
    }

    private initMaterialTypeahead() {
        _.each(super.getApiResovleData('lstMaterial'), (item: StoreInDropdownInfo) => {
            item.dropdownText = `${item.material_id} (${item.material}：${item.unit}：${item.unit_price} 元)`;
            this.dsMaterialTypeahead.push(item.dropdownText);
            this.lstDropdownInfo.push(item);
        });
        this.dsMaterialTypeahead = _.orderBy(this.dsMaterialTypeahead);
    }

    private onSelectCategory(category) {
        this.displayCategory = category;
        if (category.value === 1) {
            this.filterStoreStatus();
        } else if (category.value === 2) {
            this.filterStoreIn();
        } else if (category.value === 3) {
            const storeInItem = {
                in_id: 'SI' + momnet().format('YYYYMMDDHHmmssSSS')
            };
            this.vendorName = '';
            this.setTypeaheadCompConfig(storeInItem, [...this.dsMaterialTypeahead]);
            this.lstNewStoreIn = [storeInItem];
        }
    }

    /**
     * 计算库存情况
     */
    private calculateStoreStatus() {
        const inQtyObj = {}, outQtyObj = {}, restQtyObj = {};
        this.lstAllStoreStatus = [];
        _.each(this.lstAllStoreIn, (item: StoreInInfo) => {
            const key = `${item.material_id}^${item.material}^${item.unit}^${item.unit_price}`;
            if (inQtyObj[key] === undefined) {
                inQtyObj[key] = 0;
                outQtyObj[key] = 0;
                restQtyObj[key] = 0;
            }
            inQtyObj[key] += +item.in_qty;
            outQtyObj[key] += +item.used_qty;
            restQtyObj[key] += +item.rest_qty;
        });
        _.each(inQtyObj, (value, key) => {
            const arr = key.split('^');
            this.lstAllStoreStatus.push({
                material_id: arr[0],
                material: arr[1],
                unit: arr[2],
                unit_price: arr[3],
                total_in_qty: this.foundationSvc.getNumberString(value),
                total_used_qty: this.foundationSvc.getNumberString(outQtyObj[key]),
                total_rest_qty: this.foundationSvc.getNumberString(restQtyObj[key])
            });
        });
    }

    isDisabledSaveStoreIn() {
        return _.isEmpty(this.vendorName) || _.some(this.lstNewStoreIn, (item: StoreInInfo) => {
            return _.isEmpty(item.material_id) || _.isEmpty(item.in_qty) || item.in_qty === 0;
        });
    }

    filterStoreStatus(initialPage = true) {
        let tmpStoreStatus: StoreInStatusInfo[] = [];
        if (!_.isEmpty(this.storeStatusFilterString)) {
            tmpStoreStatus = _.filter(this.lstAllStoreStatus,
                (item: StoreInStatusInfo) => {
                    return _.some(['material', 'material_id'], col => {
                        return item[col].toUpperCase().indexOf(this.storeStatusFilterString.toUpperCase()) !== -1;
                    });
                }
            );
        } else {
            tmpStoreStatus = [...this.lstAllStoreStatus];
        }
        const pagingObj = this.pagingStoreStatusObj;
        pagingObj.totalItems = _.size(tmpStoreStatus);
        pagingObj.currentPageIndex = initialPage ? 1 : pagingObj.currentPageIndex;
        if (!_.isEmpty(tmpStoreStatus)) {
            tmpStoreStatus = _.orderBy(tmpStoreStatus, ['material_id', 'material'], ['asc', 'asc']);
            const begin = (pagingObj.currentPageIndex - 1) * pagingObj.itemsPerPage;
            const end = begin + pagingObj.itemsPerPage;
            tmpStoreStatus = tmpStoreStatus.slice(begin, end);
        }
        this.lstDisplayStoreStatus = tmpStoreStatus;
    }

    private checkInput(): boolean {
        let isValid = true;
        this.errorMessage = '';
        _.each(this.lstNewStoreIn, (item: StoreInInfo) => {
            item.isErrorInQty = undefined;
            if (!this.foundationSvc.isPositiveInteger(item.in_qty)) {
                isValid = false;
                item.isErrorInQty = true;
            }
        });
        if (!isValid) {
            this.errorMessage = '*. 请输入有效的入库数量！';
            this.foundationSvc.onWarning('保存失败');
        }
        return isValid;
    }


    onSaveNewStoreIn() {
        if (this.checkInput()) {
            const layerIndex = this.foundationSvc.showProcessLayer();
            _.each(this.lstNewStoreIn, (item: StoreInInfo, index) => {
                item.action = 'C';
                item.sequence = index + 1;
                item.used_qty = 0;
                item.rest_qty = item.in_qty;
                item.vendor_name = this.vendorName;
                item.create_date_time = momnet().format('YYYY-MM-DD HH:mm:ss');
                item.created_by = this.progCodeDataService.getCurrentUserInfo().user_name;
            });
            this.bizSvc.saveNewStoreIn(this.lstNewStoreIn, (tempStoreIn: StoreInInfo[]) => {
                const tempAllStoreIn = [...this.lstAllStoreIn, ...tempStoreIn];
                this.lstAllStoreIn = _.orderBy(tempAllStoreIn, ['in_id', 'sequence'], ['desc', 'asc']);
                this.calculateStoreStatus();
                this.onSelectCategory(this.lstDisplayCategory[0]);
                this.foundationSvc.onSuccess(`入库成功，入库编号：${this.lstNewStoreIn[0].in_id}`);
                this.foundationSvc.closeProcessLayer(layerIndex);
            }, () => {
                this.foundationSvc.closeProcessLayer(layerIndex);
            });
        }
    }

    newMaterialRow(iRow) {
        const storeInItem = {
            in_id: this.lstNewStoreIn[0].in_id
        };
        this.setTypeaheadCompConfig(storeInItem, [...this.dsMaterialTypeahead]);
        this.lstNewStoreIn.splice(iRow + 1, 0, storeInItem);
    }

    removeMaterialRow(iRow) {
        this.lstNewStoreIn.splice(iRow, 1);
    }

    setTypeaheadCompConfig(item: StoreInInfo, dataSource) {
        item.typeaheadCompConfig = {
            inputPlaceHolder: '请选择物料',
            callbackFn: {
                getCustomDisplayText: (selectedValue: string) => {
                    const findOne = _.find(this.lstDropdownInfo, {
                        dropdownText: selectedValue
                    }) as StoreInDropdownInfo;
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

    filterStoreIn(initialPage = true) {
        let tmpStoreInItems = [...this.lstAllStoreIn];

        if (!_.isEmpty(this.storeInFilterString)) {
            tmpStoreInItems = _.filter(this.lstAllStoreIn,
                (item: StoreInInfo) => {
                    return _.some(['in_id', 'material_id', 'material', 'vendor_name', 'create_date_time', 'created_by'], colName => {
                        return item[colName].toUpperCase().indexOf(this.storeInFilterString.toUpperCase()) !== -1;
                    });
                }
            );
        } else {
            tmpStoreInItems = [...this.lstAllStoreIn];
        }
        const pagingObj = this.pagingStoreInObj;
        pagingObj.totalItems = _.size(tmpStoreInItems);
        pagingObj.currentPageIndex = initialPage ? 1 : pagingObj.currentPageIndex;
        if (!_.isEmpty(tmpStoreInItems)) {
            tmpStoreInItems = _.orderBy(tmpStoreInItems, ['in_id', 'sequence'], ['desc', 'asc']);
            const begin = (pagingObj.currentPageIndex - 1) * pagingObj.itemsPerPage;
            const end = begin + pagingObj.itemsPerPage;
            tmpStoreInItems = tmpStoreInItems.slice(begin, end);
        }
        this.lstDisplayStoreIn = tmpStoreInItems;
    }

    deleteOneStoreIn(deleteStoreInItem: StoreInInfo) {
        this.foundationSvc.onConfirm(`是否确定删除入库信息`,
            (index, layero) => {
                const layerIndex = this.foundationSvc.showProcessLayer();
                this.bizSvc.deleteOneStoreIn(deleteStoreInItem, () => {
                    this.lstAllStoreIn = _.filter(this.lstAllStoreIn, (storeIn: StoreInInfo) => {
                        return !(storeIn.in_id === deleteStoreInItem.in_id && storeIn.sequence === deleteStoreInItem.sequence);
                    });
                    this.filterStoreIn(false);
                    setTimeout(() => {
                        this.calculateStoreStatus();
                    });
                    this.foundationSvc.onSuccess('删除入库信息成功！');
                    this.foundationSvc.closeProcessLayer(layerIndex);
                    layero.close(index);
                });
            }
        );
    }

    downloadStoreInInfo() {
        this.bizSvc.downloadStoreInInfo(this.inputStoreInId);
    }

}
