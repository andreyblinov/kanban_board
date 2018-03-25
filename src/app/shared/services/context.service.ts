import {Injectable, OnInit} from '@angular/core';
import {CONSTANTS} from './appConstants';
import {Observable} from 'rxjs';
import {Board} from '../models/board';

@Injectable()
export class ContextService implements OnInit {
  private storage;

  constructor() {
    this.storage = localStorage;
  }

  ngOnInit() {
    this.setDefaultBoards();
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

  public setDefaultBoards() {
    this.storage.setItem('boards', JSON.stringify(CONSTANTS.DEFAULT_BOARDS));
  }

  public storeToLocalStorage(board): Observable<Board> {

    let boards;
    boards = this.getStorageItems('boards') === null ? [] : this.getStorageItems('boards');
    boards.push(board);
    this.setStorageItems('boards', boards);
    return Observable.of(board);
  }

  changeBoard(boardToEdit): Observable<Board> {
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

  changeTask(taskToEdit, currentBoard): Observable<Board> {
    const boardToEdit = this.getStorageItems('boards').map(board => {
      if (board.id === currentBoard.id) {
        board.tasks.map(task => {
          if (task.id === taskToEdit.id) {
            for (const prop in task) {
              if (task.hasOwnProperty(prop)) {
                task[prop] = taskToEdit[prop];
              }
            }
          }
        });
      }

      return board;
    });
    this.setStorageItems('boards', boardToEdit);
    console.log(boardToEdit[0]);
    return Observable.of(boardToEdit[0]);
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
