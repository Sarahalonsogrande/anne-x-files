import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockActivatedRoute, mockTranslateService } from '../../../../test-utils/mocks';
import { MockTranslatePipe } from '../../../../test-utils/mock-translate-pipe';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

import { EditFormComponent } from './edit-form.component';

describe('EditFormComponent', () => {
  let component: EditFormComponent;
  let fixture: ComponentFixture<EditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFormComponent, MockTranslatePipe],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
