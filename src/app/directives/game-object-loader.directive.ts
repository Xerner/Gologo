import { Directive, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[gameObjectLoader]'
})
export class GameObjectLoaderDirective {
  public viewContainerRef = inject(ViewContainerRef);
}
