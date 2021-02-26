import { appSetting } from './../../Settings/appSetting';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss'],
})
export class InvoiceCreateComponent implements OnInit {

  constructor(public appSetting:appSetting){ }

  ngOnInit(){}



}
