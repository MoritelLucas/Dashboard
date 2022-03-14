import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeWidgetsComponent } from './time-widgets.component';

describe('TimeWidgetsComponent', () => {
  let component: TimeWidgetsComponent;
  let fixture: ComponentFixture<TimeWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
