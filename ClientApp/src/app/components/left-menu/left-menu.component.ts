import { Component, OnInit, inject } from '@angular/core';
import PlayerScore from 'src/library/PlayerScore';
import ShipComponent from '../ship/ship.component';
import { GameObjectService } from 'src/app/services/game-object.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.sass']
})
export class LeftMenuComponent implements OnInit {
    score = new PlayerScore()
    highscores = [new PlayerScore(), new PlayerScore(), new PlayerScore(), new PlayerScore(), new PlayerScore()]
    player!: ShipComponent
    gameObjectService = inject(GameObjectService);

    ngOnInit(): void {
        this.gameObjectService.onGameStart.subscribe(this.handleSceneReady.bind(this))
    }

    handleSceneReady() {
        this.player = this.gameObjectService.gameObjects.get('player') as ShipComponent
        if (this.player === undefined) throw new Error('player not found')
        this.player.onShotFired.subscribe(this.handlePlayerShotFired.bind(this))
        this.player.onEnemyKilled.subscribe(this.handleEnemyKilled.bind(this))
    }

    handlePlayerShotFired() {
        this.score.shotsFired++
    }

    handleEnemyKilled() {
        this.score.hits++
    }

    top10() {
        return this.highscores.sort((a, b) => b.hits - a.hits).slice(0, 10)
    }
}
