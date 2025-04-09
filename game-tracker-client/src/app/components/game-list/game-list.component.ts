import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Game } from '../../services/game.service'; // Importing Game interface from game.service

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // Imports CommonModule so that *ngIf and *ngFor work in the template
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {
  games$: Observable<Game[]>;
  constructor(private gameService: GameService) { // Injecting GameService to fetch game data
    this.games$ = this.gameService.getGames();
  }
  errorMessage: string = ''; // Variable to hold error messages

  deleteGame(gameId: number | undefined): void {
    if (gameId === undefined) {
      console.error('🔴 Cannot delete game: gameId is undefined');
      return;
    }
  
    this.gameService.deleteGame(gameId).subscribe({
      next: () => {
        // Refresh the game list after deletion
        this.games$ = this.gameService.getGames();
      },
      error: (err) => {
        console.error('🔴 Deletion error:', err); // Log the error for debugging
        this.errorMessage = err.error?.message || 'An error occurred while deleting the game.'; // Set the error message
      }
    });
  }
}