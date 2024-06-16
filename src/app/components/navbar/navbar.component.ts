import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeLast, tap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) { }


  reloadShop() {
    if (!this.router.url.includes('/shop?item=')) {
      return;
    }
    this.router.navigate(['/shop']).then(() => {
      window.location.reload();
    });
  }

  logout() {
    this.authService.logout();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
