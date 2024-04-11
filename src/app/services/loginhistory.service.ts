import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginhistoryService {
  private api: string ="https://localhost:7197/api/userControllerAPI/loginHistory";
  constructor(private http : HttpClient) { }

  history(object:any)
  {
    return this.http.post<any[]>(`${this.api}`, object)
  }
}
