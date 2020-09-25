import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceViewReadComponent } from './source-view-read.component';

describe('SourceViewReadComponent', () => {
  let component: SourceViewReadComponent;
  let fixture: ComponentFixture<SourceViewReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceViewReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceViewReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
