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
}