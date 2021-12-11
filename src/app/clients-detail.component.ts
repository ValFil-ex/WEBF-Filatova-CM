import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {ClientsDataService} from "./clients-data.service";
import {ClientData} from "./client.model";
import {AppStatusService} from "./shared/app-status.service";

@Component({
  selector: 'app-clients-detail',
  template: `
    <div class="row">
      <div class="col-md-12">
        <h3>{{currentClient?'Client details:':'Client has been deleted'}} </h3>
        <hr>
      </div>
      <div class="row" *ngIf="currentClient">
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
            <button class="btn btn-primary" (click)="onUpdate()">Edit</button>
            <button class="btn btn-danger" (click)="onDelete()">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ClientsDetailComponent implements OnInit,OnChanges{
  //gets property from Clients comp replace to Client when constructor is empty and http client connected
  @Input() currentClient?: ClientData;

  constructor(private service: ClientsDataService, private appStatusService: AppStatusService) {

  }

  ngOnInit(): void {

  }

  ngOnChanges(): void{

  }

  //TODO fix the detailed view toggle - client selection
  onDelete() {
    if(this.currentClient){
      this.service.deleteClient(this.currentClient.id).subscribe();
      console.log(this.currentClient);
    }else{
      console.log("no client selected");
    }

    //TODO maybe delete
    this.refresh();
  }

  refresh(){
    this.currentClient = undefined;
  }

  onUpdate() {
    //TODO router
    this.appStatusService.currentStatus.edit = true;
  }
}
