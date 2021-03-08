import { invoiceDetail } from './../models/invoiceDetail';
import { invoiceModel } from './../models/invoice-model';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { clientModel } from '../models/clientModel';

@Injectable()
export class appSetting{
  /**
   *
   */
  constructor(public modalController: ModalController) {

  }

  public collection:invoiceModel[]=[];
  public invoiceID:number=0;
  public tableInfo:invoiceModel=new invoiceModel();
  public tableData:invoiceDetail[]=[];

  async presentModal(ModalPage) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  dismissModal(){
    this.modalController.dismiss();
  }
}
