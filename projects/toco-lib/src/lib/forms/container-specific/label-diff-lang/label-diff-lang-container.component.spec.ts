import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerLabelDiffLangComponent } from './label-diff-lang-container.component';

describe('ContainerLabelDiffLangComponent', () => {
  let component: ContainerLabelDiffLangComponent;
  let fixture: ComponentFixture<ContainerLabelDiffLangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerLabelDiffLangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerLabelDiffLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
