import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAddComponent } from './org-add.component';

describe('OrgAddComponent', () => {
  let component: OrgAddComponent;
  let fixture: ComponentFixture<OrgAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
