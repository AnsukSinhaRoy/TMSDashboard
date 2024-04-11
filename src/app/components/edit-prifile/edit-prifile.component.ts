import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LogoutService } from 'src/app/services/logout.service';
import { TokengetsetService } from 'src/app/services/tokengetset.service';
import { UpdateUserService } from 'src/app/services/update-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-prifile',
  templateUrl: './edit-prifile.component.html',
  styleUrls: ['./edit-prifile.component.scss']
})
export class EditPrifileComponent implements OnInit {

  constructor(private _token: TokengetsetService, private elementRef: ElementRef, private route: ActivatedRoute, private _VerifyLink: DashboardService, private _update: UpdateUserService, private _logout: LogoutService) { }
  emailValue = localStorage.getItem("emailValue") || "null";
  firstName = localStorage.getItem("firstName") || "null";
  lastName = localStorage.getItem("lastName") || "null";
  phoneNumber = localStorage.getItem("phoneNumber") || "null";
  address = localStorage.getItem("address") || "null";
  token = localStorage.getItem("token");
  inputElement: HTMLInputElement | null = null;
  blurEventListener: (() => void) | null = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      const token = queryParams['id'];
      if (token !== null && token !== undefined) {
        let json = { "jsonData": JSON.stringify(token) };
        this._VerifyLink.access(json).subscribe(
          (response) => { // Use 'response' instead of 'res'
            if (response.flag) {
              localStorage.setItem("token", token);
              this.emailValue = localStorage.getItem("emailValue") || "null";
              this.firstName = localStorage.getItem("firstName") || "null";
              this.lastName = localStorage.getItem("lastName") || "null";
              this.phoneNumber = localStorage.getItem("phoneNumber") || "null";
              this.address=localStorage.getItem("address") || "null";
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

  update() {
    if (this.inputElement) {
      this.convertInputToDisplay('');
    }
    const data = {
      token: this.token,
      fname: this.firstName,
      lname: this.lastName,
      phone: this.phoneNumber,
      address: this.address
    };
    let json = { "jsonData": JSON.stringify(data) };
    console.log(json);

    this._update.verify(json).subscribe(
      (res) => {
        Swal.fire(res.status, res.message, res.status);
      },
      (err) => {
        if (err instanceof HttpErrorResponse && err.status === 0) {
          const errorMessage = 'API is not online';
          console.error(errorMessage);
          Swal.fire('ERROR', errorMessage, 'error');
        }
        else {
          console.error(err);
          const errorMessage = err?.message || 'An error unknown occurred.';
          console.log(errorMessage);
          Swal.fire('ERROR', errorMessage, 'error');
        }
      }
    );


  }

  editEmail(event: MouseEvent) {
    event.stopPropagation();
    // Email is non-editable, so no edit function is needed for it
  }

  editFirstName(event: MouseEvent) {
    this.editField('firstName', event);
  }

  editLastName(event: MouseEvent) {
    this.editField('lastName', event);
  }

  editPhoneNumber(event: MouseEvent) {
    this.editField('phoneNumber', event);
  }
  editaddress(event: MouseEvent) {
    this.editField('address', event);
  }

  editField(field: string, event: MouseEvent) {
    event.stopPropagation();

    const fieldElement = this.elementRef.nativeElement.querySelector(`#${field}`);
    if (fieldElement instanceof HTMLSpanElement) {
      const fieldValue = fieldElement.innerText;

      this.inputElement = document.createElement('input');
      this.inputElement.type = 'text';
      this.inputElement.value = fieldValue;
      this.inputElement.classList.add('edit-input');

      fieldElement.parentNode?.replaceChild(this.inputElement, fieldElement);
      this.inputElement.focus();

      this.blurEventListener = () => {
        this.convertInputToDisplay(field);
      };

      this.inputElement.addEventListener('blur', this.blurEventListener);
    }
  }

  convertInputToDisplay(field: string) {
    if (this.inputElement) {
      const displayElement = document.createElement('span');
      displayElement.id = field;
      displayElement.innerText = this.inputElement.value;
      this.inputElement.parentNode?.replaceChild(displayElement, this.inputElement);

      // Update the variable values based on the field
      if (field === 'emailValue') {
        this.emailValue = this.inputElement.value;
      } else if (field === 'firstName') {
        this.firstName = this.inputElement.value;
      } else if (field === 'lastName') {
        this.lastName = this.inputElement.value;
      } else if (field === 'phoneNumber') {
        this.phoneNumber = this.inputElement.value;
      }else if (field === 'address') {
        this.address = this.inputElement.value;
      }

      // Adjusted type to HTMLInputElement
      this.inputElement = null as unknown as HTMLInputElement;

      if (this.blurEventListener) {
        // Call removeEventListener on this.inputElement (HTMLInputElement)
        this.inputElement.removeEventListener('blur', this.blurEventListener);
        this.blurEventListener = null;
      }
    }
  }
  logout() {
    this.route.queryParams.subscribe(params => {
      this.token = params['id'];
    });
    let json = { "jsonData": JSON.stringify(this.token) };
    console.log(json)
    debugger
    this._logout.logout(json).subscribe(
      (res) => {

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

}
