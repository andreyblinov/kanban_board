import { Injectable } from '@angular/core';
import {ContextService} from './context.service';

@Injectable()
export class GroupsService {

  constructor(private contextService: ContextService) { }

  public getBoards() {
    // return this.contextService.getFromLocalStorage();
  }

  saveBoard(board) {
    this.contextService.storeToLocalStorage(board);
  }
}
