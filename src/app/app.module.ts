import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LevelOneComponent } from './components/level-one/level-one.component';
import { GameObjectComponent } from './components/game-object/game-object.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import ShipComponent from './components/ship/ship.component';
import { CanvasProviderComponent } from './components/canvas-controller/canvas-provider.component';
import { GameObjectLoaderDirective } from './directives/game-object-loader.directive';
import { SceneComponent } from './components/scene/scene.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    LevelOneComponent,
    GameObjectComponent,
    UserInputComponent,
    ShipComponent,
    CanvasProviderComponent,
    GameObjectLoaderDirective,
    SceneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
