import { Component, OnInit } from '@angular/core';
import { RaiseticketService } from '../services/raiseticket.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.scss']
})
export class RaiseTicketComponent implements OnInit {

  selectedMachine: string = '';
  machineType: string[] = [];
  selectedMachineType: string = '';
  problemOptions: string[] = [];
  selectedProblem: string = '';
  steps = ['Machine', 'Type Of Machine', 'The Problem', 'Review and Finish'];
  activeStep = 0;
  constructor(private raiseTicketService: RaiseticketService) { }
  ngOnInit(): void { }

  previousStep(): void {
    this.activeStep--;
  }

  onselectMachine(machine: string): void {
    this.selectedMachine = machine;

    this.raiseTicketService.fetchTypes(this.selectedMachine).subscribe(
      (res: any) => {
        this.machineType = res;
        this.activeStep++;
      },
      (error: any) => {
        console.error('Inside subscribe error', error);
      }
    );
  }



  ontypeSelect(event: any): void {
    this.selectedMachineType = event.value;
    this.raiseTicketService.fetchProblems(this.selectedMachine).subscribe(
      (res: any) => {
        this.problemOptions = res;
        this.activeStep++;
      },
      (error: any) => {
        console.error('Inside subscribe error', error);
      }
    );
  }

  onProblemSelect(event: any): void {
    this.selectedProblem = event.value;
    console.log(this.selectedProblem);
    this.activeStep++;
  }

  raiseTicket(): void {
    console.log("Raise Ticket");
    this.raiseTicketService.raiseTicket(this.selectedMachine, this.selectedMachineType, this.selectedProblem).subscribe(
      (res: any) => {
        console.log("Raise Ticket inside response");
        this.problemOptions = res;
      },
      (error: any) => {
        console.error('Inside subscribe error', error);
      }
    );
  }

}
