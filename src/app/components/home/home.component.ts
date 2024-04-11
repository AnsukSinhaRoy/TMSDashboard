import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TokengetsetService } from 'src/app/services/tokengetset.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _token: TokengetsetService, private _VerifyLink: DashboardService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      const token = queryParams['id'];
      if (token !== null && token !== undefined) 
      {
        let json = { "jsonData": JSON.stringify(token) };
        this._VerifyLink.access(json).subscribe(
          (response) => { // Use 'response' instead of 'res'
            if (response.flag) {
              localStorage.setItem("token", token);
            } 
            else {
              Swal.fire(
                {
                  title: "Token/Session Error",
                  text: "Invalid token or session has expired",
                  icon: 'error',
                  showCancelButton: false,
                  confirmButtonText: "Login Now",
                  confirmButtonColor: "green",
                }
              ).then((result) => {
                if (result.value) {
                  window.location.href = "http://localhost:4200/"
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                  response.flag = true
                  this._token.main((localStorage.getItem("token") || ""));
                }
                else { window.location.href = "http://localhost:4200/" }
              })
            }
          },
          (error) => {
            Swal.fire("Error", error, 'error');
          }
        );
      }
      this._token.main(token);
    });
  }
}
