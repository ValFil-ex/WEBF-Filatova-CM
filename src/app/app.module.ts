import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientsDetailComponent } from './clients-detail.component';
import { ClientEditComponent } from './client-edit.component';
import { ClientsListComponent } from './clients-list.component';
import { ClientsComponent } from './clients.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ClientsDetailComponent,
    ClientEditComponent,
    ClientsListComponent,
    ClientsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
