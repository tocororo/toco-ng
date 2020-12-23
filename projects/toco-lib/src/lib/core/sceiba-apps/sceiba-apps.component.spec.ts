import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceibaAppsComponent } from './sceiba-apps.component';

describe('SceibaAppsComponent', () => {
  let component: SceibaAppsComponent;
  let fixture: ComponentFixture<SceibaAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceibaAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceibaAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
