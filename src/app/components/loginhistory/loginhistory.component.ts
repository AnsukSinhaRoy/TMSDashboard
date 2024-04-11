import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginhistoryService } from 'src/app/services/loginhistory.service';

interface LoginEntry {
  date: string;
  username: string;
  ipAddress: string;
  status: string;
}

@Component({
  selector: 'app-loginhistory',
  templateUrl: './loginhistory.component.html',
  styleUrls: ['./loginhistory.component.scss'],
})
export class LoginhistoryComponent implements OnInit {
  loginHistory: LoginEntry[] = [
    {
      date: '2023-07-31 09:30:25',
      username: 'john.doe@example.com',
      ipAddress: '192.168.1.100',
      status: 'Success',
    },
    {
      date: '2023-07-30 14:20:10',
      username: 'jane.smith@example.com',
      ipAddress: '192.168.1.50',
      status: 'Success',
    },
    {
      date: '2023-07-29 18:45:55',
      username: 'admin@example.com',
      ipAddress: '192.168.1.200',
      status: 'Failed',
    }
  ];

  constructor(private http: HttpClient, private loginHistoryService: LoginhistoryService) { }

  ngOnInit(): void {
    this.fetchLoginHistory();
  }

  fetchLoginHistory(): void {
    let json = { jsonData: JSON.stringify(localStorage.getItem('token')) };
    this.loginHistoryService.history(json).subscribe(
      (data) => {
        this.loginHistory = data;
      },
      (error) => {
        console.error('Error fetching login history:', error);
      }
    );
  }
}