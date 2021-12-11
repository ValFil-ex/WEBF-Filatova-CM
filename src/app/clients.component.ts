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
          </app-clients-list>
        </div>

    <!--    <div class="col-md-4">
          <app-clients-detail
            *ngIf="displayDetailedView"
            [currentClient]="clientSelected">
            &lt;!&ndash;detailed view is displayed if a client was selected on a list&ndash;&gt;
          </app-clients-detail>

          <app-client-edit
            *ngIf="displayEditForm">
            &lt;!&ndash;edit/update form is displayed if 1)new client is clicked in list view; 2)Edit is clicked in detailed view&ndash;&gt;
          </app-client-edit>
        </div>-->
        <router-outlet></router-outlet>

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

  constructor(private service: ClientsDataService) { }

  ngOnInit(): void {
  }


  selectedClient(id: number) {
    if(id){
      //getting selected client data from service for detailed client view
      this.service.fetchClient(id).subscribe(fetchedClient =>{
        this.clientSelected = fetchedClient;
      });
      this.displayDetailedView = true;
      this.displayEditForm = false;
    }else {
      //initialises edit view
      this.displayDetailedView = false;
      this.displayEditForm = true;
    }

  }

}
