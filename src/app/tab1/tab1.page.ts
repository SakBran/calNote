import { setting } from './../Settings/constantVar';
import { LocalStorageService } from './../Services/localStorage/local-storage.service';
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
  constructor(private appSetting:appSetting,private service:LocalStorageService) {}
  async searchModal(){
    await this.appSetting.presentModal(InvoiceSearchComponent);
  }

  async createModal(){
    await this.appSetting.presentModal(InvoiceCreateComponent);
  }

  refresh(){
    this.appSetting.collection=[...this.service.getLocal(setting.invoiceModel)];
  }
}
