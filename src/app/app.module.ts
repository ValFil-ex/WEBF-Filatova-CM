import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientEditComponent } from './client-edit.component';
import { ClientsListComponent } from './clients-list.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ClientsComponent} from "./clients.component";


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientEditComponent,
    ClientsListComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
