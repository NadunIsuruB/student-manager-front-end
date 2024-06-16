import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Access-Control-Allow-Credentials': 'true'
      })
    
    }

    return this.httpClient.post(
      "http://localhost:5071/api/User/Login",
      {email: email, password: password},
      headers
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("access_token") && localStorage.getItem("logged_in") === "1";
  }

  logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("logged_in");
  }

  getToken(): string {
    return localStorage.getItem("access_token") || "";
  }
}
