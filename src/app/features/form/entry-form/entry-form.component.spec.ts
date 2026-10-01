import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockTranslateService } from '../../../../test-utils/mocks';
import { MockTranslatePipe } from '../../../../test-utils/mock-translate-pipe';
import { TranslateService } from '@ngx-translate/core';

import { EntryFormComponent } from './entry-form.component';

describe('EntryFormComponent', () => {
  let component: EntryFormComponent;
  let fixture: ComponentFixture<EntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryFormComponent, MockTranslatePipe],
      providers: [{ provide: TranslateService, useValue: mockTranslateService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EntryFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
