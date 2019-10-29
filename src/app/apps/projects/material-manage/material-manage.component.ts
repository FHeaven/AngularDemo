import { Component, OnInit } from '@angular/core';
import { MaterialManageBizService } from './material-manage.biz.service';
import { MaterialInfo } from 'app/domain';
import { AppBaseComponent } from 'app/apps/app-base-component';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { FoundationService, ProgCodeDataService } from 'app/services';

@Component({
    selector: 'app-material-manage',
    templateUrl: './material-manage.component.html',
    styleUrls: ['./material-manage.component.scss']
})
export class MaterialManageComponent extends AppBaseComponent implements OnInit {

    pageIndex = 0;

    opMaterialInfo: MaterialInfo;
    tempUpdateInfo: MaterialInfo;
    lstMaterialInfo: MaterialInfo[];
    lstDisplayMaterialInfo: MaterialInfo[];
    isCreating = false;
    isUpdating = false;
    isShowing = false;
    isErrorUnitPrice = false;
    errorMessage = '';
    inputQuery = '';
    pagingObj = {
        itemsPerPage: 10,
        totalItems: 0,
        currentPageIndex: 1,
        onPageChange: (value) => {
            this.bizSvc.displayTbodyContent();
        }
    };

    constructor(
        private bizSvc: MaterialManageBizService,
        private foundationSvc: FoundationService,
        protected activatedRoute: ActivatedRoute
    ) {
        super(activatedRoute);
    }

    ngOnInit() {
        this.bizSvc.setComponent(this);
        this.lstMaterialInfo = [];
        this.lstDisplayMaterialInfo = [];
    }

    addNewMaterial() {
        this.opMaterialInfo = new MaterialInfo();
        this.isCreating = true;
        this.isUpdating = false;
        this.isErrorUnitPrice = false;
        this.errorMessage = '';
    }

    updateMaterial(opMaterialInfo: MaterialInfo) {
        this.opMaterialInfo = opMaterialInfo;
        this.tempUpdateInfo = _.cloneDeep(opMaterialInfo);
        this.isCreating = false;
        this.isUpdating = true;
        this.isErrorUnitPrice = false;
        this.errorMessage = '';
    }

    cancel() {
        if (this.isUpdating) {
            _.extend(this.opMaterialInfo, this.tempUpdateInfo);
        }
        this.isCreating = false;
        this.isUpdating = false;
        this.isErrorUnitPrice = false;
    }

    private checkInput(): boolean {
        let isValid = true;
        this.errorMessage = '';
        this.isErrorUnitPrice = false;
        if (!this.foundationSvc.isPositiveIntegerOrZeroWith2Decimal(this.opMaterialInfo.unit_price)) {
            this.errorMessage = '*. 请输入有效的单价！';
            this.foundationSvc.onWarning('保存失败');
            this.isErrorUnitPrice = true;
            isValid = false;
        }
        return isValid;
    }

    saveMaterial() {
        if (this.checkInput()) {
            const layerIndex = this.foundationSvc.showProcessLayer();
            const action = this.isCreating ? 'C' : 'U';
            this.bizSvc.saveMaterial(this.opMaterialInfo, action, () => {
                this.isCreating = false;
                this.isUpdating = false;
                this.isShowing = false;
                this.bizSvc.queryMaterials(this.inputQuery, () => {
                    this.foundationSvc.closeProcessLayer(layerIndex);
                    this.foundationSvc.onSuccess('保存成功');
                });
            }, () => {
                this.foundationSvc.closeProcessLayer(layerIndex);
            });
        }
    }

    queryMaterial() {
        this.bizSvc.queryMaterials(this.inputQuery);
    }

    deleteMaterial(materialInfo: MaterialInfo) {
        this.foundationSvc.onConfirm(`是否确定删除物料“${materialInfo.material}”`,
            (index, layero) => {
                const layerIndex = this.foundationSvc.showProcessLayer();
                this.bizSvc.deleteMaterial(materialInfo, () => {
                    this.lstMaterialInfo = this.lstMaterialInfo.filter((material: MaterialInfo) => {
                        return material.material_id !== materialInfo.material_id;
                    });
                    this.foundationSvc.closeProcessLayer(layerIndex);
                    layero.close(index);
                    this.foundationSvc.onSuccess('删除成功');
                    this.pagingObj.totalItems = _.size(this.lstMaterialInfo);
                    this.bizSvc.displayTbodyContent();
                });
            });
    }
}
