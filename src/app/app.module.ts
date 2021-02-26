import { appSetting } from './Settings/appSetting';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoCompleteModule } from 'ionic4-auto-complete';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,AutoCompleteModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [appSetting,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
