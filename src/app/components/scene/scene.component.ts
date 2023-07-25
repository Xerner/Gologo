import {
  AfterViewInit,
  ApplicationRef,
  Component,
  EnvironmentInjector,
  EventEmitter,
  NgModuleRef,
  OnDestroy,
  Output,
  ViewChild,
  createComponent,
  inject,
} from '@angular/core';
import { GameObjectLoaderDirective } from 'src/app/directives/game-object-loader.directive';
import { GameObjectService } from 'src/app/services/game-object.service';
import { CanvasProviderComponent } from '../canvas-controller/canvas-provider.component';
import { Type } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.sass'],
})
export class SceneComponent implements AfterViewInit, OnDestroy {
  public gameObjectService = inject(GameObjectService);
//   @ViewChild(GameObjectLoaderDirective, { static: true })
//   gameObjectLoader!: GameObjectLoaderDirective;
  @ViewChild(CanvasProviderComponent) canvas!: CanvasProviderComponent;
  @Output() onSceneReady = new EventEmitter<SceneComponent>();
  private gameObjectServiceSubscription!: Subscription;

  constructor() {
    this.gameObjectServiceSubscription = this.onSceneReady.subscribe(this.gameObjectService.handleSceneReady.bind(this.gameObjectService))
  }

  ngAfterViewInit(): void {
    // if (!this.gameObjectLoader)
    //   throw new Error('gameObjectLoader is ' + this.gameObjectLoader);
    // this.gameObjectLoader.viewContainerRef.clear();
    this.canvas.onCanvasReady.subscribe(this.handleCanvasReady);
  }

  handleCanvasReady(canvas: CanvasProviderComponent) {
    this.onSceneReady.emit(this);
  }

  ngOnDestroy(): void {
    this.gameObjectServiceSubscription.unsubscribe()
  }
}
