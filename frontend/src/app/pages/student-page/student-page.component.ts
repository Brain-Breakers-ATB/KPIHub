import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.sass']
})

export class StudentPageComponent implements OnInit {
  readonly APIUrl="http://localhost:3000/api/";
  constructor (private http:HttpClient) {}
  activities: any=[];
  telegramChannels: any=[];

  refreshItems () {
      this.http.get(this.APIUrl+'activities/GetActivities').subscribe(data=>{
          this.activities=data;
      })
      this.http.get(this.APIUrl+'studentTelegramChannels/GetStudentTelegramChannels').subscribe(data=>{
          this.telegramChannels=data;
      })
  }

  ngOnInit() {
    this.refreshItems ();
  }
}
