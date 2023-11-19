import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentTgChannel } from '../models/studentTelegramChannels';

@Injectable({
  providedIn: 'root'
})
export class StudentTelegramChannelsService {

  constructor(private httpClient:HttpClient) { }

  getStudentTgChannels(): Observable<StudentTgChannel[]> {
    const url = 'http://localhost:3000/api/studentTelegramChannels/GetStudentTelegramChannel';
    const mockUrl = 'assets/mocks/studentTelegramChannels.json';

    return this.httpClient.get<StudentTgChannel[]>(url);
  }
}
