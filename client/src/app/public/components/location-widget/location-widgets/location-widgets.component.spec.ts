import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationWidgetsComponent } from './location-widgets.component';

describe('LocationWidgetsComponent', () => {
  let component: LocationWidgetsComponent;
  let fixture: ComponentFixture<LocationWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
