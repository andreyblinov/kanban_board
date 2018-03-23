import { Component, OnInit } from '@angular/core';
import {Board} from '../shared/models/board';
import {GroupsService} from '../shared/services/groups.service';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {CreateModalComponent} from '../modals/new-board.modal/new-board.modal.component';
import {CONSTANTS} from '../shared/services/appConstants';

@Component({
  selector: 'app-kanban-list',
  templateUrl: './kanban-list.component.html',
  styleUrls: ['./kanban-list.component.scss']
})
export class KanbanListComponent implements OnInit {
  boards: Board[] = [];

  constructor(private groupsService: GroupsService,
              private modal: NgbModal) { }

  ngOnInit() {
    this.boards = [{name: 'TODO'}, {name: 'DONE'}];
  }

  public addBoard(): void {
    const ref = this.modal.open(CreateModalComponent, {keyboard: false, backdrop: 'static', size: 'lg'});
    // ref.result.then(group => this.groups = [...this.groups, group]);
    ref.result.then(board => this.boards.push(board));
  }

  public editBoard(boardToEdit) {
    this.boards = this.boards.map(board => {
      if (board.name === boardToEdit.name) {
        board = Object.assign({}, board, boardToEdit);
      }

      return board;
    });
  }
  public removeBoard(boardToDelete) {
    this.boards = this.boards.filter(board => board.name !== boardToDelete.name);
  }
}
