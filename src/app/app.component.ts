import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    showSuccess() {
        (<any>window).toastr.success('Hello world!', 'Toastr fun!');
    }
}
