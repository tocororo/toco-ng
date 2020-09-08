import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceIndexesComponent } from './source-indexes.component';

describe('SourceIndexesComponent', () => {
  let component: SourceIndexesComponent;
  let fixture: ComponentFixture<SourceIndexesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceIndexesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceIndexesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
