import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService, Game } from '../../services/game.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule],   // Imports CommonModule so that *ngIf and *ngFor work in the template
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  errorMessage: string = '';

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (data) => this.games = data,
      error: (err) => this.errorMessage = err.message
    });
  }
}
