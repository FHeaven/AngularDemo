import { ProgCodeDataService } from 'app/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageCardList;

  constructor(private sysDataService: ProgCodeDataService) { }

  ngOnInit() {
    this.pageCardList = this.sysDataService.getMenuInfo();
  }

}
