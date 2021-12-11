import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStatusService {
  currentStatus = {
    "new" : false,
    "edit" : false,
    "delete": false
  }
  constructor() { }

}
