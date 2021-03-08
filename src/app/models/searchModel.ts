import { clientModel } from './clientModel';
export class searchModel{
    client:clientModel;
    startDate:Date;
    endDate:Date;
    paid:string;

    constructor() {
      this.client=new clientModel();
      this.startDate=new Date(Date.now());
      this.endDate=new Date(Date.now());
      this.paid="true";
    }

}
