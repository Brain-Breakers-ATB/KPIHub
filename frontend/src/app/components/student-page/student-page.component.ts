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
  activities: Activity[] = [];
  telegramChannels: any = [];
  constructor(private activitiesService: ActivitiesService) { }

  ngOnInit() {
    this.activitiesService.getActivities().pipe(take(1)).subscribe((activities: Activity[]) => {
      this.activities = activities
    })
  }
}
