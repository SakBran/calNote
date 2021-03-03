import { setting } from 'src/app/Settings/constantVar';
import { Component, OnInit } from '@angular/core';
import { invoiceModel } from 'src/app/models/invoice-model';
import { LocalStorageService } from 'src/app/Services/localStorage/local-storage.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {

  constructor(private service:LocalStorageService) {
    this.collection=this.service.getLocal(setting.invoiceModel);
  }

  ngOnInit() {
    this.collection=this.service.getLocal(setting.invoiceModel);
  }
  collection:invoiceModel[]=[];

}
