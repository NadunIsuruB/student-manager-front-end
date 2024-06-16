import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router, private studentService: StudentService) { }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("logged_in");
    this.router.navigate(['/']);
  }

  getStudents() {
    this.studentService.getStudents()
    .pipe(
      tap((res: any) => {
        console.log(res);
      }),
      catchError((err)=>{
        console.log(err);
        return err;
      })
    ).subscribe();
  }
}
