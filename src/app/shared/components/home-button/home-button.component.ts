import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-button',
  imports: [TranslateModule],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.scss',
})
export class HomeButtonComponent {
  private router = inject(Router);

  isAnimating = signal(false);

  onHome() {
    this.isAnimating.set(true);
    // Navigate to home after animation
    setTimeout(() => {
      this.router.navigate(['/']);
      this.isAnimating.set(false);
    }, 600); // Match animation duration
  }
}
