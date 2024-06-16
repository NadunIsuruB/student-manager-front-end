import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Subject, catchError, debounce, debounceTime, take, takeUntil, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { query } from '../../models/query.interface';
import { FormBuilder, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  students: any[] = [];
  unsubscribe$ = new Subject<void>();
  searchControl: FormControl;

  length = 0;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [2, 10, 25];

  studentQuery: query = {
    page: this.pageIndex,
    pageSize: this.pageSize,
    search: '',
    sort: 'asc',
    sortBy: 'name'
  };

  pageEvent: PageEvent;

  constructor(private router: Router, private studentService: StudentService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchControl = this.fb.control('');
    this.getStudents(this.studentQuery);

    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      takeUntil(this.unsubscribe$),
      tap((search: string) => {
        this.studentQuery.search = search;
        this.getStudents(this.studentQuery);
      })
    ).subscribe();
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("logged_in");
    this.router.navigate(['/']);
  }

  getStudents(query: query) {
    this.studentService.getStudents(query)
    .pipe(
      takeUntil(this.unsubscribe$),
      tap((res: any) => {
        this.students = res.students;
        this.length = res.total;
        this.pageSize = res.pageSize;
      }),
      catchError((err)=>{
        console.log(err);
        return err;
      })
    ).subscribe();
  }

  sortData(event: any) {
    const data = this.students.slice();
    if (!event.active || event.direction === '') {
      this.students = data;
      return;
    }

    this.studentQuery.sortBy = event.active;
    this.studentQuery.sort = event.direction;
    this.getStudents(this.studentQuery);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;

    this.studentQuery.page = e.pageIndex + 1;
    this.studentQuery.pageSize = this.pageSize;

    this.getStudents(this.studentQuery);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  editStudent(id: number) {
    
  }

  deleteStudent(id: number) {
    // this.studentService.deleteStudent(id)
    // .pipe(
    //   takeUntil(this.unsubscribe$),
    //   tap((res: any) => {
    //     this.getStudents(this.defaultQuery);
    //   }),
    //   catchError((err)=>{
    //     console.log(err);
    //     return err;
    //   })
    // ).subscribe();
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
