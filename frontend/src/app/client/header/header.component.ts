import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router:Router) {}
  ngOnInit(): void {

  }
  reloadCategory(loaiSP) {
    // Navigate to the same route with a different parameter
    this.router.navigate(['/category',loaiSP]).then(()=>{
      window.location.reload()
    });
  }
}
