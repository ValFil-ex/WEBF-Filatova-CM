import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {ClientModel} from "./client.model";
import {ClientsDataService} from "./clients-data.service";
import {AppStatusService} from "./shared/app-status.service";
import {Event} from "@angular/router";

@Component({
  selector: 'app-clients-list',
  template: `
    <div class="row">
      <div class="col-md-12">
        <button class="btn btn-success" (click)="onAddNewClient()">New Client</button>
      </div>
    </div>

    <hr>

    <div class="row">

      <div class="col-md-12">
        <table class="table table-hover">
          <thead>

          <!--TODO make selected lines change colour: -->

          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Birth Date</th>
            <th scope="col">Status</th>
            <th colspan="2"scope="col" >Actions</th>

          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let client of clients">
            <!--          <tr  *ngFor="let client of clients">-->
            <th scope="row">{{client.id}}</th>
            <td>{{client.firstName}}</td>
            <td>{{client.lastName}}</td>
            <td>{{client.birthdate}}</td>
            <td>{{client.isActive}}</td>
            <td><button class="btn btn-primary" (click)="onEdit(client)" >Edit</button></td>
            <td><button class="btn btn-danger" (click)="onDelete(client)" >Delete</button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  `,
  styles: [
  ]
})
export class ClientsListComponent implements OnInit{
  clients: ClientModel[] = [];
  @Output() selectedClient = new EventEmitter<number>();

  constructor(private clientsDataService: ClientsDataService) {}

  ngOnInit(): void {
    this.reload();
  }

  onEdit(client:ClientModel){
    this.selectedClient.emit(client.id);
  }

  onDelete(client: ClientModel){
    if(confirm("Delete this client?")){
      this.clientsDataService.deleteClient(client.id!).then(()=>this.reload);
    }
  }

  onAddNewClient() {
    this.selectedClient.emit();
  }


  reload() {
    this.clientsDataService.fetchAllClients().then(clients=>this.clients = clients);
  }
}
