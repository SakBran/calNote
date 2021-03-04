import { invoiceModel } from './../models/invoice-model';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable()
export class appSetting{
  /**
   *
   */
  constructor(public modalController: ModalController) {

  }

  public collection:invoiceModel[]=[];
  public invoiceID:number=0;

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
