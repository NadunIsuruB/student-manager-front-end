import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Subject, catchError, takeUntil, tap } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  unsubscribe$ = new Subject<void>();
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    if (localStorage.getItem("logged_in")) {
      this.router.navigate(['/webapp']);
      return;
    }

    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value,
      ).pipe(
        takeUntil(this.unsubscribe$),
        tap((res: any) => {
          this.saveJWT(res);
          this.router.navigate(['/webapp']);
        }),
        catchError((err)=>{
          alert("Incorrect Password or Username")
          return err;
        })
      ).subscribe();
      return;
    }
    alert("Invalid Password or Username")
  }


  saveJWT(token: string) {
    localStorage.setItem("access_token", token);
    localStorage.setItem("logged_in", "1");
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
