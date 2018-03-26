import { Component, OnInit } from '@angular/core';
import {Board} from '../shared/models/board';
import {GroupsService} from '../shared/services/groups.service';
import {NgbActiveModal, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {BoardModalComponent} from '../modals/new-board.modal/board.modal.component';
import {CONSTANTS} from '../shared/services/appConstants';
import {ContextService} from '../shared/services/context.service';

@Component({
  selector: 'app-kanban-list',
  templateUrl: './kanban-list.component.html',
  styleUrls: ['./kanban-list.component.scss']
})
export class KanbanListComponent implements OnInit {
  boards;

  constructor(private groupsService: GroupsService,
              private contextService: ContextService,
              private modal: NgbModal) { }

  ngOnInit() {
    this.contextService
      .getBoards()
      .subscribe(data => this.boards = data);
  }

  public openBoardModalToAdd(): void {
    const ref = this.modal.open(BoardModalComponent, {keyboard: false, backdrop: 'static', size: 'lg'});
    ref.componentInstance.board = {name: ''};
    ref.result.then(board => this.boards = [...this.boards, board]);
  }

  public clear(): void {
    this.contextService
      .clear()
      .subscribe( boards => this.boards = boards);
  }

  editBoard(boardToEdit) {
    this.boards = this.boards.map((board: Board) => {
      if (board.id === boardToEdit.id) {
        board = Object.assign({}, board, boardToEdit);
      }

      return board;
    });
  }

  public removeBoard(boardToRemove): void {
    this.groupsService
      .removeBoard(boardToRemove)
      .subscribe(() => this.boards = this.boards.filter(board => board.id !== boardToRemove.id));
  }

  public renderBoards(boards) {
    this.boards = boards;
  }
}
