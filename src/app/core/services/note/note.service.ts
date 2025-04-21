import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpClient:HttpClient ){}


  addNote(data:any):Observable<any>{
    return this.httpClient.post(`${environment.basUrl}/api/v1/notes`, data)
  }

  getNotes():Observable<any>{
    return this.httpClient.get(`${environment.basUrl}/api/v1/notes/allNotes`)
  }
  
  getUserNotes():Observable<any>{
    return this.httpClient.get(`${environment.basUrl}/api/v1/notes`)
  }

  updeteNote(noteId:string, data:any):Observable<any>{
    return this.httpClient.put(`${environment.basUrl}/api/v1/notes/${noteId}`, data)
  }
  
  deleteNote(noteId:string):Observable<any>{
    return this.httpClient.delete(`${environment.basUrl}/api/v1/notes/${noteId}`)
  }

}