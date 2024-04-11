import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class TokengetsetService {
  private api: string = "https://localhost:7197/api/userControllerAPI/dashboard";
  constructor(private http: HttpClient, private _VerifyLink: DashboardService) { }
  token: string | undefined;
  flag: boolean = false;

  main(token: string): void {
    const localstoredtoken = localStorage.getItem("token");
    if ((!token || token == "" || token == "undefined") && (localstoredtoken == null || localstoredtoken=="undefined") )// no token, no local memory token
    {
      Swal.fire(
        {
          title: "Session Error",
          text: "No Valid session found",
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: "Login Now",
          confirmButtonColor: "green",
        }
      ).then((result) => {
        if (result.value) {
          window.location.href = "http://localhost:4200/"
        }
        else { window.location.href = "http://localhost:4200/" }
      })
    }
    else if (token) //if there is a token in the link
    {
      let json = { "jsonData": JSON.stringify(token) };
      this.http.post<any>(`${this.api}`, json).subscribe(
        async (response) => {
          this.flag = response.flag;
          if (!this.flag) {
            Swal.fire(
              {
                title: "Token/Session Error",
                text: "Invalid token or session has expired, if you keep getting this error, it is suggested that you login",
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: "Login Now",
                confirmButtonColor: "green",
                cancelButtonText: "Retry with previous token"
                
              }
            ).then((result) => {
              if (result.value) {
                window.location.href = "http://localhost:4200/"
              }
              else if (result.dismiss === Swal.DismissReason.cancel) {
                this.flag = true
                this.main((localStorage.getItem("token") || ""));
              }
              else { window.location.href = "http://localhost:4200/" }
            })
          }
          else {
            const sendtoken= localStorage.getItem("token");
            let json = { "jsonData": JSON.stringify(sendtoken) }; // Use the token directly, not this.token
            this._VerifyLink.access(json).subscribe(
              (response) => { // Use 'response' instead of 'res'
                if (this.flag) {
                  const { Email, FirstName, PhoneNumber, LastName, Address } = JSON.parse(response.returnJson);
                  localStorage.setItem("emailValue", Email);
                  localStorage.setItem("firstName", FirstName);
                  localStorage.setItem("lastName", LastName);
                  localStorage.setItem("phoneNumber", PhoneNumber);
                  localStorage.setItem("address", Address);
                } else {
                  Swal.fire(response.status, response.message, response.status);
                  window.location.href = "http://localhost:4200/";
                }
              },
              (error) => { // Add error handling if needed
                console.error(error);
                // Handle the error, e.g., display an error message to the user.
              }
            );
          }
        },
        (error) => {
          console.error('Error occurred:', error);
        });


    }
    else //no token in the link, but there is one in the local memory
    {
       
      const storedToken = localStorage.getItem("token");
      let json = { "jsonData": JSON.stringify(storedToken) };
      this.http.post<any>(`${this.api}`, json).subscribe(
        async (response) => {
          this.flag = response.flag;
          if (!this.flag) {
            Swal.fire(
              {
                title: "Token/Session Error",
                text: "Invalid token or session has expired, if you keep getting this error, it is suggested that you login",
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: "Login Now",
                confirmButtonColor: "green",
                cancelButtonText: "Retry with previous token"
              }
            ).then((result) => {
              if (result.value) {
                window.location.href = "http://localhost:4200/"
              }
              else if (result.dismiss === Swal.DismissReason.cancel) {
                this.flag = true
                this.main((localStorage.getItem("token") || ""));
              }
              else { window.location.href = "http://localhost:4200/" }
            })
          }
          else {
            const sendtoken= localStorage.getItem("token");
            let json = { "jsonData": JSON.stringify(sendtoken) }; // Use the token directly, not this.token
            this._VerifyLink.access(json).subscribe(
              (response) => { // Use 'response' instead of 'res'
                 
                if (this.flag) {
                  const { Email, FirstName, PhoneNumber, LastName, Address } = JSON.parse(response.returnJson);
                  localStorage.setItem("emailValue", Email);
                  localStorage.setItem("firstName", FirstName);
                  localStorage.setItem("lastName", LastName);
                  localStorage.setItem("phoneNumber", PhoneNumber);
                  localStorage.setItem("address", Address);
                } else {
                  Swal.fire(response.status, response.message, response.status);
                  window.location.href = "http://localhost:4200/";
                }
              },
              (error) => { // Add error handling if needed
                console.error(error);
                // Handle the error, e.g., display an error message to the user.
              }
            );
          }
        },
        (error) => {
          console.error('Error occurred:', error);
        });
    }
  }
}
