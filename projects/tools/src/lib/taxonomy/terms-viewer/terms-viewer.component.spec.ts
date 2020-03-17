import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsViewerComponent } from './terms-viewer.component';

describe('TermsViewerComponent', () => {
  let component: TermsViewerComponent;
  let fixture: ComponentFixture<TermsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
