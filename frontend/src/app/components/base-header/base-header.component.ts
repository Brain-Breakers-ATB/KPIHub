import { Component, OnDestroy, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-base-header',
    templateUrl: './base-header.component.html',
    styleUrls: ['./base-header.component.sass'],
})
export class BaseHeaderComponent implements OnDestroy {
    private destroy$: Subject<boolean> = new Subject<boolean>();
    isMobileView = false;
    isDisplayed = true;
    expandedMenu = false;
    menu: { label: string; link: string }[] = [
        { label: 'ВСТУПНИКУ', link: 'entrant' },
        { label: 'СТУДЕНТУ', link: 'student' },
        { label: 'ГАЛЕРЕЯ', link: 'gallery' },
        { label: 'ІНСТИТУТИ & ФАКУЛЬТЕТИ', link: 'subdivisions' },
        { label: 'КОНТАКТИ', link: 'contacts' },
    ];

    items: MenuItem[] = [
        {
            label: 'ГОЛОВНА',
            routerLink: '/',
            icon: 'pi pi-fw pi-home',
        },
        {
            label: 'ВСТУПНИКУ',
            routerLink: 'entrant',
        },
        {
            label: 'СТУДЕНТУ',
            routerLink: 'student',
        },
        {
            label: 'ГАЛЕРЕЯ',
            routerLink: 'gallery',
        },
        {
            label: 'ІНСТИТУТИ & ФАКУЛЬТЕТИ',
            routerLink: 'subdivisions',
        },
        {
            label: 'КОНТАКТИ',
            routerLink: 'contacts',
        },
    ];

    constructor(private router: Router) {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationStart),
                takeUntil(this.destroy$)
            )
            .subscribe((event) => {
                this.isDisplayed = (event as NavigationStart).url === '/';
            });
        this.checkIsMobileView();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    isMainPage() {
        return this.router.url === '/';
    }

    @HostListener('window: resize', ['$event.target'])
    onResize(event: Window): void {
        this.checkIsMobileView();
    }

    checkIsMobileView(): void {
        this.isMobileView = window.innerWidth <= 750;
    }
}
