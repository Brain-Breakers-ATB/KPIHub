import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from 'src/app/services/activities.service';
import {StudentTelegramChannelsService} from 'src/app/services/student-telegram-channels.service';
import {Activity} from 'src/app/models/activities';
import {take} from 'rxjs';
import {StudentTgChannel} from 'src/app/models/studentTelegramChannels';

@Component({
    selector: 'app-student-page',
    templateUrl: './student-page.component.html',
    styleUrls: ['./student-page.component.sass']
})

export class StudentPageComponent implements OnInit {
    activities: Activity[] = [];
    telegramChannels: StudentTgChannel[] = [];
    isActivitiesLoading: boolean = true;
    isStudentTgChannelsLoading: boolean = true;

    constructor(private activitiesService: ActivitiesService, private studentTgChannelsService:
        StudentTelegramChannelsService) {
    }

    ngOnInit() {
        this.activitiesService.getActivities().pipe(take(1)).subscribe((activities: Activity[]) => {
            this.activities = activities
            this.isActivitiesLoading = false;
        })

        this.studentTgChannelsService.getStudentTgChannels().pipe(take(1)).
        subscribe((studentTgChannels: StudentTgChannel[]) => {
            this.telegramChannels = studentTgChannels
            this.isStudentTgChannelsLoading = false;
        })
    }

    scrollTo(elementId: string): void {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }
}
