import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasaWidgetComponent } from './nasa-widget.component';

describe('NasaWidgetComponent', () => {
  let component: NasaWidgetComponent;
  let fixture: ComponentFixture<NasaWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NasaWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NasaWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
