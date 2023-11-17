import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivitiesService } from 'src/app/services/activities.service';
import { StudentTelegramChannelsService } from 'src/app/services/student-telegram-channels.service';
import { Activity } from 'src/app/models/activities';
import { take } from 'rxjs';
import { StudentTgChannel } from 'src/app/models/studentTelegramChannels';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.sass']
})

export class StudentPageComponent implements OnInit {
    readonly APIUrl = "http://localhost:3000/api/";

    activities: Activity[] = [];
    //activities: any = [];
    telegramChannels: StudentTgChannel [] = [];

    constructor(private activitiesService: ActivitiesService, private studentTgChannelsService: StudentTelegramChannelsService) { }


    //constructor(private http: HttpClient) { }
    ngOnInit() {
    this.activitiesService.getActivities().pipe(take(1)).subscribe((activities: Activity[]) => {
    this.activities = activities
    })

    this.studentTgChannelsService.getStudentTgChannels().pipe(take(1)).subscribe((studentTgChannels: StudentTgChannel[]) => {
    this.telegramChannels = studentTgChannels
    })
    }

    /* refreshItems () {
        this.http.get(this.APIUrl+'activities/GetActivity').subscribe(data=>{
            this.activities=data;
        })

        this.http.get(this.APIUrl+'studentTelegramChannels/GetStudentTelegramChannel').subscribe(data=>{
            this.telegramChannels=data;
        })
    }

    ngOnInit() {
        this.refreshItems ();
    } */
}
