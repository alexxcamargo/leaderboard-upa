import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AddAdolescentComponent } from './add-adolescent/add-adolescent.component';  // Importar novo componente

const routes: Routes = [
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'add-adolescent', component: AddAdolescentComponent }  // Adicionar nova rota
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
