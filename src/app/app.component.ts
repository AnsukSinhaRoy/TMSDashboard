import { Component, HostListener, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'admin-panel-layout';
  sideBarOpen = false;
  token: string | undefined;
  mode: MatDrawerMode = 'side'; // Assign the initial value here
  isLargeScreen: boolean = window.innerWidth > 800;

  constructor() {}

  ngOnInit(): void {
    this.isLargeScreen = window.innerWidth > 800; // Update when window is resized
    if(this.isLargeScreen)
    {
      this.mode = 'side';
      this.sideBarOpen = true;
    }
    else{
      this.mode = 'over';
      this.sideBarOpen = false;
    }
  }
  onDrawerOpenedChange(opened: boolean) {
    if (!opened && this.mode === 'over') {
      this.sideBarOpen = false;
    }
  }

  sideBarToggler() {
    if(this.isLargeScreen)
    {
      this.sideBarOpen = !this.sideBarOpen;
      console.log(this.sideBarOpen)
    }
    else
    {
      this.sideBarOpen = !this.sideBarOpen;
      console.log(this.sideBarOpen)
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isLargeScreen = window.innerWidth > 800; // Update when window is resized
    if(this.isLargeScreen)
    {
      this.mode = 'side';
      this.sideBarOpen = true;
    }
    else{
      this.mode = 'over';
      this.sideBarOpen = false;
    }
    console.log('isLargeScreen:', this.isLargeScreen, this.mode);
  }
}
