import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public user:any
  constructor() { }

  setUser(user:any){
    this.user=user
    localStorage.setItem('user',JSON.stringify(this.user))
  }

  getUser(){
    if (!this.user) {
      // Retrieve from local storage if not available in the service
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    return this.user;
  }
}
