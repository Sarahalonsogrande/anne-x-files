import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { mockTranslateService } from '../test-utils/mocks';
import { MockTranslatePipe } from '../test-utils/mock-translate-pipe';
import { TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterTestingModule, MockTranslatePipe],
      providers: [{ provide: TranslateService, useValue: mockTranslateService }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, anne-x-files');
  });
});
