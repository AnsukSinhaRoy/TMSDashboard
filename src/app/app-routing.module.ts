import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { NewdashboardComponent } from './components/newdashboard/newdashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { EditPrifileComponent } from './components/edit-prifile/edit-prifile.component';
import { LoginhistoryComponent } from './components/loginhistory/loginhistory.component';
import { RaiseTicketComponent } from './raise-ticket/raise-ticket.component';

const routes: Routes = [//you have to add the components here, but also, you have to add the router outlet to the app html page
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'olddashboard', component: DashboardComponent },
  { path: 'dashboard', component: NewdashboardComponent },
  { path: 'sidenav', component: SidenavComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'editprofile', component: EditPrifileComponent },
  { path: 'loghistory', component: LoginhistoryComponent },
  { path: 'raise-ticket', component: RaiseTicketComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
