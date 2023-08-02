import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import environment from '../../environment.json';
import PlayerScore from 'src/library/PlayerScore';

@Injectable({
    providedIn: 'root'
})
export class ScoreService {
    playerScores = new EventEmitter<PlayerScore[]>();
    isLoadingNewScores = new EventEmitter<boolean>();
    getScoresObserver = {
        next: (scores: PlayerScore[]) => this.playerScores.next(scores),
        error: (error: HttpErrorResponse) => { console.error('Failed to grab player scores', error); this.playerScores.error(error) },
        complete: () => console.log('Successfully grabbed player scores')
    };

    constructor(private http: HttpClient) { }

    getScores() {
        this.http.get<PlayerScore[]>(`${environment.apiUrl}/Player/Scores`).subscribe(this.getScoresObserver)
        this.isLoadingNewScores.emit(true)
    }

    getScoresEF() {
        this.http.get<PlayerScore[]>(`${environment.apiUrl}/Player/ScoresEF`).subscribe(this.getScoresObserver)
        this.isLoadingNewScores.emit(true)
    }

    postScore(score: PlayerScore, expectedEnemies: number) {
        this.http.post<PlayerScore[]>(`${environment.apiUrl}/Player/UpdateScores`, { score: score, expectedEnemies: expectedEnemies }).subscribe(this.getScoresObserver)
        this.isLoadingNewScores.emit(true)
    }
}
