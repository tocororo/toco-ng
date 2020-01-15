import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermIndexerComponent } from './term-indexer.component';

describe('TermIndexerComponent', () => {
  let component: TermIndexerComponent;
  let fixture: ComponentFixture<TermIndexerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermIndexerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermIndexerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
