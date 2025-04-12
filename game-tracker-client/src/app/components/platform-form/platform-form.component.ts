import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { PlatformService, Platform } from '../../services/platform.service';

@Component({
  selector: 'app-platform-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './platform-form.component.html',
  styleUrls: ['./platform-form.component.css']
})
export class PlatformFormComponent {
  newPlatformName: string = '';
  errorMessage: string = '';

  constructor(
    private platformService: PlatformService,
    private router: Router
  ) {}

  addPlatform(): void {
    if (!this.newPlatformName.trim()) {
      this.errorMessage = 'Platform name is required.';
      return;
    }

    const newPlatform: Platform = { platformId: 0, name: this.newPlatformName };

    this.platformService.addPlatform(newPlatform).subscribe({
      next: (platform) => {
        this.router.navigate(['/games']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = 'Platform already exists.';
        } else if (err.status === 400) {
          const errorDetail = err.error?.message || 'Invalid platform data';
          this.errorMessage = `Bad request: ${errorDetail}`;
        } else {
          this.errorMessage = `Error adding platform: ${err.status} ${err.statusText}`;
        }
      }
    });
  }
}