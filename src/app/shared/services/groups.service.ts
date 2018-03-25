import { Injectable } from '@angular/core';
import {ContextService} from './context.service';
import {Observable} from 'rxjs/Observable';
import {Board} from '../models/board';
import {Task} from '../models/task';

@Injectable()
export class GroupsService {

  constructor(private contextService: ContextService) { }

  public getBoards() {
    // return this.contextService.getFromLocalStorage();
  }

  public saveBoard(board): Observable<Board> {
    return this.contextService.storeToLocalStorage(board);
  }

  public changeBoard(board): Observable<Board> {
    return this.contextService.changeBoard(board);
  }

  public removeBoard(board): Observable<boolean> {
    return this.contextService.removeBoard(board);
  }

  public saveTask(task, currentBoard) {
    return this.contextService.storeTaskToLocalStorage(task, currentBoard);
  }

  public changeTask(task, currentBoard): Observable<Board> {
    return this.contextService.changeTask(task, currentBoard);
  }

  public removeTask(task, currentBoard): Observable<boolean> {
    return this.contextService.removeTask(task, currentBoard);
  }
}
