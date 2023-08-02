import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasProviderComponent } from './canvas-provider.component';

describe('CanvasControllerComponent', () => {
  let component: CanvasProviderComponent;
  let fixture: ComponentFixture<CanvasProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasProviderComponent]
    });
    fixture = TestBed.createComponent(CanvasProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
