import { appSetting } from './../../Settings/appSetting';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss'],
})
export class InvoiceCreateComponent implements OnInit {

  constructor(public appSetting:appSetting){ }

  ngOnInit(){}

  isItemAvailable = false;
     items = [];

     initializeItems(){
         this.items = ["Ram","gopi", "dravid"];
     }

     getItems(ev: any) {
         // Reset items back to all of the items
         this.initializeItems();

         // set val to the value of the searchbar
         const val = ev.target.value;

         // if the value is an empty string don't filter the items
         if (val && val.trim() !== '') {
             this.isItemAvailable = true;
             this.items = this.items.filter((item) => {
                 return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
             })
         } else {
             this.isItemAvailable = false;
         }
     }


}
