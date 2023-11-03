import { Component } from '@angular/core';

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
}
