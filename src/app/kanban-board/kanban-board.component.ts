import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Board} from '../shared/models/board';
import {Task} from '../shared/models/task';
import {ContextService} from '../shared/services/context.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
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
              private activeModal: NgbActiveModal,
              private cd: ChangeDetectorRef,
              private modal: NgbModal) { }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (changes.board) {
      this.board = Object.assign({}, changes.board.currentValue);
    }
  }

  public openBoardModalToEdit(boardToEdit): void {
    const ref = this.modal.open(BoardModalComponent, {keyboard: false, backdrop: 'static', size: 'lg'});
    ref.componentInstance.board = boardToEdit
    ref.componentInstance.editMode = true;
    ref.result.then(board => this.edit.emit(board));
  }

  public removeBoard(): void {
    const ref = this.modal.open(this.confirmationModal, {keyboard: false, backdrop: 'static', size: 'lg'});
    ref.result.then(board => {
      this.remove.emit(board);
    } );
  }

  public openTaskModalToAdd() {
    const ref = this.modal.open(TaskModalComponent, {keyboard: false, backdrop: 'static', size: 'lg'});
    ref.componentInstance.currentBoard = this.board;
    ref.componentInstance.task = {title: '', description: '', estimate: 0};
    ref.result.then(task => this.board.tasks = [...this.board.tasks, task]);
  }

  public editTask(options) {
    this.board.tasks = this.board.tasks.map((board: Board) => {
      if (board.id === options.currentBoard.id) {
        board.tasks.map((task: Task) => {
          if (task.id === options.task.id) {
            for (const prop in task) {
              if (task.hasOwnProperty(prop)) {
                task[prop] = options.task[prop];
              }
            }
          }
        });
      }
      return board;
    });
  }

  public dragTask(taskToAdd, currentBoard) {
    this.groupsService
      .saveTask(taskToAdd, currentBoard)
      .subscribe(() => this.board.tasks = [...this.board.tasks, taskToAdd]);
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
      this.dragTask(taskData.task, this.board);

    this.cd.detectChanges();
  }
}
