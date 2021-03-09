import { clientModel } from './../../../models/clientModel';
import { invoiceModel } from './../../../models/invoice-model';
import { appSetting } from './../../../Settings/appSetting';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/localStorage/local-storage.service';
import { setting } from 'src/app/Settings/constantVar';
import { searchModel } from 'src/app/models/searchModel';

@Component({
  selector: 'app-invoice-search',
  templateUrl: './invoice-search.component.html',
  styleUrls: ['./invoice-search.component.scss'],
})
export class InvoiceSearchComponent implements OnInit {

  boucher: invoiceModel = new invoiceModel();
  isItemAvailableClient: boolean = false;
  clients: clientModel[] = [];
  searchData:searchModel=new searchModel();

  constructor(public appSetting: appSetting, private service: LocalStorageService) {
    this.searchData.startDate=null;
    this.searchData.endDate=null;
   }

  ngOnInit() {}

  initializeClient() {
    this.clients = Object.assign(this.service.getLocal(setting.clientModel));
  }

  getClient(ev: any) {
    if (this.boucher.clientPhone === "") {
      this.initializeClient();
      // set val to the value of the searchbar
      const val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() !== '') {
        this.isItemAvailableClient = true;
        this.clients = this.clients.filter((item) => {
          return (item.id.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      } else {
        this.isItemAvailableClient = false;
      }
    }

    // Reset items back to all of the items

  }

  autoCompleteClient(data: clientModel) {
    this.boucher.clientName = data.id;
    this.boucher.clientPhone = data.clientPhone;
    this.isItemAvailableClient = false;
  }

  search(){
    this.searchData.client.clientPhone=this.boucher.clientPhone;
    this.searchData.client.id=this.boucher.clientName;
    this.searchData.paid=this.boucher.paid;
    console.log(this.searchData);

    let invoiceList:invoiceModel[]=[];
    let localTemp=this.service.getLocal(setting.invoiceModel);
    invoiceList=Object.assign(localTemp);

    if(this.searchData.client.id!=="" ){
      const temp:invoiceModel[]=[...invoiceList];
      invoiceList=[...temp.filter(x=>x.clientName===this.searchData.client.id)];
    }

    if(this.searchData.client.clientPhone!=="" ){
      const temp:invoiceModel[]=[...invoiceList];
      invoiceList=[...temp.filter(x=>x.clientPhone===this.searchData.client.clientPhone)];
    }

    if(this.searchData.startDate && this.searchData.startDate!==null){
      const temp:invoiceModel[]=[...invoiceList];
      invoiceList=[...temp.filter(x=>x.invoiceDate>=this.searchData.startDate)];
    }

    if(this.searchData.endDate && this.searchData.endDate!==null){
      const temp:invoiceModel[]=[...invoiceList];
      invoiceList=[...temp.filter(x=>x.invoiceDate<=this.searchData.endDate)];
    }

    if(this.searchData.paid ){
      const temp:invoiceModel[]=[...invoiceList];
      invoiceList=[...temp.filter(x=>x.paid===this.searchData.paid)];
    }
    this.appSetting.collection=invoiceList;
    this.appSetting.dismissModal();

  }

}
