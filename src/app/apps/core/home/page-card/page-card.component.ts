import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ProgCodeDataService, FoundationService } from 'app/services';

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnInit {


  @Input()
  funName: string;

  @Input()
  className: string;

  @Input()
  url: string;


  constructor(
    private progCodeDataSvc: ProgCodeDataService,
    private foundationSvc: FoundationService,
    private router: Router) { }

  ngOnInit() {
  }

  redirectTo() {
    const layerIndex = this.foundationSvc.showProcessLayer();
    this.progCodeDataSvc.setCurrentPage(this.funName);
    this.router.navigate([this.url]).then(() => {
      this.foundationSvc.closeProcessLayer(layerIndex);
    });
  }

}
