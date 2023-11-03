import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-base-header',
    templateUrl: './base-header.component.html',
    styleUrls: ['./base-header.component.sass']
})
export class BaseHeaderComponent {
    constructor(private router: Router) { }

    isMainPage() {
        return this.router.url === '/';
    }
}
