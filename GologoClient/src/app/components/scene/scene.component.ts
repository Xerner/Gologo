import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { GameObjectService } from 'src/app/services/game-object.service';
import { CanvasProviderComponent } from '../canvas-controller/canvas-provider.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.sass'],
})
export class SceneComponent implements AfterViewInit, OnDestroy {
  public gameObjectService = inject(GameObjectService);
  @ViewChild(CanvasProviderComponent) canvas!: CanvasProviderComponent;
  @Output() onSceneReady = new EventEmitter<SceneComponent>();
  private gameObjectServiceSubscription!: Subscription;

  constructor() {
    this.gameObjectServiceSubscription = this.onSceneReady.subscribe(this.gameObjectService.handleSceneReady.bind(this.gameObjectService))
  }

  ngAfterViewInit(): void {
    this.canvas.onCanvasReady.subscribe(this.handleCanvasReady);
  }

  handleCanvasReady(canvas: CanvasProviderComponent) {
    this.onSceneReady.emit(this);
  }

  ngOnDestroy(): void {
    this.gameObjectServiceSubscription.unsubscribe()
  }
}
