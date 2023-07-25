import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { GameObjectService } from 'src/app/services/game-object.service';

@Component({
  selector: 'app-canvas-provider',
  templateUrl: './canvas-provider.component.html',
  styleUrls: ['./canvas-provider.component.sass']
})
export class CanvasProviderComponent {
    @Output() onCanvasReady = new EventEmitter<CanvasProviderComponent>();
    @Input() width: number = 1066.66;
    @Input() height: number = 600;

    @ViewChild('playerCanvas') canvas: ElementRef<HTMLCanvasElement> | null = null;
    context: CanvasRenderingContext2D | null = null;

    ngAfterViewInit(): void {
        if (this.canvas === null) throw new Error("canvas is " + this.canvas);
        this.context = this.canvas.nativeElement.getContext("2d");
        if (this.context === null) throw new Error("CanvasRenderingContext2D is " + this.context);
        this.context.imageSmoothingEnabled = false;
        this.onCanvasReady.emit(this);
    }
}
