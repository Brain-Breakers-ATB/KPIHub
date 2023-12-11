import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Institute} from '../models/institutes';

@Injectable({
    providedIn: 'root'
})

export class InstitutesService {
    constructor(private httpClient: HttpClient) { }

    getInstitutes(): Observable<Institute[]> {
        const mockUrl = 'assets/mocks/institutes.json';
        return this.httpClient.get<Institute[]>(mockUrl);
    }
}
