import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-base-header',
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.sass']
})
export class BaseHeaderComponent implements OnDestroy {
  isDisplayed=true; 
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationStart), takeUntil(this.destroy$)).subscribe((event) => {
      this.isDisplayed= (event as NavigationStart).url === "/"
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
