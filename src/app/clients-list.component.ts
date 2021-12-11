import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClientsService} from "./clients.service";
import {Client} from "./client.model";

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
          <tbody>
          <tr *ngFor="let client of clients" (click)="getSelectedClientID(client.id)">
            <th scope="row">{{client.id}}</th>
            <td>{{client.firstName}}</td>
            <td>{{client.lastName}}</td>
            <td>{{client.birthDate}}</td>
            <td>{{client.clientStatus}}</td>
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
  //empty array of objects of client.model type
  clients: Client[] = [];
  @Output() selectClientFromList = new EventEmitter<number>();

  constructor(private service: ClientsService) { }

  ngOnInit(): void {
    //clients array populated with data from clients.service
    this.clients = this.service.retrieveAll();
  }

  getSelectedClientID(id: number) {
    //sends id for clients detailed view
    this.selectClientFromList.emit(id);
  }

  addNewClient() {
    this.selectClientFromList.emit();
  }
}
