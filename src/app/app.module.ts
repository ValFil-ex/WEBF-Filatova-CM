import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientsDetailComponent } from './clients-detail.component';
import { ClientEditComponent } from './client-edit.component';
import { ClientsListComponent } from './clients-list.component';
import { ClientsComponent } from './clients.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {path:'', component: ClientsComponent},
  {path:'clients', component: ClientsListComponent, children:[
      {path: ':id', component: ClientsDetailComponent},
      {path: ':id/edit', component: ClientEditComponent},
      {path: 'new-client', component: ClientEditComponent}
    ]},
];

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
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
