import {Component} from '@angular/core';
import {EntrantFAQService} from 'src/app/services/entrant-faq.service';
import {EntrantFAQ} from 'src/app/models/entrantFAQ';
import {take} from 'rxjs';
import {EntrantTgChannel} from "../../models/entrantTelegramChannels";
import {EntrantTelegramChannelsService} from 'src/app/services/entrant-telegram-channels.service';

@Component({
    selector: 'app-entrant-page',
    templateUrl: './entrant-page.component.html',
    styleUrls: ['./entrant-page.component.sass']
})

export class EntrantPageComponent {
    expandedBoxes: Set<number> = new Set<number>();
    faqItems: EntrantFAQ[] = [];
    tableItems: EntrantTgChannel[] = [];
    isEntrantFAQLoading: boolean = true;
    isEntrantTgChannelsLoading: boolean = true;

    isBoxExpanded(boxId: number): boolean {
        return this.expandedBoxes.has(boxId);
    }

    expandBox(boxId: number) {
        if (this.expandedBoxes.has(boxId)) {
            this.expandedBoxes.delete(boxId);
        } else {
            this.expandedBoxes.add(boxId);
        }
    }

    constructor(private entrantFAQService: EntrantFAQService, private entrantTgChannelsService:
        EntrantTelegramChannelsService) { }

    ngOnInit() {
        this.entrantFAQService.getEntrantFAQ().pipe(take(1)).subscribe((entrantFAQ: EntrantFAQ[]) => {
            this.faqItems = entrantFAQ
            this.isEntrantFAQLoading = false;
        })

        this.entrantTgChannelsService.getEntrantTgChannels().pipe(take(1)).
        subscribe((entrantTgChannels: EntrantTgChannel[]) => {
            this.tableItems = entrantTgChannels
            this.isEntrantTgChannelsLoading = false;
        })
    }
}
