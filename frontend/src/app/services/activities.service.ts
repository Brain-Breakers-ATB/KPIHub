import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Activity} from '../models/activities';

@Injectable({
    providedIn: 'root'
})

export class ActivitiesService {
    constructor(private httpClient: HttpClient) { }

    getActivities(): Observable<Activity[]> {
        const url = 'http://localhost:3000/api/activities/GetActivity';
        const mockUrl = 'assets/mocks/activities.json';
        return this.httpClient.get<Activity[]>(url);
    }
}
