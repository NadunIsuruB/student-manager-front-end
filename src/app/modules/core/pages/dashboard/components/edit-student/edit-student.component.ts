import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data: {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  nic: string,
  address: string,
  dateOfBirth: string

}) { }
}
