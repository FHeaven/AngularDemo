import { Injectable } from '@angular/core';
import { OpMaterialApiService, GetMaterialsApiService } from 'app/services/api';
import { ApiResponseInfo, MaterialInfo } from 'app/domain';
import * as _ from 'lodash';
import { MaterialManageComponent } from './material-manage.component';
import { ProgCodeDataService, FoundationService } from 'app/services';
import * as moment from 'moment';

@Injectable()
export class MaterialManageBizService {

    private compInstance: MaterialManageComponent = null;

    constructor(
        private foundationSvc: FoundationService,
        private opMaterialApiService: OpMaterialApiService,
        private getMaterialsApiService: GetMaterialsApiService,
        private progCodeDataService: ProgCodeDataService
    ) { }

    setComponent(compInstance: MaterialManageComponent) {
        this.compInstance = compInstance;
    }

    saveMaterial(material: MaterialInfo, action: string, callbackFn?: Function, onFailed?: Function) {
        if (action === 'C') {
            material.create_date_time = moment().format('YYYY-MM-DD HH:mm:ss');
            material.created_by = this.progCodeDataService.getCurrentUserInfo().user_name;
        } else {
            material.update_date_time = moment().format('YYYY-MM-DD HH:mm:ss');
            material.updated_by = this.progCodeDataService.getCurrentUserInfo().user_name;
        }
        const tempMaterial = _.cloneDeep(material) as MaterialInfo;
        tempMaterial.action = action;
        this.opMaterialApiService.call({
            requestJson: tempMaterial,
            onSuccessFn: (response: ApiResponseInfo<string>) => {
                if (callbackFn) {
                    callbackFn(material);
                } else {
                    (<any>window).toastr.success(response.responseObject);
                }
            },
            onFailed: () => {
                if (onFailed) {
                    onFailed();
                }
            }
        });
    }

    deleteMaterial(material: MaterialInfo, callbackFn?: Function) {
        const tempMaterial = _.cloneDeep(material) as MaterialInfo;
        tempMaterial.action = 'D';
        this.opMaterialApiService.call({
            requestJson: tempMaterial,
            onSuccessFn: (response: ApiResponseInfo<string>) => {
                if (callbackFn) {
                    callbackFn();
                }
            }
        });
    }

    displayTbodyContent() {
        const pagingObj = this.compInstance.pagingObj;
        const begin = (pagingObj.currentPageIndex - 1) * pagingObj.itemsPerPage;
        const end = begin + pagingObj.itemsPerPage;
        this.compInstance.lstDisplayMaterialInfo = this.compInstance.lstMaterialInfo.slice(begin, end);
        if (_.isEmpty(this.compInstance.lstDisplayMaterialInfo) && pagingObj.currentPageIndex !== 1) {
            pagingObj.currentPageIndex--;
            this.displayTbodyContent();
        }
    }

    queryMaterials(inputQuery: string, callbackFn?: Function) {
        const layerIndex = this.foundationSvc.showProcessLayer();
        this.getMaterialsApiService.call({
            requestJson: {},
            onSuccessFn: (response: ApiResponseInfo<MaterialInfo[]>) => {
                if (!_.isEmpty(inputQuery)) {
                    inputQuery = inputQuery.toLocaleLowerCase();
                    response.responseObject = _.filter(response.responseObject, (material: MaterialInfo) => {
                        return material.material_id.toLocaleLowerCase().indexOf(inputQuery) !== -1 ||
                            material.material.toLocaleLowerCase().indexOf(inputQuery) !== -1;
                    });
                }
                this.compInstance.isShowing = true;
                this.compInstance.lstMaterialInfo = _.orderBy(response.responseObject, ['material_id'], ['asc']);
                this.compInstance.pagingObj.currentPageIndex = 1;
                this.compInstance.pagingObj.totalItems = _.size(this.compInstance.lstMaterialInfo);
                this.displayTbodyContent();
                if (callbackFn) {
                    callbackFn();
                }
            },
            onResponse: () => {
                this.foundationSvc.closeProcessLayer(layerIndex);
            }
        });
    }

}
