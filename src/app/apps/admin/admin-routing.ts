export const AdminRouting = [
    {
        path: 'user-manage',
        loadChildren: './user-manage/user-manage.module#UserManageModule'
    },
    {
        path: 'password-manage',
        loadChildren: './password-manage/password-manage.module#PasswordManageModule'
    }
];
