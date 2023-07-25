import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      console.log('TO DO')
    }
    else {
      this.authService
        .singUp(email, password)
        .subscribe(
          resData => { console.log(resData); },
          error => { console.error(error); }
        );
    }

    form.reset()
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}