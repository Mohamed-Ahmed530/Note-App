import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor( private httpClient:HttpClient ) { }

  signUp(data:any):Observable<any>{
    return this.httpClient.post(`${environment.basUrl}/api/v1/users/signUp`, data)
  }
  
  signIn(data:any):Observable<any>{
    return this.httpClient.post(`${environment.basUrl}/api/v1/users/signIn`, data)
  }     

}
