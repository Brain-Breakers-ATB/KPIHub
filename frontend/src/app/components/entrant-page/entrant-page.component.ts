import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { EntrantFAQService } from 'src/app/services/entrant-faq.service';
import { EntrantFAQ } from 'src/app/models/entrantFAQ';
import { take } from 'rxjs';
import {EntrantTgChannel} from "../../models/entrantTelegramChannels";
import {EntrantTelegramChannelsService} from 'src/app/services/entrant-telegram-channels.service';

@Component({
    selector: 'app-entrant-page',
    templateUrl: './entrant-page.component.html',
    styleUrls: ['./entrant-page.component.sass']
})

export class EntrantPageComponent {
    expandedBoxes: Set<number> = new Set<number>();

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

    readonly APIUrl = "http://localhost:3000/api/";

    constructor(private entrantFAQService: EntrantFAQService, private entrantTgChannelsService: EntrantTelegramChannelsService) { }

    //tableItems: any = [];
    //faqItems: any=[];

    faqItems: EntrantFAQ[] = [];
    tableItems: EntrantTgChannel[] = [];
    ngOnInit() {
        this.entrantFAQService.getEntrantFAQ().pipe(take(1)).subscribe((entrantFAQ: EntrantFAQ[]) => {
        this.faqItems = entrantFAQ
        })

        this.entrantTgChannelsService.getEntrantTgChannels().pipe(take(1)).subscribe((entrantTgChannels: EntrantTgChannel[]) => {
            this.tableItems = entrantTgChannels
        })
    }

    /* refreshItems () {
        this.http.get(this.APIUrl+'entrantFAQ/GetEntrantFAQ').subscribe(data=>{
            this.faqItems=data;
        })

        this.http.get(this.APIUrl+'entrantTelegramChannels/GetEntrantTelegramChannel').subscribe(data=>{
            this.tableItems=data;
        })
    }

    ngOnInit() {
        this.refreshItems ();
    } */
}
