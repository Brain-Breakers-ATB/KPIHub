import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionsPageComponent } from './subdivisions-page.component';

describe('SubdivisionsPageComponent', () => {
  let component: SubdivisionsPageComponent;
  let fixture: ComponentFixture<SubdivisionsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubdivisionsPageComponent]
    });
    fixture = TestBed.createComponent(SubdivisionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
