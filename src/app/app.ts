import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { GlobalHeaderComponent } from './shared/components/global-header/global-header.component';
import { LanguageService } from '@app/core/services/language/language.service';
import { UiModeService } from './core/services/ui-modes/ui-mode.service';
import { UiMoodService } from './core/services/ui-moods/ui-mood.service';

/**
 * Root app component.
 * Initializes services for theming and language on app startup.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, GlobalHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  constructor(
    private languageService: LanguageService,
    private modeService: UiModeService,
    private moodService: UiMoodService,
  ) { }

  ngOnInit(): void {
    // Initialize theming and language services to apply stored preferences.
    this.languageService.init();
    this.modeService.init();
    this.moodService.init();
  }

}

