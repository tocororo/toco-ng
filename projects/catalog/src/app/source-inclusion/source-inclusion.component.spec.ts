import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceInclusionComponent } from './source-inclusion.component';

describe('SourceInclusionComponent', () => {
  let component: SourceInclusionComponent;
  let fixture: ComponentFixture<SourceInclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceInclusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceInclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
