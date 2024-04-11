import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/services/logout.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private _logout: LogoutService) {}
  token: string | undefined;
  user: string = "null";
  ngOnInit(): void { this.user = localStorage.getItem("firstName") ||"Name not found";}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout()
  {
    this.token = localStorage.getItem("token") ||"";
    localStorage.clear();
    let json = { "jsonData": JSON.stringify(this.token) };
    console.log(json)
    debugger
    this._logout.logout(json).subscribe(
      (res) => 
      {
        window.location.href = "http://localhost:4200/";;
      },
      (err) => {
        if (err instanceof HttpErrorResponse && err.status === 0) {
          const errorMessage = 'API is not online';
          console.error(errorMessage);
          Swal.fire('ERROR', errorMessage, 'error');
        }
        else {
          console.error(err);
          const errorMessage = err?.message || 'An unknown error occurred.';
          console.log(errorMessage);
          Swal.fire('ERROR', errorMessage, 'error');
        }
      }
      
    );
    window.location.href = "http://localhost:4200/";
    }
    gotoedit()
    {}
}
