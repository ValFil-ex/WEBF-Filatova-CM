import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {ClientsDataService} from "./clients-data.service";
import {ClientData} from "./client.model";
import {AppStatusService} from "./shared/app-status.service";

@Component({
  selector: 'app-clients-detail',
  template: `
    <div class="row" *ngIf="currentClient">
      <div class="col-md-12">
        <h3>Client details:</h3>
        <hr>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="row" >
            <div class="col-md-12">
              <img src="../assets/dummy-image.jpg" alt="dummy image" width="50%">
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <p>Client's Name: {{currentClient.firstName}} {{currentClient.lastName}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <p>Client's Birth Date: {{currentClient.birthdate}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <p>Client Active: {{currentClient.isActive}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <p>Comments: Place Holder for some additional information</p>
            </div>
          </div>
          <div class="row">
            <button class="btn btn-primary" (click)="onUpdate(currentClient)">Edit</button>
            <button class="btn btn-danger" (click)="onDelete()">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ClientsDetailComponent implements OnInit{
  //catches emitted selected client from clients-list->clients.comp to display
  @Input() currentClient?: ClientData;

  //emits selected client for clients.comp->client-edit = to Edit
  @Output() clientIDToUpdate = new EventEmitter<number>();


  constructor(private service: ClientsDataService, private appStatusService: AppStatusService) {

  }

  ngOnInit(): void {

  }


  onDelete() {
    if(this.currentClient){
      this.service.deleteClient(this.currentClient.id).subscribe();
    }
    //sets property to undefined to stop display
    this.currentClient = undefined;

  }


  onUpdate(currentClient: ClientData) {
    //emits current client to clients->client-edit = to EDIT
    this.clientIDToUpdate.emit(currentClient.id);
  }
}
