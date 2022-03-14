import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeSearchWidgetComponent } from './youtube-search-widget.component';

describe('YoutubeSearchWidgetComponent', () => {
  let component: YoutubeSearchWidgetComponent;
  let fixture: ComponentFixture<YoutubeSearchWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeSearchWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeSearchWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
