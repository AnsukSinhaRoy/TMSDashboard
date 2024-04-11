import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TokengetsetService } from 'src/app/services/tokengetset.service';
import Swal from 'sweetalert2';

interface Ticket {
  raiseDate: string;
  employeeName: string;
  ticketID: string;
  sla: string;
  machine: string;
  description: string;
  closeOPT: string;
  status: 'Active' | 'Closed'; // Add the ticket status property
}

@Component({
  selector: 'app-newdashboard',
  templateUrl: './newdashboard.component.html',
  styleUrls: ['./newdashboard.component.scss']
})
export class NewdashboardComponent implements OnInit {
  activeTicketsFlag: boolean = false;
  closedTicketsFlag: boolean = false;
  allTicketsFlag: boolean = false;
  category: string = 'All Tickets';
  activeTab: string = ''; // Initialize the active tab to 'all'
  tickets: Ticket[] = [];
  numberOfActiveTickets: number =0;
  numberOfClosedTickets: number=0;
  numberOfAllTickets: number=0;
  
  token: string | undefined;
  inputElement: HTMLInputElement | null = null;
  blurEventListener: (() => void) | null = null;
  loginHistoryService: any;
  

  constructor(
    private route: ActivatedRoute,
    private dashboard: DashboardService,
    private _token: TokengetsetService
  ) {}

  ngOnInit(): void {
    this.fetchAllTickets();
    debugger;
    this.route.queryParams.subscribe((queryParams) => {
      const token = queryParams['id'];
      if (token !== null && token !== undefined) {
        let json = { "jsonData": JSON.stringify(token) };
        this.dashboard.access(json).subscribe(
          (response) => {
            if (response.flag) {
              localStorage.setItem("token", token);
              const { Email, FirstName, PhoneNumber, LastName, Address } = JSON.parse(response.returnJson);
              localStorage.setItem("emailValue", Email);
              localStorage.setItem("firstName", FirstName);
              localStorage.setItem("lastName", LastName);
              localStorage.setItem("phoneNumber", PhoneNumber);
              localStorage.setItem("address", Address);

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

  fetchAllTickets(): void {
    let json = { jsonData: JSON.stringify(localStorage.getItem('token')) };
    this.dashboard.getTicket(json).subscribe(
      (data) => {
        
        const openTickets = data.filter((ticket: Ticket) => ticket.status === 'Active');
        this.numberOfActiveTickets = openTickets.length;
        console.log(this.numberOfActiveTickets);
        const closedTickets = data.filter((ticket: Ticket) => ticket.status === 'Closed');
        this.numberOfClosedTickets = closedTickets.length;
        this.numberOfAllTickets = this.numberOfActiveTickets+this.numberOfClosedTickets;
        if (this.activeTab === 'active') {
          this.tickets = openTickets;
        } else if (this.activeTab === 'closed') {
          this.tickets = closedTickets;
        } else {
          this.tickets = data;
        }
      },
      (error) => {
        console.error('Error fetching Ticket:', error);
      }
    );
  }
  

  showActiveTickets(): void {
    this.activeTicketsFlag = true;
    this.closedTicketsFlag = false;
    this.allTicketsFlag = false;
    this.activeTab = 'active';
    this.category = 'Active Tickets';
    this.fetchAllTickets();
  }

  showClosedTickets(): void {
    this.activeTicketsFlag = false;
    this.closedTicketsFlag = true;
    this.allTicketsFlag = false;
    this.activeTab = 'closed';
    this.category = 'Closed Tickets';
    this.fetchAllTickets();
  }

  showAllTickets(): void {
    this.activeTicketsFlag = false;
    this.closedTicketsFlag = false;
    this.activeTab = 'all';
    this.allTicketsFlag = true;
    this.category = 'All Tickets';
    this.fetchAllTickets();
  }
}
