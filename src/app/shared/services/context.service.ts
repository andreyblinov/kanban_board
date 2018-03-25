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

  private getStorageItems(key): Board[] {
    return JSON.parse(this.storage.getItem(key));
  }

  private setStorageItems(key, value): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public getBoards(): Observable<Board[]> {
    return Observable.of(this.getStorageItems('boards'));
  }

  public storeToLocalStorage(board): Observable<Board> {
    let boards;
    boards = this.getStorageItems('boards') === null ? [] : this.getStorageItems('boards');
    boards.push(board);
    this.setStorageItems('boards', boards);
    return Observable.of(board);
  }

  editBoard(boardToEdit): Observable<Board> {
    const editedBoards = this.getStorageItems('boards').map(board => {
      if (board.id === boardToEdit.id) {
            board = Object.assign({}, board, boardToEdit);
          }

          return board;
    });
    this.setStorageItems('boards', editedBoards);
    return Observable.of(boardToEdit);
  }

  removeBoard(boardToRemove): Observable<boolean> {
    const boards = this.getStorageItems('boards').filter(board => board.id !== boardToRemove.id);
    this.setStorageItems('boards', boards);
    return Observable.of(true);
  }

  editTask(taskToEdit, currentBoard): Observable<Board[]> {
    const boardToEdit = this.getStorageItems('boards').map(board => {
      if (board.id === currentBoard.id) {
        board.tasks.map(task => {
          if (task.id === taskToEdit.id) {
            task = Object.assign({}, task, taskToEdit);
          }
        });
      }

      return boardToEdit;
    });
    this.setStorageItems('boards', boardToEdit);
    return Observable.of(boardToEdit);
  }

  public storeTaskToLocalStorage(task, currentBoard): Observable<Board>  {
    let boards;
    boards = this.getStorageItems('boards') === null ? [] : this.getStorageItems('boards');
    const editedBoard = boards.map(board => {
      if (board.id === currentBoard.id) {
        board.tasks = [...board.tasks, task];
      }

      return board;
    });
    this.setStorageItems('boards', editedBoard);
    return Observable.of(editedBoard);
  }

  removeTask(taskToRemove, currentBoard): Observable<boolean> {
    console.log(taskToRemove)
    console.log(currentBoard)
    const editedBoards = this.getStorageItems('boards').map(board => {
      if (board.id === currentBoard.id) {
        board.tasks = board.tasks.filter(task => task.id !== taskToRemove.id);
      }
      return board;
    });
    this.setStorageItems('boards', editedBoards);
    return Observable.of(true);
  }
}
