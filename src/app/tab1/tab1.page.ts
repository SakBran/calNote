import { appSetting } from './../Settings/appSetting';
import { Component } from '@angular/core';
import { InvoiceListComponent } from '../invoice/invoice-list/invoice-list.component';
import { InvoiceCreateComponent } from '../invoice/invoice-create/invoice-create.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private appSetting:appSetting) {}
  async searchModal(){
    await this.appSetting.presentModal(InvoiceListComponent);
  }

  async createModal(){
    await this.appSetting.presentModal(InvoiceCreateComponent);
  }
}
