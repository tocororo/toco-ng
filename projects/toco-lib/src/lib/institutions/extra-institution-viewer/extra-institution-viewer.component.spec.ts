import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraInstitutionViewerComponent } from './extra-institution-viewer.component';

describe('ExtraInstitutionViewerComponent', () => {
  let component: ExtraInstitutionViewerComponent;
  let fixture: ComponentFixture<ExtraInstitutionViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraInstitutionViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraInstitutionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
