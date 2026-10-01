import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockTranslateService } from '../../../../../test-utils/mocks';
import { MockTranslatePipe } from '../../../../../test-utils/mock-translate-pipe';
import { TranslateService } from '@ngx-translate/core';

import { FormItemComponent } from './form-item.component';

describe('FormItemComponent', () => {
  let component: FormItemComponent;
  let fixture: ComponentFixture<FormItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormItemComponent, MockTranslatePipe],
      providers: [{ provide: TranslateService, useValue: mockTranslateService }]
    })
      .compileComponents();

    // Override the template to avoid running Angular forms control directives in unit test
    TestBed.overrideComponent(FormItemComponent, { set: { template: '<section></section>' } });

    fixture = TestBed.createComponent(FormItemComponent);
    component = fixture.componentInstance;
    // provide a minimal itemForm input used by the template
    component.itemForm = {
      title: (() => '') as any,
      subtitle: (() => '') as any,
      level: (() => '') as any,
      image: (() => '') as any,
      description: (() => '') as any,
    } as any;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
