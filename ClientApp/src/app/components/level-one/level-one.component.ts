import { Component, OnInit } from '@angular/core';
import ShipComponent from '../ship/ship.component';
import { SceneComponent } from '../scene/scene.component';
import EnemyController from 'src/library/game-objects/EnemyController';
import { GameObjectService } from 'src/app/services/game-object.service';
import { Vector2 } from 'src/library/vectors';

@Component({
  selector: 'app-level-one',
  templateUrl: './level-one.component.html',
  styleUrls: ['./level-one.component.sass']
})
export class LevelOneComponent implements OnInit {
    enemyController!: EnemyController

    constructor(private gameObjectService: GameObjectService) {}

    ngOnInit(): void {
        this.enemyController = new EnemyController(this.gameObjectService)
    }
}
