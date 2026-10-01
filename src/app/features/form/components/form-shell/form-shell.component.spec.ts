import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockTranslateService } from '../../../../../test-utils/mocks';
import { MockTranslatePipe } from '../../../../../test-utils/mock-translate-pipe';
import { TranslateService } from '@ngx-translate/core';

import { FormShellComponent } from './form-shell.component';

describe('FormShellComponent', () => {
  let component: FormShellComponent;
  let fixture: ComponentFixture<FormShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormShellComponent, MockTranslatePipe],
      providers: [{ provide: TranslateService, useValue: mockTranslateService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormShellComponent);
    component = fixture.componentInstance;
    // Provide a minimal itemModel signal to satisfy template usage
    component.itemModel = (() => ({ id: '1', title: 'Test' })) as any;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
