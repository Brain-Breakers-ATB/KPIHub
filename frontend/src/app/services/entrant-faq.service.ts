import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntrantFAQ } from '../models/entrantFAQ';

@Injectable({
  providedIn: 'root'
})
export class EntrantFAQService {

  constructor(private httpClient:HttpClient) { }

  getEntrantFAQ(): Observable<EntrantFAQ[]> {
    const url = 'http://localhost:3000/api/entrantFAQ/GetEntrantFAQ';
    const mockUrl = 'assets/mocks/entrantFAQ.json';
    
    return this.httpClient.get<EntrantFAQ[]>(mockUrl);
  }
}
