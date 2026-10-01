import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockActivatedRoute, mockTranslateService } from '../../../test-utils/mocks';
import { MockTranslatePipe } from '../../../test-utils/mock-translate-pipe';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { CarouselComponent } from '@app/shared/components/carousel/carousel.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeComponent, MockTranslatePipe],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    })
      .compileComponents();

    // Prevent Carousel's DOM-heavy lifecycle from running in tests
    CarouselComponent.prototype.ngAfterViewInit = function () { };

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
