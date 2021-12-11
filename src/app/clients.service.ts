import { Injectable } from '@angular/core';
import {Client} from "./client.model";
import {EmptyClient} from "./emptyClient";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  //TODO change to Client[] when http service available
  public clients: any[] = [
    new Client(1, "Elfride", "Elinek", "20.10.1946", "active"),
    new Client(2, "Oscar", "Wilde", "16.10.1854", "inactive"),
    new Client(3, "Virginia", "Wolfe", "25.01.1882", "inactive")];

  /*public clients: Client[] = [
    new Client(1, "Elfride", "Elinek", "20.10.1946", "active"),
    new Client(2, "Oscar", "Wilde", "16.10.1854", "inactive"),
    new Client(3, "Virginia", "Wolfe", "25.01.1882", "inactive")];*/

  constructor() { }


  create(client: EmptyClient){
    this.clients.push(client);
  }

  retrieve(id: number){
    return this.clients.find(o=>o.id === id);
  }

  update(){}

  delete(id: number){
    for(var i=0; i<this.clients.length; i++){
      if(this.clients[i].id == id){
        this.clients.splice(i,1);
        break;
      }
    }
  }

  retrieveAll(){
    return this.clients;
  }
}
