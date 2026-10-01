import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockActivatedRoute, mockTranslateService } from '../../../../test-utils/mocks';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

import { GenericListComponent } from './generic-list.component';

describe('GenericListComponent', () => {
  let component: GenericListComponent;
  let fixture: ComponentFixture<GenericListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(GenericListComponent as any);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
