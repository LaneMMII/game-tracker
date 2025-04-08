import { Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' }, // Redirect base URL to /games
  { path: 'games', component: GameListComponent }         // Loads GameListComponent when visiting /games
];
