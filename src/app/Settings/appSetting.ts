import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable()
export class appSetting{
  /**
   *
   */
  constructor(public modalController: ModalController) {

  }

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
