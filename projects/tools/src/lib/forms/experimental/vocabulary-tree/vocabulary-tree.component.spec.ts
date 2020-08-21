import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyTreeComponent } from './vocabulary-tree.component';

describe('VocabularyTreeComponent', () => {
  let component: VocabularyTreeComponent;
  let fixture: ComponentFixture<VocabularyTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularyTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
