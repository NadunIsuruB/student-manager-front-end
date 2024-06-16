import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { CoreRoutingModule } from './core-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorInterceptor } from 'src/app/services/http-interceptor.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { EditStudentComponent } from './pages/dashboard/components/edit-student/edit-student.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EditStudentComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true
    },
  ],
})
export class CoreModule { }
