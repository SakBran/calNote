import { clientModel } from './../../models/clientModel';
import { setting } from './../../Settings/constantVar';
import { invoiceDetail } from './../../models/invoiceDetail';
import { LocalStorageService } from './../../Services/localStorage/local-storage.service';
import { appSetting } from './../../Settings/appSetting';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { itemModel } from 'src/app/models/itemModel';
import { invoiceModel } from 'src/app/models/invoice-model';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss'],
})
export class InvoiceCreateComponent implements OnInit, OnDestroy {
  @Input() id: string;
  constructor(public appSetting: appSetting, private service: LocalStorageService) {
    this.dataLoad();
  }

  ngOnInit() {

  }
  itemData: itemModel = new itemModel();
  clientData: clientModel = new clientModel();

  invoiceData: invoiceDetail = new invoiceDetail();
  invoiceDataList: invoiceDetail[] = [];

  boucher: invoiceModel = new invoiceModel();

  isItemAvailable: boolean = false;
  isItemAvailableClient: boolean = false;
  items: itemModel[] = [];
  clients: clientModel[] = [];

  dataBind_ID() {
    let temp: invoiceDetail[] = [];
    temp = Object.assign(this.service.getLocal(setting.invoiceDetailModel));
    this.invoiceDataList = [...temp];
  }

  dataLoad() {
    let temp: invoiceDetail[] = [];
    if (this.appSetting.invoiceID === 0) {
      temp = Object.assign(this.service.getLocal(setting.invoiceDetailModel));
      this.boucher.invoiceDate=new Date(new Date(Date.now()).toDateString());
    }
    else {
      const dataList: invoiceDetail[] = Object.assign(this.service.getLocal(setting.invoiceDetailFixed));
      temp = [...dataList.filter(x => x.inoviceID === this.appSetting.invoiceID)];
      this.service.setLocal(temp,setting.invoiceDetailModel);
      const boucherList: invoiceModel[] = Object.assign(this.service.getLocal(setting.invoiceModel));
      let bTemp:invoiceModel = [...boucherList.filter(x => x.id === this.appSetting.invoiceID)][0];
      this.boucher=bTemp;
    }

    this.invoiceDataList = [...temp];
  }

  initializeItems() {
    this.items = Object.assign(this.service.getLocal(setting.itemModel));
  }

  getItems(ev: any) {
    if (this.invoiceData.itemPrice === 0) {
      this.initializeItems();

      // set val to the value of the searchbar
      const val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() !== '') {
        this.isItemAvailable = true;
        this.items = this.items.filter((item) => {
          return (item.id.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      } else {
        this.isItemAvailable = false;
      }
    }
    // Reset items back to all of the items

  }

  autoCompleteItem(data: itemModel) {
    this.invoiceData.itemName = data.id;
    this.invoiceData.itemPrice = data.itemPrice;
    this.isItemAvailable = false;
  }

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

  addToInvoice() {
    this.itemData.id = this.invoiceData.itemName;
    this.itemData.itemPrice = this.invoiceData.itemPrice;
    this.service.syncItem(this.itemData);
    this.service.post(setting.invoiceDetailModel, this.invoiceData);
    this.dataBind_ID();
    this.invoiceData = new invoiceDetail();
  }

  editFromInvoice(id: number) {
    this.invoiceData = this.service.getById(setting.invoiceDetailModel, id);
    this.removeFromInvoice(id);
  }

  removeFromInvoice(id: number) {
    this.service.delete(setting.invoiceDetailModel, id);
    this.dataBind_ID();
  }

  totalAmount(): string {
    if (this.invoiceDataList !== []) {
      let result = 0;
      this.invoiceDataList.forEach(x => {
        result = result + (+x.itemPrice * +x.itemQty)
      });
      return result.toString();
    } else {
      return "0";
    }
  }

  save() {
    if (this.appSetting.invoiceID === 0) {
      this.saveProcess();
    }
    else {
      this.editProcess();
    }
    this.ngOnDestroy();
  }

  editProcess() {
    this.clientData.id = this.boucher.clientName;
    this.clientData.clientPhone = this.boucher.clientPhone;
    this.service.syncClient(this.clientData);
    this.boucher.totalAmount = +this.totalAmount();
    this.service.delete(setting.invoiceModel,this.appSetting.invoiceID);
    this.service.post(setting.invoiceModel, this.boucher);

    const dataList: invoiceDetail[] = Object.assign(this.service.getLocal(setting.invoiceDetailFixed));
    let temp: invoiceDetail[] = [...dataList.filter(x => x.inoviceID === this.appSetting.invoiceID)];

    temp.forEach(x => {
      console.log(x.inoviceID+" and "+x.id);
      x.inoviceID = this.appSetting.invoiceID;
      this.service.delete(setting.invoiceDetailFixed, x.id);

    });

    this.invoiceDataList.forEach(x => {
      x.inoviceID = this.appSetting.invoiceID;
      this.service.post(setting.invoiceDetailFixed, x);
    });

    this.service.clearAll(setting.invoiceDetailModel);
    this.boucher = new invoiceModel();
    this.appSetting.dismissModal();
    this.appSetting.collection = this.service.getLocal(setting.invoiceModel);
  }


  saveProcess() {
    this.clientData.id = this.boucher.clientName;
    this.clientData.clientPhone = this.boucher.clientPhone;
    this.service.syncClient(this.clientData);
    this.boucher.totalAmount = +this.totalAmount();
    this.service.post(setting.invoiceModel, this.boucher);
    let id = setting.insertedId;
    this.invoiceDataList.forEach(x => {
      x.inoviceID = id;
      this.service.post(setting.invoiceDetailFixed, x);
    });
    this.service.clearAll(setting.invoiceDetailModel);
    this.boucher = new invoiceModel();
    this.appSetting.dismissModal();
    this.appSetting.collection = this.service.getLocal(setting.invoiceModel);
  }

  ngOnDestroy() {
    if (this.appSetting.invoiceID !== 0) {
      this.appSetting.invoiceID = 0;
    }
    if (this.invoiceDataList !== []) {
      this.invoiceDataList = [];
    }
  }


}
