import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCountSourcesByTermComponent } from './list-count-sources-by-term.component';

describe('ListCountSourcesByTermComponent', () => {
  let component: ListCountSourcesByTermComponent;
  let fixture: ComponentFixture<ListCountSourcesByTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCountSourcesByTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCountSourcesByTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
