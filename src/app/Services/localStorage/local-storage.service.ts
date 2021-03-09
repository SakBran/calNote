import { clientModel } from './../../models/clientModel';
import { Injectable } from '@angular/core';
import { itemModel } from 'src/app/models/itemModel';
import { setting } from 'src/app/Settings/constantVar';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  setLocal(data: any[], key: string) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getLocal(key: string): any[] {
    let stringDatalist = localStorage.getItem(key);
    if (stringDatalist) {
      let dataList: any[] = Object.assign(JSON.parse(stringDatalist));
      if (dataList) {
        return dataList;
      } else {
        return [];
      }
    }
    return [];

  }

  generateID(key: string): number {
    let dataList: any[] = this.getLocal(key);
    console.log(dataList);
    if (dataList) {
      if (dataList.length === 0 || dataList === null) {
        return 1;
      }
      let id = Math.max.apply(Math, dataList.map((o) => {
        if (o !== null) {
          return o.id;
        }
        else {
          return 0;
        }

      }));
      return id + 1;
    }
    return 1;
  }

  //Remove selected id from Array
  filter(key: string, id: any): any[] {
    let dataList: any[] = this.getLocal(key);
    const result: any[] = dataList.filter(x => x.id !== id);
    if (result) {
      return result;
    }
    else {
      return dataList;
    }
  }

  getById(key: string, id: number): any {
    let dataList: any[] = this.getLocal(key);
    if (dataList) {
      const result: any[] = dataList.filter(x => x.id === id);
      return result[0];
    }
    return null;
  }

  swapData(a: any, b: any): any {
    a.descriptions = b.descriptions;
    a.programmer = b.programmer;
    a.projectManager = b.projectManager;
    a.reportDate = b.reportDate;
    a.status = b.status;
    return a;
  }

  post(key: string, data: any): void {
    let dataList: any[] = this.getLocal(key);
    data.id = this.generateID(key);
    let postData = [...dataList, data];
    console.log(postData);
    this.setLocal(postData, key);
    setting.insertedId = data.id;
  }

  postWithoutID(key: string, data: any): void {
    let dataList: any[] = this.getLocal(key);
    let postData = [...dataList, data];
    this.setLocal(postData, key);
  }

  put(key: string, id: any, data: any): void {
    let dataList: any[] = this.filter(key, id);
    let model: any = this.getById(key, id);
    if (model) {
      let newData =Object.assign(data) ;
      let putData = [...dataList, newData];
      this.setLocal(putData, key);
    }

  }

  delete(key: string, id: any): void {
    let dataList: any[] = this.filter(key, id);
    let deletData = [...dataList];
    this.setLocal(deletData, key);
  }

  clearAll(key: string): void {
    let clearData = [];
    this.setLocal(clearData, key);
  }

  syncItem(data: itemModel) {
    let dataList: itemModel[] = Object.assign(this.getLocal(setting.itemModel));
    dataList.forEach(x => {
      if (x && data) {
        if (x.id === data.id) {
          this.delete(setting.itemModel, data.id);
        }
      }
    });
    this.postWithoutID(setting.itemModel, data);
  }

  syncClient(data: clientModel) {
    let dataList: clientModel[] = Object.assign(this.getLocal(setting.clientModel));
    dataList.forEach(x => {
      if (x && data) {
        if (x.id === data.id) {
          this.delete(setting.clientModel, data.id);
        }
      }
    });
    this.postWithoutID(setting.clientModel, data);
  }
}
