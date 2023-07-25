import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
  private apiKey: string = 'AIzaSyDurtMkpP_eAXT8j3vn3pL4vHlAzxl3I3g'

  constructor(
    private http: HttpClient
  ) { }

  singUp(email: string, password: string) {
    const authBody = {
      email,
      password,
      returnSecureToken: true
    }

    return this.http
      .post<AuthResponseData>(
        this.authUrl + this.apiKey,
        authBody
      )
      .pipe(catchError(errorResp => {

        if (!errorResp.error || !errorResp.error.error) {
          return throwError('An unknown error occurred!');
        }

        const errorMessage = this.getErrorMessage(errorResp);

        return throwError(errorMessage);
      }));
  }

  getErrorMessage(errorRes) {
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        return 'The email address exists already';
      case 'OPERATION_NOT_ALLOWED':
        return 'Password sign-in is disabled for this project';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'We have blocked all requests from this device due to unusual activity. Try again later';
      default:
        return 'An unknown error occurred!';
    }
  }
}