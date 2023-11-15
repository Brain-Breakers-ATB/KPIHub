import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntrantPageComponent } from './entrant-page.component';

describe('EntrantPageComponent', () => {
  let component: EntrantPageComponent;
  let fixture: ComponentFixture<EntrantPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [EntrantPageComponent]});
    fixture = TestBed.createComponent(EntrantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {expect(component).toBeTruthy();});
});
