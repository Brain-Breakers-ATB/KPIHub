import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Result} from '../models/results';


@Injectable({
    providedIn: 'root'
})

export class ResultsService {

    constructor(private httpClient: HttpClient) { }

    getResults(): Observable<{ data: { results: Result[], totalResults: number } }> {
        const mockUrl = 'assets/mocks/results.json';

        return this.httpClient.get<{ data: { results: Result[], totalResults: number } }>(mockUrl);
    }
}
