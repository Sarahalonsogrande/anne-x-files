/**
 * ModeSwitcherComponent – Handles Mode selection for the app.
 *
 * - Renders `app-spin-button` with `MODE_OPTIONS`.
 * - Uses centralized MODE_OPTIONS for available modes.
 * - Integrates with ModeService for type-safe mode switching.
 * - Uses `ChangeDetectionStrategy.OnPush` for performance.
 *
 * @example
 * <app-nav-toggle></app-nav-toggle>
 */

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {NAV_OPTIONS, SwitcherOption } from '@app/core/constants/ui/ui-config.constants';
import { ToggleButtonComponent } from '@app/shared/components/toggle-button/toggle-button.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-toggle',
    templateUrl: './nav-toggle.component.html',
    styleUrls: ['./nav-toggle.component.scss'],
    imports: [TranslateModule, ToggleButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavToggleComponent {
    // Injected Router.
    private readonly router = inject(Router);

    // Available nav options (single source of truth).
    readonly navOptions = NAV_OPTIONS;

    setView(option: SwitcherOption) {
        if (option.value === 'home') {
            this.router.navigate(['/welcome']);
        } else if (option.value === 'favs') {
            this.router.navigate(['generic-list/favorites']);
        }
    }
}
