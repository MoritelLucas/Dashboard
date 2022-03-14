import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiotmatchWidgetComponent } from './riotmatch-widget.component';

describe('RiotmatchWidgetComponent', () => {
  let component: RiotmatchWidgetComponent;
  let fixture: ComponentFixture<RiotmatchWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiotmatchWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiotmatchWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
