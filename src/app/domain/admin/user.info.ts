import { ProgCodeInfo } from 'app/domain';
export class UserInfo {
    action?: string;
    user_id: string;
    password?: string;
    user_name: string;
    is_admin: string;
    prog_auth?: ProgCodeInfo[];
    token?: string;
    create_date_time?: string;
    created_by?: string;
    update_date_time?: string;
    updated_by?: string;
}
