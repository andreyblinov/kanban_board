import { Injectable } from '@angular/core';
import {CONSTANTS} from './appConstants';
import {Observable} from 'rxjs/Observable';
import {Board} from '../models/board';

@Injectable()
export class ContextService {
  private storage;

  constructor() {
    this.storage = localStorage;
  }

  storeToLocalStorage(board) {
    let boards;

    if (this.storage.getItem('boards') === null) {
      boards = [];
    } else {
      boards = JSON.parse(this.storage.getItem('boards'));
    }
    boards.push(board);
    this.storage.setItem('boards', JSON.stringify(boards));
    // return Observable.from(boards);
  }
}
