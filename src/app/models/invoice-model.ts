export class invoiceModel {
  id:number;
  invoiceDate:Date;
  clientName:string;
  clientPhone:string;
  totalAmount:number;
  paid:string;
  constructor(){
    this.id=0;
    this.invoiceDate=new Date(Date.now());
    this.clientName="";
    this.clientPhone="";
    this.totalAmount=0;
    this.paid="true";
  }
}
