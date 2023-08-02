import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import PlayerScore from 'src/library/PlayerScore';
import { GameObjectService } from 'src/app/services/game-object.service';
import { ScoreService } from 'src/app/services/score.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-right-menu',
    templateUrl: './right-menu.component.html',
    styleUrls: ['./right-menu.component.sass']
})
export class RightMenuComponent implements OnInit, OnDestroy {
    highscores: PlayerScore[] = [];
    gameObjectService = inject(GameObjectService);
    isLoading = false;
    loadMessage = ""
    playerService = inject(ScoreService);
    playerScoreObserver = {
        next: this.handleGetScores.bind(this),
        error: this.handleGetScoresError.bind(this),
        complete: () => null,
    }

    ngOnInit(): void {
        this.playerService.playerScores.subscribe(this.playerScoreObserver)
        this.playerService.isLoadingNewScores.subscribe(isLoading => this.isLoading = isLoading)
        this.playerService.getScores()
        this.loadMessage = "Loading scores..."
    }

    ngOnDestroy(): void {
        this.playerService.playerScores.unsubscribe()
        this.playerService.isLoadingNewScores.unsubscribe()
    }

    handleGetScores(scores: PlayerScore[]) {
        this.highscores = scores.map(score => new PlayerScore(score.name, score.enemiesKilled, score.shotsFired))
        this.highscores = this.highscores.slice(0, 10)
        this.highscores.sort((a, b) => b.accuracy() - a.accuracy())
        this.isLoading = false
        this.loadMessage = ""
    }

    handleGetScoresError(error: HttpErrorResponse) {
        this.loadMessage = error.error.details;
        this.isLoading = false
        if (this.loadMessage == undefined)
            this.loadMessage = "Failed to load scores"
    }
}
