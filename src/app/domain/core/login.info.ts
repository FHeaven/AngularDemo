import { UserInfo } from '../admin/user.info';

export class LoginInfo {
    user_id?: string;
    password?: string;
}

export class LoginDataInfo {
    user_info?: UserInfo;
}
