import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ClientData} from "./client.model";
import {ClientsDataService} from "./clients-data.service";
import {AppStatusService} from "./shared/app-status.service";

@Component({
  selector: 'app-clients-list',
  template: `
    <div class="row">
      <div class="col-md-12">
        <button class="btn btn-success" (click)="addNewClient()">New Client</button>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped table-hover">
          <thead>

          <!--TODO make selected lines change colour: -->

          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Birth Date</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody >
          <tr  *ngFor="let client of clients" (click)="getSelectedClientID(client)">
<!--          <tr  *ngFor="let client of clients">-->
            <th scope="row">{{client.id}}</th>
            <td>{{client.firstName}}</td>
            <td>{{client.lastName}}</td>
            <td>{{client.birthdate}}</td>
            <td>{{client.isActive}}</td>
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
  clients: ClientData[] = [];
  //emits for clients.comp -> clients-detail.comp
  @Output() selectClientFromList = new EventEmitter<number>();
  selectedId?: number;



  constructor(private clientsDataService: ClientsDataService) {

  }

  ngOnInit(): void {
    this.clientsDataService.fetchAllClients().subscribe(fetchedClients =>{
      this.clients = fetchedClients;
    });
  }

  getSelectedClientID(client:ClientData) {
    //sends id for clients.comp->clients-detailed view
    this.selectedId = client.id
    this.selectClientFromList.emit(this.selectedId);
  }

  addNewClient() {
    //triggers display  clients.comp->clients-edit view to add new client
    this.selectedId = undefined;
    this.selectClientFromList.emit(this.selectedId);
  }

  refresh(){
    this.clientsDataService.fetchAllClients().subscribe(fetchedClients =>{
      this.clients = fetchedClients;
      console.log(this.clients);
    });
    console.log("refreshing and value =" + false);
  }
}
