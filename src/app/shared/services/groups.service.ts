import { Injectable } from '@angular/core';
import {ContextService} from './context.service';
import {Observable} from 'rxjs/Observable';
import {Board} from '../models/board';

@Injectable()
export class GroupsService {

  constructor(private contextService: ContextService) { }

  public getBoards() {
    // return this.contextService.getFromLocalStorage();
  }

  saveBoard(board) {
    return this.contextService.storeToLocalStorage(board);
  }

  editBoard(board): Observable<Board> {
    return this.contextService.editBoard(board);
  }

  removeBoard(board): Observable<boolean> {
    return this.contextService.removeBoard(board);
  }

  saveTask(task) {
    console.log(task);
  }
}
