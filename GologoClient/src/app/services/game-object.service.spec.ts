import { TestBed } from '@angular/core/testing';

import { GameObjectService } from './game-object.service';

describe('GameobjectService', () => {
  let service: GameObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
