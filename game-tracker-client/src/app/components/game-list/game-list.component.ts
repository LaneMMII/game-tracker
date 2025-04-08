import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService, Game } from '../../services/game.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterModule],   // Imports CommonModule so that *ngIf and *ngFor work in the template
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  errorMessage: string = '';

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (data) => {
        console.log('Games received:', data); // Log the data
        this.games = data;
      },
      error: (err) => {
        console.error('Error fetching games:', err); // Log the error
        this.errorMessage = err.message;
      }
    });
  }
}
