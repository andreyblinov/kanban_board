import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Board} from '../shared/models/board';
import {Task} from '../shared/models/task';
import {ContextService} from '../shared/services/context.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewTaskModalComponent} from '../modals/new-task.modal/new-task.modal.component';
import { noop } from 'lodash';
import {BoardModalComponent} from '../modals/new-board.modal/board.modal.component';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  @Input() board;
  @Output() edit: EventEmitter<Board> = new EventEmitter<Board>();
  @Output() remove: EventEmitter<Board> = new EventEmitter<Board>();
  @ViewChild('modal') confirmationModal: TemplateRef<void>;



  constructor(private contextService: ContextService,
              private modal: NgbModal) { }

  ngOnInit() {

  }

  public editBoard(boardToEdit): void {
    const ref = this.modal.open(BoardModalComponent, {keyboard: false, backdrop: 'static', size: 'lg'});
    ref.componentInstance.board = boardToEdit;
    ref.componentInstance.editMode = true;
    ref.result.then(board => this.edit.emit(board), noop);
  }

  public removeBoard(): void {
    const ref = this.modal.open(this.confirmationModal, {keyboard: false, backdrop: 'static', size: 'lg'});
    ref.result.then(board => this.remove.emit(board));
    ;
  }

  public addTask() {
    const ref = this.modal.open(NewTaskModalComponent, {keyboard: false, backdrop: 'static', size: 'lg'});
    ref.result.then(task => [...this.board.tasks, task], noop);
  }

  public editTask(taskToEdit) {
    // this.tasks = this.tasks.map(task => {
    //   if (task.id === taskToEdit.id) {
    //     task = Object.assign({}, task, taskToEdit)
    //   }
    //
    //   return task;
    // });
  }

  public removeTask (taskToRemove): void {
    this.board.tasks = this.board.tasks.filter(task => task.title !== taskToRemove.title);
  }



}
