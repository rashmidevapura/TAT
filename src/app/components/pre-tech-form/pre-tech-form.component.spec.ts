import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreTechFormComponent } from './pre-tech-form.component';

describe('PreTechFormComponent', () => {
  let component: PreTechFormComponent;
  let fixture: ComponentFixture<PreTechFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreTechFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreTechFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
