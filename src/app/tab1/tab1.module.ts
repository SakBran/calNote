import { InvoiceCreateComponent } from './../invoice/invoice-create/invoice-create.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { InvoiceListComponent } from '../invoice/invoice-list/invoice-list.component';
import { InvoiceSearchComponent } from '../invoice/invoiceSearch/invoice-search/invoice-search.component';
import { TableOnlyComponent } from '../invoice/tableOnly/table-only/table-only.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page,InvoiceListComponent,InvoiceCreateComponent,InvoiceSearchComponent,TableOnlyComponent]
})
export class Tab1PageModule {}
