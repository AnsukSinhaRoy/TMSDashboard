import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RaiseticketService {

  private api: string ="https://localhost:7197/api/TMS/";
  
  constructor(private http : HttpClient) { }

  fetchTypes(machine: string) {
    const apiUrl = `${this.api}fetchType`;
    const params = new HttpParams().set('machine', machine);
    return this.http.get<any[]>(apiUrl, { params });
  }
  fetchProblems(machine: string) {
    const params = new HttpParams().set('machine', machine);
    const apiUrl = `${this.api}fetchProblem`;
    return this.http.get<any[]>(apiUrl, { params });
  }

  raiseTicket(machine: string, machineType: string, service: string) {
    const token=localStorage.getItem("token") || ""
    const params = new HttpParams()
      .set('machine', machine)
      .set('machineType', machineType)
      .set('service', service)
      .set('token',token );
      debugger
    const apiUrl = `${this.api}raiseTicket`;
    console.log("Raise Ticket Service"+apiUrl);
    return this.http.get(apiUrl, { params });
  }
  
}

