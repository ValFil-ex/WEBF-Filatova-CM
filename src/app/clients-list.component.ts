import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientData} from "./client.model";
import {ClientsDataService} from "./clients-data.service";

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
          <tr  *ngFor="let client of clients" (click)="getSelectedClientID(client.id)">
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
export class ClientsListComponent implements OnInit {
  clients: ClientData[] = [];
  //emits for clients.comp -> clients-detail.comp
  @Output() selectClientFromList = new EventEmitter<number>();


  constructor(private clientsDataService: ClientsDataService) { }
//private service: ClientsService,
  ngOnInit(): void {
    this.clientsDataService.fetchAllClients().subscribe(fetchedClients =>{
      this.clients = fetchedClients;
    });
  }

  // change param type to number
  getSelectedClientID(id: any) {
    //sends id for clients detailed view
    this.selectClientFromList.emit(id);
  }

  addNewClient() {
    this.selectClientFromList.emit();
  }

}
