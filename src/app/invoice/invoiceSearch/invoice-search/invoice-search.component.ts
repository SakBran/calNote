import { appSetting } from './../../../Settings/appSetting';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-search',
  templateUrl: './invoice-search.component.html',
  styleUrls: ['./invoice-search.component.scss'],
})
export class InvoiceSearchComponent implements OnInit {

  constructor(public appSetting:appSetting) { }

  ngOnInit() {}

}
