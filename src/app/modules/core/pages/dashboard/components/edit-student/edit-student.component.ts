import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit{
  formTitle = 'Edit Student';
  studentForm: FormGroup;

  @Output() 
  saveEvent = new EventEmitter<any>();

 constructor(@Inject(MAT_DIALOG_DATA) public data: {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  mobile: string,
  nic: string,
  address: string,
  dateOfBirth: string
},
private fb: FormBuilder,
private dialogRef: MatDialogRef<EditStudentComponent>
) {
  this.formTitle = data?.id ? 'Edit Student' : 'Add Student';
  this.studentForm = this.fb.group({
    id: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.email],
    mobile: ['', Validators.required],
    nic: ['', Validators.required],
    address: ['', Validators.required],
    dateOfBirth: ['', Validators.required]
  });
 }

ngOnInit(): void {
  console.log(this.data);
    this.studentForm = this.fb.group({
      id: [this.data.id ?? ''],
      firstName: [this.data.firstName ?? '', Validators.required],
      lastName: [this.data.lastName ?? '', Validators.required],
      email: [this.data.email ?? '', Validators.email],
      mobile: [this.data.mobile ?? '', Validators.required],
      nic: [this.data.nic ?? '', Validators.required],
      address: [this.data.address ?? '', Validators.required],
      dateOfBirth: [formatDate(this.data.dateOfBirth, 'yyyy-MM-dd', 'en') ?? '', Validators.required]
    });
}

onSave() {
  if (!this.studentForm.valid) {
    alert('Please fill all the required fields');
    return;
  }
  this.saveEvent.emit(this.studentForm.value);
}

onCancel() {
  this.dialogRef.close();
}
}
