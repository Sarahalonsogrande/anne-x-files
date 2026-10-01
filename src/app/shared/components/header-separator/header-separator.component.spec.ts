import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSeparatorComponent } from './header-separator.component';

describe('HeaderSeparatorComponent', () => {
  let component: HeaderSeparatorComponent;
  let fixture: ComponentFixture<HeaderSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSeparatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSeparatorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
