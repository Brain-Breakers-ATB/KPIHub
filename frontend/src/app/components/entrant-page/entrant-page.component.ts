import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { EntrantFAQService } from 'src/app/services/entrant-faq.service';
import { EntrantFAQ } from 'src/app/models/entrantFAQ';
import { take } from 'rxjs';

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

        const content = document.getElementById(`content-${boxId}`);
        if (content) {
            const box = content.parentElement;
            if (box) {
                if (content.style.display === 'none' || content.style.display === '') {
                    content.style.display = 'block';
                    box.style.height = '400px';
                } else {
                    content.style.display = 'none';
                    box.style.height = '113px';
                }
            }
        }
    }

    readonly APIUrl = "http://localhost:3000/api/";

    constructor(private entrantFAQService: EntrantFAQService) { }
    
    tableItems: any = [];
    //faqItems: any=[];

    faqItems: EntrantFAQ[] = [];

    ngOnInit() {
        this.entrantFAQService.getEntrantFAQ().pipe(take(1)).subscribe((entrantFAQ: EntrantFAQ[]) => {
            this.faqItems = entrantFAQ
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
