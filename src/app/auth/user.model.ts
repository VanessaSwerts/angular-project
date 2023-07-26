import { Injectable } from "@angular/core";

@Injectable()
export class User {

  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {

    console.log({ email, id, _token, _tokenExpirationDate })
  }

  get token() {
    return this._tokenExpirationDate && new Date() > this._tokenExpirationDate
      ? null
      : this._token;
  }
}