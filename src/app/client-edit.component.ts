import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientsDataService} from "./clients-data.service";
import {ClientModel} from "./client.model";


@Component({
  selector: 'app-client-edit',
  template: `

    <div class="container">

      <form #clientForm="ngForm" (ngSubmit)="onSubmit()" *ngIf="!submitted">

        <!--TODO readonly from DB-->
        <h3>{{currentClient ? 'Update Client Information:' : 'New Client:'}}</h3>
        <hr>
        <div class="row">
          <div class="col-md-12" *ngIf="currentClient.id">
            <div class="form-group">
              <label for="id">ID</label>
              <input
                type="number"
                id="id"
                class="form-control"
                readonly
                [value]="currentClient.id"
                name="id"
                placeholder="Please enter an ID (number)">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                class="form-control"
                required
                [(ngModel)]="currentClient.firstName"
                name="firstName"
                #firstName="ngModel"
                placeholder="Please enter the client's name">
              <div
                [hidden]="firstName.valid || firstName.untouched"
                class="alert alert-danger">
                Name is required!
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                class="form-control"
                required
                [(ngModel)]="currentClient.lastName"
                name="lastName"
                #lastName="ngModel"
                placeholder="Please enter the client's last name">
              <div
                [hidden]="lastName.valid || lastName.untouched"
                class="alert alert-danger">
                Last name is required!
              </div>
            </div>
          </div>
        </div>
        <!--TODO restrict input to yyyy-mm-dd-->
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="birthDate">Birth Date</label>
              <input
                type="text"
                id="birthDate"
                class="form-control"
                [(ngModel)]="currentClient.birthDate"
                name="birthDate"
                #birthDate="ngModel"
                placeholder="YYYY-MM-DD">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="clientStatus">Status</label>
              <select
                id="clientStatus"
                class="form-control"
                required
                [(ngModel)]="currentClient.isActive"
                name="clientStatus"
                #clientStatus="ngModel">
                <option *ngFor="let s of status" [value]=s>{{s ? 'Active' : 'Inactive'}}</option>
              </select>
              <div
                [hidden]="clientStatus.valid || clientStatus.untouched"
                class="alert alert-danger">
                Status is required!
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <button
              type="submit"
              class="btn btn-success"
              [disabled]="!clientForm.form.valid">Save
            </button>
            <button type="button" class="btn btn-danger" (click)="onCancel(); clientForm.reset()">Cancel</button>
          </div>
        </div>
      </form>

    </div>
  `,
  styleUrls: [`./shared/styles.css`]
})
export class ClientEditComponent implements OnInit {

  //values to populate Status dropdown selector
  status: boolean[] = [true, false];

  //defines if form shall be displayed or not
  submitted = false;

  //input from client-detail (edit) -> clients.comp to update client
  @Input() currentClient = new ClientModel();
  @Output() ok = new EventEmitter();
  @Output() cancel = new EventEmitter();


  constructor(private clientsDataService: ClientsDataService) {}

  ngOnInit(): void {

  }

  onSubmit(){
    if(this.currentClient.id){
      this.clientsDataService.updateExistingClient(this.currentClient).then(()=>this.ok.emit());
    }else{
      this.clientsDataService.createNewClient(this.currentClient).then(()=>this.ok.emit());
    }
  }

  onCancel() {
    this.cancel.emit();
  }

}
