export const ProjectRouting = [
    {
        path: 'material-manage',
        loadChildren: './material-manage/material-manage.module#MaterialManageModule'
    },
    {
        path: 'respository-manage',
        loadChildren: './respository-manage/respository-manage.module#RespositoryManageModule'
    },
    {
        path: 'apply-material',
        loadChildren: './apply-material/apply-material.module#ApplyMaterialModule'
    },
    {
        path: 'issue-material',
        loadChildren: './issue-material/issue-material.module#IssueMaterialModule'
    },
    {
        path: 'download-report',
        loadChildren: './download-monthly-report/download-monthly-report.module#DownloadMonthlyReportModule'
    }
];
