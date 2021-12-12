import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClientData} from "./client.model";
import {ClientsDataService} from "./clients-data.service";
import {AppStatusService} from "./shared/app-status.service";

@Component({
  selector: 'app-clients',
  template: `
    <div class="container-fluid">
      <div class="row">
        <!--always displayed-->
        <div class="col-md-8">
          <app-clients-list
            (selectClientFromList)="selectedClient($event)">
            <!--emits selected client for clients-detail-->
            <!--if ID emitted - clients-detail view initialised-->
            <!--if no ID emitted (new client) - clients-edit view initialised-->
          </app-clients-list>
        </div>

        <div class="col-md-4">
          <app-clients-detail
            *ngIf="displayDetailedView"
            [currentClient]="clientSelected"
            (clientIDToUpdate)="updateClient($event)">
            <!--detailed view is displayed if a client was selected on a list-->
            <!--clientIDToUpdate emits selected client for client-edit-->
          </app-clients-detail>

          <app-client-edit
            *ngIf="displayEditForm"
            [clientToUpdate] = "clientSelected">
            <!--edit/update form is displayed if 1)new client is clicked in list view; 2)Edit is clicked in detailed view-->
          </app-client-edit>
        </div>

      </div>
    </div>


  `,
  styles: [
  ]
})
export class ClientsComponent implements OnInit {
  clientSelected?: ClientData;

  //TODO replace with router?
  displayDetailedView: boolean = false;
  displayEditForm: boolean = false;

  constructor(private service: ClientsDataService, private appStatusService: AppStatusService) {
    this.appStatusService.viewChanged.subscribe(value=>{
      if(value){
        this.clientSelected = undefined;
      }
    })
  }

  ngOnInit(): void {
  }


  selectedClient(id: number) {
    if(id){
      //getting selected client data from service for detailed client view
      this.service.fetchClient(id).subscribe(fetchedClient =>{
        this.clientSelected = fetchedClient;
      });
      //initialises detailed view
      this.displayDetailedView = true;
      this.displayEditForm = false;
    }else {
      //initialises edit view
      this.displayDetailedView = false;
      this.displayEditForm = true;
    }

  }

  updateClient(id: number) {
    //initialises edit view
    this.displayDetailedView = false;
    this.displayEditForm = true;
    this.service.fetchClient(id).subscribe(fetchedClient=>{
      this.clientSelected = fetchedClient;
    })

  }
}
