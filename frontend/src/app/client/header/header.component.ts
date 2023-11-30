import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginRegisComponent } from '../login-regis/login-regis.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router:Router, public popUp: MatDialog) {}
  ngOnInit(): void {

  }
  reloadCategory(loaiSP) {
    this.router.navigate(['/client/category',loaiSP]).then(()=>{
      window.location.reload()
    });
  }
  openLogin():void
  {
    const popup = this.popUp.open(LoginRegisComponent,{
    });
    popup.afterClosed().subscribe(result =>{
      console.log(result);
    })
    }
}
