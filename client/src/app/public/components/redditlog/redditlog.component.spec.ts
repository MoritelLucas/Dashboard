import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditlogComponent } from './redditlog.component';

describe('RedditlogComponent', () => {
  let component: RedditlogComponent;
  let fixture: ComponentFixture<RedditlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedditlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedditlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
