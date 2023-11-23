import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
    selector: 'app-base-header',
    templateUrl: './base-header.component.html',
    styleUrls: ['./base-header.component.sass']
})

export class BaseHeaderComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationStart),
        takeUntil(this.destroy$)).subscribe((event) => {
            this.isDisplayed= (event as NavigationStart).url === "/"
        })
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
  }

  isMainPage() {
        return this.router.url === '/';
  }

  isDisplayed: boolean = true;

  menu: { label: string, link: string }[] = [
      { label: 'ВСТУПНИКУ', link: 'entrant' },
      { label: 'СТУДЕНТУ', link: 'student' },
      { label: 'ГАЛЕРЕЯ', link: 'gallery' },
      { label: 'МАПА', link: 'map' },
      { label: 'ІНСТИТУТИ & ФАКУЛЬТЕТИ', link: 'subdivisions' },
      { label: 'КОНТАКТИ', link: 'contacts' }
  ];
}
