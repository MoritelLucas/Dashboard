import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysubWidgetComponent } from './mysub-widget.component';

describe('MysubWidgetComponent', () => {
  let component: MysubWidgetComponent;
  let fixture: ComponentFixture<MysubWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysubWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MysubWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
