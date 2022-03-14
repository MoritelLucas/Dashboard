import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiotsummonerComponent } from './riotsum-widget.component';

describe('RiotsummonerComponent', () => {
  let component: RiotsummonerComponent;
  let fixture: ComponentFixture<RiotsummonerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiotsummonerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiotsummonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
