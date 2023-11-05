import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.sass']
})
export class StudentPageComponent implements OnInit {
  readonly APIUrl="http://localhost:3000/api/";
  constructor (private http:HttpClient) {
  }
  activities: any=[];

  telegramChannels = [
        {
            name: 'Офіційний Telegram-канал КПІ',
            imageSrc: '../../../assets/img/student-page-img/tab1img.jpg',
            link: 'https://t.me/presinfokpi'
        },
        {
            name: 'Канал Загального відділу',
            imageSrc: '../../../assets/img/student-page-img/tab2img.jpg',
            link: 'https://t.me/zv_kpi'
        },
        {
            name: 'Департамент навчально-виховної роботи',
            imageSrc: '../../../assets/img/student-page-img/tab3img.jpg',
            link: 'https://t.me/dnvr_31'
        },
        {
            name: 'Студентська Соціальна Служба',
            imageSrc: '../../../assets/img/student-page-img/tab4img.jpg',
            link: 'https://t.me/sss_kpi'
        },
        {
            name: 'Мобільність КПІ',
            imageSrc: '../../../assets/img/student-page-img/tab5img.jpg',
            link: 'https://t.me/kpimobility'
        },
        {
            name: 'КПІстипендія',
            imageSrc: '../../../assets/img/student-page-img/tab6img.jpg',
            link: 'https://t.me/kpischolarship'
        },
        {
            name: 'Студентська рада КПІ',
            imageSrc: '../../../assets/img/student-page-img/tab7img.jpg',
            link: 'http://t.me/sr_kpi'
        },
        {
            name: 'Студентська рада Студмістечка',
            imageSrc: '../../../assets/img/student-page-img/tab8img.jpg',
            link: 'http://t.me/kpicampus'
        },
        {
            name: 'Профком студентів',
            imageSrc: '../../../assets/img/student-page-img/tab9img.jpg',
            link: 'https://t.me/pskpi'
        },
        {
            name: 'Гуртожитки',
            imageSrc: '../../../assets/img/student-page-img/tab10img.jpg',
            link: 'https://t.me/studmisto'
        },
        {
            name: 'Бібліотека',
            imageSrc: '../../../assets/img/student-page-img/tab11img.jpg',
            link: 'https://t.me/kpi_library'
        },
    ];

  refreshItems () {
    this.http.get(this.APIUrl+'activities/GetItems').subscribe(data=>{
      this.activities=data;
    })
  }

  ngOnInit() {
    this.refreshItems ();
  }
}
