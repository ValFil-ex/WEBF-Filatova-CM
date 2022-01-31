import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ClientModel} from "./client.model";
import {ClientsDataService} from "./clients-data.service";
import {ClientsListComponent} from "./clients-list.component";


@Component({
  selector: 'app-clients',
  template: `

    <div class="container-fluid">

      <div class="row">

        <div class="col-md-8">
          <app-clients-list
            (selectedClient)="onSelect($event)"
            #clients
          >
          </app-clients-list>
        </div>

        <div class="col-md-4">
          <app-client-edit
            *ngIf="clientSelected"
            [currentClient]="clientSelected"
            (ok)="unselectClient(true)"
            (cancel)="unselectClient(false)"
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
  clientSelected?: ClientModel;
  @ViewChild('clients') clients!: ClientsListComponent; //value assigned at runtime


  constructor(private clientsDataService: ClientsDataService) {
  }

  ngOnInit(): void {
  }


  onSelect(id: number) {
    if(id){
      //edit existing client
      this.clientsDataService.fetchClient(id).then(client=>{
        this.clientSelected = client;
      });
    }else{
      //add new client
      this.clientSelected = new ClientModel();
    }
  }


  unselectClient(refresh: boolean) {
    this.clientSelected = undefined;
    if(refresh){
      this.clients.refresh();
    }
  }
}
