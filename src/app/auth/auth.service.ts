import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
      );
  }
}