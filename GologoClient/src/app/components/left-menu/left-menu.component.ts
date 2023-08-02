import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import PlayerScore from 'src/library/PlayerScore';
import ShipComponent from '../ship/ship.component';
import { GameObjectService } from 'src/app/services/game-object.service';
import { ScoreService } from 'src/app/services/score.service';
import Enemy from 'src/library/game-objects/Enemy';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.sass']
})
export class LeftMenuComponent implements OnInit, OnDestroy {
    enemyCount = -1
    score = new PlayerScore()
    // highscores = [new PlayerScore(), new PlayerScore(), new PlayerScore(), new PlayerScore(), new PlayerScore()]
    player!: ShipComponent
    gameObjectService = inject(GameObjectService);
    playerService = inject(ScoreService);
    loadMessage = ""
    playerScoreObserver = {
        next: () => null,
        error: (error :HttpErrorResponse) => this.loadMessage = error.error.details,
        complete: () => null,
    }

    ngOnInit(): void {
        this.gameObjectService.onGameStart.subscribe(this.handleSceneReady.bind(this))
        this.playerService.playerScores.subscribe(this.playerScoreObserver)
    }

    ngOnDestroy(): void {
        this.gameObjectService.onGameStart.unsubscribe()
        this.player.onShotFired.unsubscribe()
        this.player.onEnemyKilled.unsubscribe()
    }

    handleSceneReady() {
        this.player = this.gameObjectService.gameObjects.get('player') as ShipComponent
        if (this.player === undefined) throw new Error('player not found')
        this.player.onShotFired.subscribe(this.handlePlayerShotFired.bind(this))
        this.player.onEnemyKilled.subscribe(this.handleEnemyKilled.bind(this))
        this.enemyCount = this.gameObjectService.filter(Enemy).length
    }

    handlePlayerShotFired() {
        this.score.shotsFired++
    }

    handleEnemyKilled() {
        this.score.enemiesKilled++
    }

    postPlayerScore() {
        this.playerService.postScore(this.score, this.enemyCount)
    }
}
