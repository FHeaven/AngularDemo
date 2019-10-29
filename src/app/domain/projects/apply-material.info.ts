import { AvTypeaheadCompConfigInput } from 'app/components';

export class ApplyMaterialInfo {
    action?: string;
    apply_id?: string;
    sequence?: number;
    material_id?: string;
    material?: string;
    unit?: string;
    unit_price?: string;
    apply_qty?: number;
    issued_qty?: number;
    spill_qty?: number;
    status?: string;
    applier?: string;
    apply_date?: string;
    apply_operator?: string;
    issue_operator?: string;
    apply_remark?: string;
    issue_remark?: string;
    is_completed?: string;
    issue_date?: string;
    isErrorApplyQty?: boolean;
    typeaheadCompConfig?: AvTypeaheadCompConfigInput;

}
