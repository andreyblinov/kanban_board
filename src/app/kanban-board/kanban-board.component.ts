import {Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Board} from '../shared/models/board';
import {Task} from '../shared/models/task';
import {ContextService} from '../shared/services/context.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TaskModalComponent} from '../modals/new-task.modal/task.modal.component';
import { noop } from 'lodash';
import {BoardModalComponent} from '../modals/new-board.modal/board.modal.component';
import {GroupsService} from '../shared/services/groups.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit, OnChanges {
  @Input() board;
  @Output() edit: EventEmitter<Board> = new EventEmitter<Board>();
  @Output() remove: EventEmitter<Board> = new EventEmitter<Board>();
  @ViewChild('modal') confirmationModal: TemplateRef<void>;
  taskEnteredToDropZone = false;

  constructor(private contextService: ContextService,
              private groupsService: GroupsService,
              private modal: NgbModal) { }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (changes.board) {
      this.board = Object.assign({}, changes.board.currentValue);
    }
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
  }

  public addTask() {
    const ref = this.modal.open(TaskModalComponent, {keyboard: false, backdrop: 'static', size: 'lg'});
    ref.componentInstance.currentBoard = this.board;
    ref.result.then(task => {
      console.log(task)
      this.board.tasks = [...this.board.tasks, task];
    });
  }

  public dragTask(taskToAdd, currentBoard) {
    this.groupsService
      .saveTask(taskToAdd, currentBoard)
      .subscribe(task => {
        this.board.tasks = [...this.board.tasks, task];
      });
  }

  public removeTask(taskToRemove, board = this.board) {
    this.groupsService
      .removeTask(taskToRemove, board)
      .subscribe(() => {
        board.tasks = board.tasks.filter(task => task.id !== taskToRemove.id);
      });
  }

  public onDrag(event): void {
      event.preventDefault();
      event.stopPropagation();
   }

  public onDragEnter(event): void {
      event.preventDefault();
      event.stopPropagation();
      this.taskEnteredToDropZone = event;
  }

  public onDrop(event): void {
      const taskData = JSON.parse(event.dataTransfer.getData('taskData'));
      event.preventDefault();
      event.stopPropagation();
      this.taskEnteredToDropZone = false;

      this.removeTask(taskData.task, taskData.board);
      this.dragTask(taskData.task, event.target);
  }
}
