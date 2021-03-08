import { appSetting } from './../../../Settings/appSetting';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-only',
  templateUrl: './table-only.component.html',
  styleUrls: ['./table-only.component.scss'],
})
export class TableOnlyComponent implements OnInit {

  constructor(public appSetting:appSetting) { }

  totalAmount(): string {
    if (this.appSetting.tableData !== []) {
      let result = 0;
      this.appSetting.tableData.forEach(x => {
        result = result + (+x.itemPrice * +x.itemQty)
      });
      return result.toString();
    } else {
      return "0";
    }
  }

  ngOnInit() {}

}
