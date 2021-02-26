import { appSetting } from './../Settings/appSetting';
import { Component } from '@angular/core';
import { InvoiceCreateComponent } from '../invoice/invoice-create/invoice-create.component';
import { InvoiceSearchComponent } from '../invoice/invoiceSearch/invoice-search/invoice-search.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private appSetting:appSetting) {}
  async searchModal(){
    await this.appSetting.presentModal(InvoiceSearchComponent);
  }

  async createModal(){
    await this.appSetting.presentModal(InvoiceCreateComponent);
  }
}
