import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokengetsetService } from 'src/app/services/tokengetset.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  category: string = 'All Tickets';
  tickets: string[] = [];

  constructor(private route: ActivatedRoute, private _token: TokengetsetService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      const token = queryParams['id'];
      if (token !== null && token !== undefined) {
        console.log("dashboard "+ token);
        localStorage.setItem("token", token);
        
      }
      this._token.main(token);
    });
    
  }
  showActiveTickets(): void {
    this.category = 'Active Tickets';
    // Replace this example with your actual list of active tickets
    this.tickets = ['Ticket 1', 'Ticket 2', 'Ticket 3'];
  }

  showClosedTickets(): void {
    this.category = 'Closed Tickets';
    // Replace this example with your actual list of closed tickets
    this.tickets = ['Ticket A', 'Ticket B', 'Ticket C'];
  }

  showAllTickets(): void {
    this.category = 'All Tickets';
    // Replace this example with your actual list of all tickets
    this.tickets = ['Ticket X', 'Ticket Y', 'Ticket Z'];
  }
}
