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
  platforms: Platform[] = []; // Array to hold platforms
  newPlatformName: string = '';

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router,
    private platformService: PlatformService // Injecting PlatformService to fetch platform data
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

    this.platformService.getPlatforms().subscribe({
      next: (platforms) => {
        this.platforms = platforms;
        //console.log('Platforms:', this.platforms); // Debugging
      },
      error: (err) => console.error('Error fetching platforms:', err),
    });
  }

  // Called when the form is submitted.
  onSubmit(): void {
    if (this.gameForm.valid) {
      const newGame: Game = {
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

  addPlatform(): void {
    if (!this.newPlatformName.trim()) {
      this.errorMessage = 'Platform name is required.';
      return;
    }
  
    const newPlatform: Platform = { 
      platformId: 0,
      name: this.newPlatformName 
    };
    
    console.log('Sending platform:', newPlatform);
  
    this.platformService.addPlatform(newPlatform).subscribe({
      next: (platform) => {
        console.log('Platform added successfully:', platform);
        this.platforms.push(platform);
        this.newPlatformName = '';
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Full error object:', err);
        
        if (err.status === 409) {
          this.errorMessage = 'Platform already exists.';
        } else if (err.status === 400) {
          // Extract detailed info if available
          const errorDetail = err.error?.message || 'Invalid platform data';
          this.errorMessage = `Bad request: ${errorDetail}`;
        } else {
          this.errorMessage = `Error adding platform: ${err.status} ${err.statusText}`;
        }
      }
    });
  }
}