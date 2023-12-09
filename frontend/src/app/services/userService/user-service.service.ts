import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}
  public user: any;
  private readonly urlApi = 'http://localhost:3800/';
  setUser(user: any) {
    this.user = user;
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

  getUser() {
    if (!this.user) {
      // Retrieve from session storage if not available in the service
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }
    return this.user;
  }

  sendEmailService(email: string): Observable<any> {
    return this.http.post<any>(this.urlApi + 'send-email', {
      email: email,
    });
  }
  resetPasswordService(resetObj: any): Observable<any> {
    return this.http.post<any>(this.urlApi + 'reset-password', resetObj);
  }

  checkLogin(){
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user!=null){
      return true
    }else return false
  }

  logOUt(){
    sessionStorage.removeItem('user')
  }
}
