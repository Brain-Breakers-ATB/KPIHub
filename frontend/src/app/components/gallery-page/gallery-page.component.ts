import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'app-gallery-page',
    templateUrl: './gallery-page.component.html',
    styleUrls: ['./gallery-page.component.sass']
})

export class GalleryPageComponent {
    selectedNodes: TreeNode<string> = {
        label: 'Оберіть інститут/факультет'
    };
    nodes: TreeNode<string>[] = [{
        label: 'Інститути',
        selectable: false,
        children: [
            {
                label: 'ІАТЕ',
                key: '1'
            },
            {
                label: 'ІСЗЗІ',
                key: '2'
            },
            {
                label: 'НН ВПІ',
                key: '4'
            },
            {
                label: 'НН ІАТ',
                key: '5'
            },
            {
                label: 'НН ІЕЕ',
                key: '6'
            },
            {
                label: 'НН ІМЗ',
                key: '7'
            },
            {
                label: 'НН ІПСА',
                key: '8'
            },
            {
                label: 'НН ІТС',
                key: '9'
            },
            {
                label: 'НН ММІ',
                key: '10'
            },
            {
                label: 'НН ФТІ',
                key: '11'
            }
        ]
    },
    {
        label: 'Факультети',
        selectable: false,
        children: [
            {
                label: 'ІХФ',
                key: '3'
            },
            {
                label: 'ПБФ',
                key: '12'
            },
            {
                label: 'РТФ',
                key: '13'
            },
            {
                label: 'ФБМІ',
                key: '14'
            },
            {
                label: 'ФБТ',
                key: '15'
            },
            {
                label: 'ФЕА',
                key: '16'
            },
            {
                label: 'ФЕЛ',
                key: '17'
            },
            {
                label: 'ФІОТ',
                key: '18'
            },
            {
                label: 'ФЛ',
                key: '19'
            },
            {
                label: 'ФММ',
                key: '20'
            },
            {
                label: 'ФСП',
                key: '21'
            },
            {
                label: 'ФПМ',
                key: '22'
            },
            {
                label: 'ФМФ',
                key: '23'
            },
            {
                label: 'ХТФ',
                key: '24'
            }
        ]
    }];

    scrollTo(elementId: string): void {
        console.log("work")
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
