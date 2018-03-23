import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Board} from '../shared/models/board';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  @Input() board;
  @Output() edit: EventEmitter<Board> = new EventEmitter<Board>();
  @Output() remove: EventEmitter<Board> = new EventEmitter<Board>();

  constructor() { }

  ngOnInit() {
  }

  public editBoard(board): void {
    this.edit.emit(board);
  }

  public removeBoard(board): void {
    this.remove.emit(board);
  }

  addTast(task) {

  }



}
