import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockTranslateService } from '../../../../test-utils/mocks';
import { MockTranslatePipe } from '../../../../test-utils/mock-translate-pipe';
import { TranslateService } from '@ngx-translate/core';

import { CreateFormComponent } from './create-form.component';

describe('CreateFormComponent', () => {
  let component: CreateFormComponent;
  let fixture: ComponentFixture<CreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFormComponent, MockTranslatePipe],
      providers: [{ provide: TranslateService, useValue: mockTranslateService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
