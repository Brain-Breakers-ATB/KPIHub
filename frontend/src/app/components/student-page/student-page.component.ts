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

    constructor(private activitiesService: ActivitiesService, private studentTgChannelsService: StudentTelegramChannelsService) {
    }

    isActivitiesLoading: boolean = true;
    isStudentTgChannelsLoading: boolean = true;

    ngOnInit() {
        this.activitiesService.getActivities().pipe(take(1)).subscribe((activities: Activity[]) => {
            this.activities = activities
            this.isActivitiesLoading = false;
        })

        this.studentTgChannelsService.getStudentTgChannels().pipe(take(1)).subscribe((studentTgChannels:
                                                                                          StudentTgChannel[]) => {
            this.telegramChannels = studentTgChannels
            this.isStudentTgChannelsLoading = false;
        })

        /* TODO: redo or remove
        window.addEventListener('scroll', function() {
            const title1 = document.getElementById('stickyTitle1');
            const title2 = document.getElementById('stickyTitle2');
            const title3 = document.getElementById('stickyTitle3');
            const title4 = document.getElementById('stickyTitle4');
            const scrollPosition = window.scrollY;

            const thresholds = [
                { element: title1, threshold: 1000 },
                { element: title2, threshold: 3125 },
                { element: title3, threshold: 6400 },
                { element: title4, threshold: 7650 }
            ];

            thresholds.forEach(({ element, threshold }, index) => {
                if (element != null && scrollPosition > threshold) {
                    element.classList.add('sticky');

                    const nextElement = thresholds[index + 1]?.element;
                    if (nextElement != null && scrollPosition > thresholds[index + 1]?.threshold) {
                        nextElement.classList.remove('sticky');
                    }
                } else if (element != null) {
                    element.classList.remove('sticky');
                }
            });
        });*/
    }
}
