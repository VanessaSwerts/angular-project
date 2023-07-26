import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  successMessage: string = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.isLoginMode
      ? this.onSingIn(email, password)
      : this.onSingUp(email, password);

    form.reset()
  }

  onSingIn(email: string, password: string) {
    this.authService
      .singIn(email, password)
      .subscribe(
        resData => {
          if(resData.registered){
            this.router.navigate(['/recipes']);
          }

          this.isLoading = false;
        },
        errorMessage => {
          console.error(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
  }

  onSingUp(email: string, password: string) {
    this.authService
      .singUp(email, password)
      .subscribe(
        resData => {
          this.successMessage = 'The user was successfully created!'
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        errorMessage => {
          console.error(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  } 
}