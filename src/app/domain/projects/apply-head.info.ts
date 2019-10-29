
export class ApplyHeadInfo {
    apply_id?: string;
    to_issue_item_count?: number;
    apply_item_count?: number;
    status?: string;
    applier?: string;
    apply_date?: string;
}

export class ApplyDetailInfo {
    apply_id?: string;
    status?: string; // Y: completed, P: checked, N:un-completed
    sequence?: number;
    material_id?: string;
    material?: string;
    unit?: string;
    unit_price?: string;
    apply_qty?: number;
    stock_qty?: number;
    issued_qty?: number;
    issuing_qty?: number;
    spill_qty?: number;
    issue_operator?: string;
    issue_remark?: string;
    issue_date?: string;
    isChecked?: boolean;
}
