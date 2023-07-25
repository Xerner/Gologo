import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInputService {
  constructor(public onArrowKeyPress: Observable<number>) {}
}
