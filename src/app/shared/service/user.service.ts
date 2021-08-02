import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;
  apiUrl: string = "http://localhost:35581/api";
  constructor(private http: HttpClient) { }

  ///list(): Observable<any>{
  //return this.http.get(this.apiUrl+"/Student/GetStudents");    
  //}

  register(user: any) {

    return this.http.post(this.apiUrl + "/RegisterUser", user);
  }
}
