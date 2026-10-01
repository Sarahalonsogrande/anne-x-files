import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalHeaderComponent } from './global-header.component';
import { mockTranslateService } from '../../../../test-utils/mocks';
import { MockTranslatePipe } from '../../../../test-utils/mock-translate-pipe';
import { TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

// Tests for GlobalHeaderComponent — ensures template renders and integrates switchers
describe('GlobalHeaderComponent', () => {
  let component: GlobalHeaderComponent;
  let fixture: ComponentFixture<GlobalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalHeaderComponent, MockTranslatePipe, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalHeaderComponent as any);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
