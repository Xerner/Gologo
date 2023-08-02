import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GameObjectService } from 'src/app/services/game-object.service';
import { Vector2 } from 'src/library/vectors';

@Component({
  selector: 'app-canvas-provider',
  templateUrl: './canvas-provider.component.html',
  styleUrls: ['./canvas-provider.component.sass']
})
export class CanvasProviderComponent implements OnInit, AfterViewInit {
    @Output() onCanvasReady = new EventEmitter<CanvasProviderComponent>();
    // Galaga original resolution is 288x224
    aspectRatio = 224 / 288;
    resolution = new Vector2(224, 288);
    size = new Vector2(224, 288);
    onSizeChange = new EventEmitter<Vector2>();
    @ViewChild('playerCanvas') canvas: ElementRef<HTMLCanvasElement> | null = null;
    context!: CanvasRenderingContext2D;

    ngOnInit() {
        this.onSizeChange.subscribe((size) => this.size = size)
    }

    ngAfterViewInit(): void {
        if (this.canvas === null) throw new Error("canvas is " + this.canvas);
        var context = this.canvas.nativeElement.getContext("2d");
        if (context === null) throw new Error("CanvasRenderingContext2D is " + this.context);
        this.context = context
        this.context.imageSmoothingEnabled = false;
        setTimeout(this.setCanvasSize.bind(this), 0);
        this.onCanvasReady.emit(this);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.setCanvasSize()
    }

    setCanvasSize() {
        var size = new Vector2(window.innerHeight * this.aspectRatio, window.innerHeight - 10)
        this.onSizeChange.emit(size);
    }
}
