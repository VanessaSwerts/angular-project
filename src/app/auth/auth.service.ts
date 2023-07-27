import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";

import { environment } from "src/environment/environment"; 

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  singUp(email: string, password: string) {
    const authBody = {
      email,
      password,
      returnSecureToken: true
    }

    return this.http
      .post<AuthResponseData>(
        environment.signInUrl + environment.apiKey,
        authBody
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => this.handleAuthUser(resData))
      );
  }

  singIn(email: string, password: string) {
    const authBody = {
      email,
      password,
      returnSecureToken: true
    }

    return this.http
      .post<AuthResponseData>(
        environment.signInUrl + environment.apiKey,
        authBody
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => this.handleAuthUser(resData))
      );
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return;

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleAuthUser(resData) {
    const expirationDateInMiliSeconds = new Date().getTime() + (+resData.expiresIn * 1000);
    const expirationDate = new Date(expirationDateInMiliSeconds);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);

    this.user.next(user);
    this.autoLogout(+resData.expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResp: HttpErrorResponse) {
    console.log(errorResp.error)
    console.log(errorResp.error.error)
    if (!errorResp.error || !errorResp.error.error) {
      return throwError('An unknown error occurred!');
    }

    let errorMessage;

    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address exists already';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'The email address do not exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled';
        break;
      default:
        errorMessage = 'An unknown error occurred!';
        break;
    }

    return throwError(errorMessage);
  }
}