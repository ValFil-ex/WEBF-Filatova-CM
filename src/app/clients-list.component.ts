import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {ClientModel} from "./client.model";
import {ClientsDataService} from "./clients-data.service";


@Component({
  selector: 'app-clients-list',
  template: `

    <div class="container">

      <div class="row">
        <div class="col-md-12">
          <button class="btn btn-success" (click)="onAddNewClient()">New Client</button>
        </div>
      </div>

      <hr>

      <!--search filter pipe arg input -->
      <div class="row search">
        <div class="col-md-12">
          <h5>Search for a client:</h5>

          <div class="form-group">

            <label for="search-name">By name:
              <input type="text" class="form-control" id="search-name"
                     [(ngModel)]="searchName" placeholder="Enter name to search">
            </label>

            <label for="search-lastname" style="margin-left: 10px">By lastname:
              <input type="text" class="form-control" id="search-lastname"
                     [(ngModel)]="searchLastName" placeholder="Enter last name to search">
            </label>

            <label for="search-bdate" style="margin-left: 10px">By birth date:
              <input type="text" class="form-control" id="search-bdate"
                     [(ngModel)]="searchDate" placeholder="Enter date to search">
            </label><br>

            <div class="form-check form-switch" title="Toggle">
              <input type="checkbox" id="search-status" class="form-check-input" [(ngModel)]="searchStatus" >
              <label class="form-check-label" for="search-status" >Toggle status
              </label>
            </div>

          </div>

          <div class="row table">
            <div class="col-md-4">
              <button class="btn btn-secondary" (click)="clearSearchFields()">Clear Filters</button>
            </div>
          </div>

        </div>
      </div>


      <!-- <label for="search-status">Search by Status:
         <input type="text" class="form-control" id="search-status"
                [(ngModel)]="searchStatus" placeholder="Enter true or false">
       </label><br>-->



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
            <tr *ngFor="let client of clients | clientsFilter:  {firstName:searchName, lastName:searchLastName, birthdate:searchDate, isActive:searchStatus}">
              <!--          <tr  *ngFor="let client of clients">-->
              <th scope="row">{{client.id}}</th>
              <td>{{client.firstName}}</td>
              <td>{{client.lastName}}</td>
              <td>{{client.birthdate}}</td>
              <td>{{client.isActive?'Active':'Inactive'}}</td>
              <td><button class="btn btn-primary" (click)="onEdit(client)" >Edit</button></td>
              <td><button class="btn btn-danger" (click)="onDelete(client)" >Delete</button></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styleUrls: [`./shared/styles.css`]
})
export class ClientsListComponent implements OnInit{
  clients: ClientModel[] = [];
  @Output() selectedClient = new EventEmitter<number>();
  searchName = '';
  searchLastName = '';
  searchDate = '';
  searchStatus= '';


  constructor(private clientsDataService: ClientsDataService) {}

  ngOnInit(): void {
    this.refresh();
  }

  onEdit(client:ClientModel){
    this.selectedClient.emit(client.id);
    this.clearSearchFields();
  }

  onDelete(client: ClientModel){
    if(confirm("Delete this client?")){
      this.clientsDataService.deleteClient(client.id!).then(()=>this.refresh());
    }
  }

  onAddNewClient() {
    this.refresh();
    this.selectedClient.emit();
  }


  refresh() {
    this.clientsDataService.fetchAllClients().then(clients=>this.clients = clients);
    this.clearSearchFields();
  }

  clearSearchFields() {
    this.searchName = '';
    this.searchLastName = '';
    this.searchDate = '';
    this.searchStatus= '';
  }
}
