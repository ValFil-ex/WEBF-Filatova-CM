import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientModel} from "./client.model";
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {ClientsListComponent} from "./clients-list.component";

const CLIENTS_RESOURCE_URL = 'http://localhost:8080/resources/customer/';

@Injectable({
  providedIn: 'root'
})
export class ClientsDataService {
  listOfClients: ClientModel[] = [];



  constructor(private httpClient: HttpClient) { }

  deleteClient(id: number): Promise<any>{
    return this.httpClient.delete(CLIENTS_RESOURCE_URL + '/' + id).toPromise();
  }


  createNewClient(client: ClientModel): Promise<any>{
 return this.httpClient.post(CLIENTS_RESOURCE_URL, client).toPromise();
  }

  fetchClient(id: number): Promise<ClientModel | undefined>{
    return this.httpClient.get<ClientModel>(CLIENTS_RESOURCE_URL + '/' + id).toPromise();
  }

//fetch and transform data with observable; Observable for chained methods in case transfrom data is necessary vs Promise
  fetchAllClients(): Promise<ClientModel[]>{
   // @ts-ignore
    return this.httpClient.get<ClientModel[]>(CLIENTS_RESOURCE_URL).toPromise();
  }

  updateExistingClient(clientToUpdate: ClientModel): Promise<any>{
    return this.httpClient.put(CLIENTS_RESOURCE_URL + '/' + clientToUpdate.id, clientToUpdate).toPromise();
  }
}
