import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.sass']
})

export class MainPageComponent implements OnInit {
    universityDescription: string = `Національний технічний університет України «Київський політехнічний інститут імені
    Ігоря Сікорського» – найбільший український університет і один з найбільших технічних університетів Європи.
    Університет працює і розвивається з 1898 року як кампус, в якому на одній території в 160 гектарів органічно об'єднані
    умови для навчання та відпочинку`;
    constructor(private mediaObserver: MediaObserver) {}

    listItems: string[] = [
        'Забезпечити користувачам легкий та швидкий доступ до всієї необхідної інформації про КПІ без зайвого переключення між різними ресурсами.',
        'Об\'єднати всі існуючі ресурси КПІ на одному сайті, включаючи актуальну інформацію про навчання, факультети, події, наукові досягнення та інші важливі дані.',
        'Забезпечити актуальність та цілісність інформації, уникнути дублювання даних і фрагментованості.',
        'Запровадити потужний пошуковий інструмент, що дозволить користувачам швидко знаходити потрібну інформацію, зменшуючи час, необхідний для пошуку.',
        'Покращити організацію і структуру сайту, щоб забезпечити легке навігування та доступ до різних розділів та послуг.',
        'Зробити більш сучасний дизайн, щоб користування сайтом було приємніше.'
    ];

    refreshItems () {}
    isMobile: boolean = false;
    ngOnInit(): void {
        this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
            this.isMobile = change.some((mediaChange) => mediaChange.mqAlias === 'xs' || mediaChange.mqAlias === 'sm');
        });
    }
}
