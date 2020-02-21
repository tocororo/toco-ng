import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceViewComponent } from './source-view.component';

describe('SourceViewComponent', () => {
  let component: SourceViewComponent;
  let fixture: ComponentFixture<SourceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
