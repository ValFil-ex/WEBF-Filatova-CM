import { Component, OnInit } from '@angular/core';
import {ClientsDataService} from "./clients-data.service";
import {ClientData} from "./client.model";
import {AppStatusService} from "./shared/app-status.service";



@Component({
  selector: 'app-client-edit',
  template: `
    <form #clientForm="ngForm" (ngSubmit)="onSubmit()" *ngIf="!submitted">

      <!--TODO readonly from DB-->
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="id">ID</label>
            <input
              type="number"
              id="id"
              class="form-control"
              required
              [(ngModel)]="currentClient.id"
              name="id"
              #id="ngModel"
              placeholder="Please enter an ID (number)">
            <div
              [hidden]="id.valid || id.untouched"
              class="alert alert-danger">
              ID is required!
            </div>
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
              [(ngModel)]="currentClient.birthdate"
              name="birthDate"
              #birthDate="ngModel"
              placeholder="Please enter the client's birth date">
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
              <option *ngFor="let s of status" [value]=s required>{{s}}</option>
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
          <button type="button" class="btn btn-danger" (click)="clearForm(); clientForm.reset()">Cancel</button>
        </div>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class ClientEditComponent implements OnInit {
  currentClient: ClientData = new ClientData();
  status: boolean[] = [true, false];
  submitted = false;



  constructor(private service: ClientsDataService, private appStatusService: AppStatusService) { }
  existingClient: boolean = this.appStatusService.currentStatus.edit;
  newClient: boolean = this.appStatusService.currentStatus.new;

  ngOnInit(): void {

  }

  onSubmit(){
    this.submitted = true;
    this.service.createNewClient(this.currentClient).subscribe();
  }

  clearForm() {
    this.currentClient = new ClientData();
  }

}
