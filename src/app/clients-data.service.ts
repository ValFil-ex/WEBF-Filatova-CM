import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientData} from "./client.model";
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";

const CLIENTS_RESOURCE_URL = 'http://localhost:8080/resources/customer';

@Injectable({
  providedIn: 'root'
})
export class ClientsDataService {
  listOfClients: ClientData[] = [];



  constructor(private httpClient: HttpClient) { }

  deleteClient(id: number | undefined): any{
    return this.httpClient.delete(CLIENTS_RESOURCE_URL + '/' + id);
  }

//TODO fix it
  createNewClient(client: ClientData): any{
 return this.httpClient.post<ClientData>(CLIENTS_RESOURCE_URL, client);
  }

  fetchClient(id: number): Observable<ClientData>{
    return this.httpClient.get<ClientData>(CLIENTS_RESOURCE_URL + '/' + id);
  }

//fetch and transform data with observable; Observable for chained methods in case transfrom data is necessary vs Promise
  fetchAllClients(): Observable<ClientData[]>{
   return this.httpClient.get<ClientData[]>(CLIENTS_RESOURCE_URL);
  }
}
