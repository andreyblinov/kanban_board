import { Injectable } from '@angular/core';
import {CONSTANTS} from './appConstants';
import {Observable} from 'rxjs';
import {Board} from '../models/board';

@Injectable()
export class ContextService {
  private storage;

  constructor() {
    this.storage = localStorage;
  }

  setDefaultBoards() {
    const defaultBoards = JSON.stringify(CONSTANTS.DEFAULT_BOARDS);
    this.storage.setItem('boards', defaultBoards);
  }

  getBoards() {
    return Observable.of(JSON.parse(this.storage.getItem('boards')));
  }

  storeToLocalStorage(board) {
    let boards;

    if (this.storage.getItem('boards') === null) {
      boards = [];
    } else {
      boards = JSON.parse(this.storage.getItem('boards'))
    }
    boards.push(board);
    this.storage.setItem('boards', JSON.stringify(boards));
    return Observable.of(board);
  }

  editBoard(boardToEdit): Observable<Board> {
    const boards = JSON.parse(this.storage.getItem('boards'))
    const edited = boards.map(board => {
      if (board.name === boardToEdit.name) {
            board = Object.assign({}, board, boardToEdit);
          }

          return board;
    });
    this.storage.setItem('boards', JSON.stringify(edited));
    return Observable.of(boardToEdit);
  }

  removeBoard(boardToRemove): Observable<boolean> {
    const boards = JSON.parse(this.storage.getItem('boards'))
    const removed = boards.filter(board => board.name !== boardToRemove.name);
    this.storage.setItem('boards', JSON.stringify(removed));
    return Observable.of(true);
  }


}
