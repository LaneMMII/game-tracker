// game-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GameService, Game } from '../../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-form',
  standalone: true,
  // Import ReactiveFormsModule and CommonModule so that Angular knows about form directives and structural directives
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  gameForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Set up the Reactive Form with default values and validators.
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      status: ['', Validators.required],
      rating: [''],
      platformId: ['', Validators.required]
    });
  }

  // Called when the form is submitted.
  onSubmit(): void {
    if (this.gameForm.valid) {
      const newGame: Game = {
        gameId: 0,
        title: this.gameForm.value.title,
        genre: this.gameForm.value.genre,
        status: +this.gameForm.value.status,
        rating: this.gameForm.value.rating ? +this.gameForm.value.rating : undefined,
        platformId: +this.gameForm.value.platformId
      };
  
      this.gameService.createGame(newGame).subscribe({
        next: () => this.router.navigate(['/games']),
        error: (err) => {
          console.error('🔴 Submission error:', err); // Add this
          this.errorMessage = err.error?.message || 'An error occurred while creating the game.';
        }
      });
    }
  }  
}