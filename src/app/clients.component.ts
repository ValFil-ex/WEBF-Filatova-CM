import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Client} from "./client.model";
import {ClientsService} from "./clients.service";
import {EmptyClient} from "./emptyClient";

@Component({
  selector: 'app-clients',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <app-clients-list (selectClientFromList)="selectedClient($event)">

          </app-clients-list>
        </div>

        <div class="col-md-4">
          <app-clients-detail
            *ngIf="displayDetailedView"
            [currentClient]="clientSelected"
          >

          </app-clients-detail>
        </div>

        <!--TODO replace with router to enable display on right side-->

        <div class="col-md-4">
          <app-client-edit
            *ngIf="displayEditForm"
          >

          </app-client-edit>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ClientsComponent implements OnInit {
  clientSelected?: Client;


  //TODO replace with router?

  displayDetailedView: boolean = false;
  displayEditForm: boolean = false;

  constructor(private service: ClientsService) { }

  ngOnInit(): void {
  }


  selectedClient(id: number) {
    if(id){
      //getting selected client data from service for detailed client view
      this.clientSelected = this.service.retrieve(id);
      this.displayDetailedView = true;
      this.displayEditForm = false;
    }else {
      //TODO replace with empty client once http in place
//initialises edit view
      this.displayDetailedView = false;
      this.displayEditForm = true;
    }

  }

}
