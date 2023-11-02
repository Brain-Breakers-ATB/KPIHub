import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent {
    constructor(private router: Router) { }

    isMainPage() {
        return this.router.url === '/';
    }
}
