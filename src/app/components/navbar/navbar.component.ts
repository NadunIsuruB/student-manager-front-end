import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeLast, tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) { }


  reloadShop() {
    if (!this.router.url.includes('/shop?item=')) {
      return;
    }
    this.router.navigate(['/shop']).then(() => {
      window.location.reload();
    });
  }
}
