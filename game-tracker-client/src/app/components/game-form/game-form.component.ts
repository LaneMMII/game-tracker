// game-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GameService, Game } from '../../services/game.service';
import { Router } from '@angular/router';
import { PlatformService, Platform } from '../../services/platform.service';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  gameForm!: FormGroup;
  errorMessage: string = '';
  platforms: Platform[] = [];

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router,
    private platformService: PlatformService
  ) {}

  ngOnInit(): void {
    // Set up the Reactive Form with default values and validators.
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      status: ['', Validators.required],
      rating: ['', [Validators.min(1), Validators.max(10)]],
      platformId: ['']
    });

    this.platformService.getPlatforms().subscribe({
      next: (platforms) => {
        this.platforms = platforms;
      },
      error: (err) => console.error('Error fetching platforms:', err),
    });
  }

  // Called when the form is submitted.
  onSubmit(): void {
    if (this.gameForm.valid) {
      const formValue = this.gameForm.value;
      const newGame: Game = {
        title: formValue.title,
        genre: formValue.genre,
        status: +formValue.status,
        rating: formValue.rating ? +formValue.rating : undefined,
        platformId: formValue.platformId ? +formValue.platformId : 0 // Default to 0 if undefined
      };
    
      this.gameService.createGame(newGame).subscribe({
        next: () => this.router.navigate(['/games']),
        error: (err) => {
          console.error('Submission error:', err);
          this.errorMessage = err.error?.message || 'An error occurred while creating the game.';
        }
      });
    }
  }
}