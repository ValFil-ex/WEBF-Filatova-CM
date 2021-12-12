import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppStatusService {


  public viewChanged: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  constructor() { }


}
