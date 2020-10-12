import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRnpsComponent } from './rnps-input.component';

describe('InputRnpsComponent', () => {
  let component: InputRnpsComponent;
  let fixture: ComponentFixture<InputRnpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputRnpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRnpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
