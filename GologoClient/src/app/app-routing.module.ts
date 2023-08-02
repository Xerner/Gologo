import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LevelOneComponent } from './components/level-one/level-one.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'the-only-level', component: LevelOneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
