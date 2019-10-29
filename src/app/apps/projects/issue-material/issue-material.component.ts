import { Component, OnInit } from '@angular/core';
import { IssueMaterialBizService } from './issue-material.biz.service';
import { ApplyHeadInfo, ApplyDetailInfo } from 'app/domain';
import { AppBaseComponent } from 'app/apps/app-base-component';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { FoundationService, ProgCodeDataService } from 'app/services';

@Component({
    selector: 'app-issue-material',
    templateUrl: './issue-material.component.html',
    styleUrls: ['./issue-material.component.scss']
})
export class IssueMaterialComponent extends AppBaseComponent implements OnInit {

    showFirstPage = true;
    showTable = false;
    issuingItem: ApplyHeadInfo;
    lstIssuingItem: ApplyDetailInfo[];
    lstLackStockMaterial: String[];
    downloadUrl = '';

    queryObj = {
        isCompleted: 'N',
        isCompletedStatus: 'N',
        dsApplier: [],
        applier: '',
        applierConfig: null,
        dsApplyId: [],
        apply_id: '',
        applyIdConfig: null
    };

    lstApplyHd: ApplyHeadInfo[];
    lstDisplayApplyHd: ApplyHeadInfo[];
    pagingObj = {
        itemsPerPage: 10,
        totalItems: 0,
        currentPageIndex: 1,
        onPageChange: (value) => {
            this.displayApplyHdList(false);
        }
    };

    constructor(
        private bizSvc: IssueMaterialBizService,
        private foundationSvc: FoundationService,
        protected activatedRoute: ActivatedRoute
    ) {
        super(activatedRoute);
    }

    ngOnInit() {
        this.bizSvc.setComponent(this);
        this.initSelectCategory([]);
        setTimeout(() => {
            this.onChangeCompleted('N');
        }, 0);
    }

    onChangeCompleted(isCompleted: string) {
        this.showTable = false;
        this.bizSvc.getAppierLst({
            isCompleted, callbackFn: (lstApplier: string[]) => {
                this.queryObj.dsApplier = _.isEmpty(lstApplier) ? [] : lstApplier;
                this.queryObj.applier = '';
                this.queryObj.dsApplyId = [];
                this.queryObj.apply_id = '';
                this.queryObj.applierConfig.componentApi.resetDataSourceAndSelectedValue(this.queryObj.dsApplier, '');
                this.queryObj.applyIdConfig.componentApi.resetDataSourceAndSelectedValue([], '');
                this.showFirstPage = true;
            }
        });
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
                            this.queryObj.apply_id = _.size(lstApplierId) === 1 ? lstApplierId[0] : '';
                            this.queryObj.applyIdConfig.componentApi.resetDataSourceAndSelectedValue(lstApplierId, this.queryObj.apply_id);
                        }
                    });
                }
            });
        this.queryObj.applyIdConfig = this.getQueryTypeaheadConfig([], '', (changeItem) => {
            this.queryObj.apply_id = changeItem;
        });
    }

    private getQueryTypeaheadConfig(dataSource, placeHolder, callbackFn) {
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

    onSearchApplyHd() {
        const layerIndex = this.foundationSvc.showProcessLayer();
        this.bizSvc.onSearchApplyHd({
            is_completed: this.queryObj.isCompleted,
            applier: this.queryObj.applier,
            apply_id: this.queryObj.apply_id,
            onSuccessFn: (lst: ApplyHeadInfo[]) => {
                this.queryObj.isCompletedStatus = this.queryObj.isCompleted;
                this.showTable = true;
                this.lstApplyHd = lst;
                this.displayApplyHdList();
                this.foundationSvc.closeProcessLayer(layerIndex);
            },
            onFailed: () => {
                this.foundationSvc.closeProcessLayer(layerIndex);
            }
        });
    }

    displayApplyHdList(initial = true) {
        let tempApplyList = this.lstApplyHd;
        const pagingObj = this.pagingObj;
        pagingObj.totalItems = _.size(tempApplyList);
        pagingObj.currentPageIndex = initial ? 1 : pagingObj.currentPageIndex;
        if (!_.isEmpty(tempApplyList)) {
            tempApplyList = _.orderBy(tempApplyList, ['issue_date'], ['desc']);
            const begin = (pagingObj.currentPageIndex - 1) * pagingObj.itemsPerPage;
            const end = begin + pagingObj.itemsPerPage;
            tempApplyList = tempApplyList.slice(begin, end);
        }
        this.lstDisplayApplyHd = tempApplyList;
    }

    private searchApplyDetail(item: ApplyHeadInfo, callbackFn: Function) {
        this.bizSvc.onSearchApplyDetail({
            apply_id: item.apply_id,
            callbackFn: (lst: ApplyDetailInfo[]) => {
                this.issuingItem = item;
                this.showFirstPage = false;
                this.lstLackStockMaterial = [];
                this.lstIssuingItem = _.map(lst, (loopItem: ApplyDetailInfo) => {
                    return {
                        ...loopItem,
                        isChecked: loopItem.status === 'P'
                    };
                });
                callbackFn();
            }
        });
    }

    gotoIssueMaterial(item: ApplyHeadInfo) {
        const layerIndex = this.foundationSvc.showProcessLayer();
        this.searchApplyDetail(item, () => {
            this.foundationSvc.closeProcessLayer(layerIndex);
        });
    }

    onDowloadStoreOut(applyId: string) {
        this.bizSvc.onDownloadStoreOut(applyId);
    }

    onInQtyChanged(item: ApplyDetailInfo) {
        if (!_.isEmpty(item.issuing_qty) && !this.foundationSvc.isPositiveIntegerOrZero(item.issuing_qty)) {
            item.issuing_qty = null;
            this.foundationSvc.onWarning('实发量必须是大于等于0的整数！');
        } else {
            const spillQty = item.issued_qty * 1 + item.issuing_qty * 1 - item.apply_qty * 1;
            if (spillQty > 0) {
                item.spill_qty = spillQty;
            } else {
                item.spill_qty = 0;
            }
        }
    }

    isDisableSaveIssueButton() {
        return _.some(this.lstIssuingItem, (item: ApplyDetailInfo) => {
            return _.isEmpty(item.issuing_qty + '');
        });
    }

    isHideIssueOpButtons() {
        return _.every(this.lstIssuingItem, {
            status: 'Y'
        });
    }

    onSaveIssueMaterial() {
        const layerIndex = this.foundationSvc.showProcessLayer();
        this.bizSvc.onSaveIssueMaterial(this.lstIssuingItem, (lstMaterialId: string[]) => {
            this.lstLackStockMaterial = lstMaterialId;
            if (_.isEmpty(lstMaterialId)) {
                this.foundationSvc.onSuccess('保存成功');
                this.searchApplyDetail(this.issuingItem, () => {
                    this.foundationSvc.closeProcessLayer(layerIndex);
                });
            } else {
                this.foundationSvc.closeProcessLayer(layerIndex);
                this.foundationSvc.onError('保存失败');
            }
        }, () => {
            this.foundationSvc.closeProcessLayer(layerIndex);
        });
    }

    goBack() {
        if (this.queryObj.isCompleted === 'Y') {
            this.showFirstPage = true;
        } else {
            if (this.isHideIssueOpButtons()) {
                this.onChangeCompleted('N');
            } else {
                this.showFirstPage = true;
            }
        }
    }

}
