import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceOrganizationsComponent } from './source-organizations.component';

describe('SourceOrganizationsComponent', () => {
  let component: SourceOrganizationsComponent;
  let fixture: ComponentFixture<SourceOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
