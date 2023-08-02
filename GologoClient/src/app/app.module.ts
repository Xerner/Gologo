import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LevelOneComponent } from './components/level-one/level-one.component';
import { GameObjectComponent } from './components/game-object/game-object.component';
import ShipComponent from './components/ship/ship.component';
import { CanvasProviderComponent } from './components/canvas-controller/canvas-provider.component';
import { SceneComponent } from './components/scene/scene.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { RightMenuComponent } from './components/right-menu/right-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    LevelOneComponent,
    GameObjectComponent,
    ShipComponent,
    CanvasProviderComponent,
    SceneComponent,
    LeftMenuComponent,
    RightMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
