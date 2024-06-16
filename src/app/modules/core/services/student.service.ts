import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { query } from '../models/query.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  getStudents(query: query) {
    const queryToSend = {
      page: query.page,
      pageSize: query.pageSize,
      search: query.search,
      sort:  query.sort,
      sortBy: query.sortBy
    };

    return this.httpClient.get('http://localhost:5071/api/Student', {params: queryToSend});
  }
}
