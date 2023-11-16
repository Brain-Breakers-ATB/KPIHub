import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activities';
import { take } from 'rxjs';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.sass']
})

export class StudentPageComponent implements OnInit {
    readonly APIUrl = "http://localhost:3000/api/";

    //activities: Activity[] = [];
    activities: any = [];
    telegramChannels: any = [];

    //constructor(private activitiesService: ActivitiesService) { }
    constructor(private http: HttpClient) { }
    /*ngOnInit() {
    this.activitiesService.getActivities().pipe(take(1)).subscribe((activities: Activity[]) => {
    this.activities = activities
    })
    }*/

    refreshItems () {
        this.http.get(this.APIUrl+'activities/GetActivity').subscribe(data=>{
            this.activities=data;
        })

        this.http.get(this.APIUrl+'studentTelegramChannels/GetStudentTelegramChannel').subscribe(data=>{
            this.telegramChannels=data;
        })
    }

    ngOnInit() {
        this.refreshItems ();
    }
}
