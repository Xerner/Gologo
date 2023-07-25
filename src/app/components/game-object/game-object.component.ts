import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { GameObjectService } from 'src/app/services/game-object.service';
import GameObject from 'src/library/game-objects/GameObject';

@Component({
  selector: 'app-game-object',
  templateUrl: './game-object.component.html',
  styleUrls: ['./game-object.component.sass'],
})
export class GameObjectComponent
  extends GameObject
  implements OnInit, OnDestroy
{
  constructor() {
    super(inject(GameObjectService));
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.OnDestroy();
  }
}
