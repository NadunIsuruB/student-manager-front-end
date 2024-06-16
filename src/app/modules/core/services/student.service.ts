import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  getStudents() {
    const query = {
      page: 1,
      pageSize: 10,
      search: '',
      sort: 'asc',
      sortBy: 'firstname'
    };
    return this.httpClient.get('http://localhost:5071/api/Student', {params: query});
  }
}
