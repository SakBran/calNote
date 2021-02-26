export class invoiceModel {
  inoviceID:number;
  invoiceDate:Date;
  clientName:string;
  clientPhone:string;
  totalAmount:number;
  paid:boolean;
  constructor(){
    this.inoviceID=0;
    this.invoiceDate=new Date(Date.now());
    this.clientName="";
    this.clientPhone="";
    this.totalAmount=0;
    this.paid=true;
  }
}
