import {Component} from '@angular/core';
import {TreeNode} from 'primeng/api';

@Component({
    selector: 'app-gallery-page',
    templateUrl: './gallery-page.component.html',
    styleUrls: ['./gallery-page.component.sass']
})

export class GalleryPageComponent {
    selectedNodes: TreeNode<string> = {
        label: 'Оберіть інститут/факультет'
    };
    nodes: TreeNode<string> [] = [{
        label: 'Інститути',
        selectable: false,
        children: [{
            label: 'ІСЗЗІ',
            key: '1'
        },
            {
                label: 'НН ВПІ',
                key: '2'
            },
            {
                label: 'НН ІАТ',
                key: '3'
            },
            {
                label: 'НН ІАТЕ',
                key: '4'
            },
            {
                label: 'НН ІЕЕ',
                key: '5'
            },
            {
                label: 'НН ІМЗ',
                key: '6'
            },
            {
                label: 'НН ІПСА',
                key: '7'
            },
            {
                label: 'НН ІТС',
                key: '8'
            },
            {
                label: 'НН ММІ',
                key: '9'
            },
            {
                label: 'НН ФТІ',
                key: '10'
            }
        ]
    },
        {
            label: 'Факультети',
            selectable: false,
            children: [{
                label: 'ІХФ',
                key: '14'
            },
                {
                    label: 'ПБФ',
                    key: '15'
                },
                {
                    label: 'РТФ',
                    key: '16'
                },
                {
                    label: 'ФБМІ',
                    key: '17'
                },
                {
                    label: 'ФБТ',
                    key: '18'
                },
                {
                    label: 'ФЕА',
                    key: '19'
                },
                {
                    label: 'ФЕЛ',
                    key: '20'
                },
                {
                    label: 'ФІОТ',
                    key: '21'
                },
                {
                    label: 'ФЛ',
                    key: '22'
                },
                {
                    label: 'ФММ',
                    key: '23'
                },
                {
                    label: 'ФСП',
                    key: '24'
                },
                {
                    label: 'ФПМ',
                    key: '25'
                },
                {
                    label: 'ФМФ',
                    key: '26'
                },
                {
                    label: 'ХТФ',
                    key: '27'
                }
            ]
        }];

    scrollTo(elementId: string): void {
        console.log("work")
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }
}
