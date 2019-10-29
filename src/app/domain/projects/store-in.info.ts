import { AvTypeaheadCompConfigInput } from 'app/components';

export class DownloadStoreInByApplyIdRequestInfo {
    in_id?: string;
    token?: string;
}

export class DownloadStoreOutByApplyIdRequestInfo {
    apply_id?: string;
    token?: string;
}

export class StoreInInfo {
    in_id?: string;
    sequence?: number;
    material_id?: string;
    material?: string;
    unit?: string;
    unit_price?: string;
    vendor_name?: string;
    action?: string;
    in_qty?: number;
    used_qty?: number;
    rest_qty?: number;
    create_date_time?: string;
    created_by?: string;
    isErrorInQty?: boolean;
    typeaheadCompConfig?: AvTypeaheadCompConfigInput;
}

export class StoreInStatusInfo {
    material_id?: string;
    material?: string;
    unit?: string;
    unit_price?: string;
    action?: string;
    total_in_qty?: string;
    total_used_qty?: string;
    total_rest_qty?: string;
}
