import { appSetting } from './../../Settings/appSetting';
import { setting } from 'src/app/Settings/constantVar';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/localStorage/local-storage.service';
import { InvoiceCreateComponent } from '../invoice-create/invoice-create.component';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {

  constructor(private service:LocalStorageService,public appSetting:appSetting) {
    this.appSetting.collection=this.service.getLocal(setting.invoiceModel);
  }

  ngOnInit() {
    this.appSetting.collection=this.service.getLocal(setting.invoiceModel);
  }

  async editModal(id){
    this.appSetting.invoiceID=+id;
    await this.appSetting.presentModal(InvoiceCreateComponent);
  }
}

