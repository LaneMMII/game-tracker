import { Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { PlatformFormComponent } from './components/platform-form/platform-form.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';

export const routes: Routes = [
  { path: 'games', component: GameListComponent },
  { path: 'games/create', component: GameFormComponent },
  { path: 'games/:id', component: GameDetailComponent },
  { path: 'platforms/create', component: PlatformFormComponent },
  { path: '', redirectTo: '/games', pathMatch: 'full' }
];