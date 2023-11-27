import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntrantTgChannel } from '../models/entrantTelegramChannels';

@Injectable({
    providedIn: 'root'
})

export class EntrantTelegramChannelsService {
    constructor(private httpClient:HttpClient) { }

    getEntrantTgChannels(): Observable<EntrantTgChannel[]> {
        const url = 'http://localhost:3000/api/entrantTelegramChannels/GetEntrantTelegramChannel';
        const mockUrl = 'assets/mocks/entrantTelegramChannels.json';

        return this.httpClient.get<EntrantTgChannel[]>(url);
    }
}
