import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-base-footer',
  templateUrl: './base-footer.component.html',
  styleUrls: ['./base-footer.component.sass']
})
export class BaseFooterComponent implements OnDestroy {
  isDisplayed=true; 
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationStart), takeUntil(this.destroy$)).subscribe((event) => {
      this.isDisplayed= (event as NavigationStart).url !== "/contacts"
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
