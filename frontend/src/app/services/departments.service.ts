import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Department} from '../models/departments';

@Injectable({
    providedIn: 'root'
})

export class DepartmentsService {
    constructor(private httpClient: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    const url = 'http://localhost:3000/api/departments/GetDepartment'
    const mockUrl = 'assets/mocks/departments.json';

    return this.httpClient.get<Department[]>(url);
  }
}
