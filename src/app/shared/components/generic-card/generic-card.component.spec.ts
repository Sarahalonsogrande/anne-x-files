import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCardComponent } from './generic-card.component';

describe('GenericCardComponent', () => {
  let component: GenericCardComponent<any>;
  let fixture: ComponentFixture<GenericCardComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericCardComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(GenericCardComponent as any);
    component = fixture.componentInstance as GenericCardComponent<any>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
