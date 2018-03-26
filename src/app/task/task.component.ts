import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Task} from '../shared/models/task';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { noop } from 'lodash';
import {TaskModalComponent} from '../modals/new-task.modal/task.modal.component';
import {Board} from '../shared/models/board';
import {TaskInfoComponent} from '../task-info/task-info.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Input() board: Board;
  @Output() edit: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() remove: EventEmitter<Task> = new EventEmitter<Task>();
  @ViewChild('modal') confirmationModal: TemplateRef<void>;

  constructor(private modal: NgbModal,
              private activeModal: NgbActiveModal) { }

  ngOnInit() {}

  public openTaskModalToEdit(event, taskToEdit): void {
    event.stopPropagation();
    const ref = this.modal.open(TaskModalComponent, {keyboard: false, backdrop: 'static', size: 'lg'});
    ref.componentInstance.editMode = true;
    ref.componentInstance.currentBoard = this.board;
    ref.componentInstance.task = taskToEdit;
    ref.result.then(() => this.edit.emit(<any>{task: taskToEdit, currentBoard: this.board}), noop);
  }

  public removeTask(event): void {
    event.stopPropagation();
    const ref = this.modal.open(this.confirmationModal, {keyboard: false, backdrop: 'static', size: 'lg'});
    ref.result.then(task => this.remove.emit(task));
  }

  public dragTask(event) {
    event.dataTransfer.setData('taskData', JSON.stringify({task: this.task, board: this.board}));
  }

  openTask(task): void {
    console.log(task)
    const ref = this.modal.open(TaskInfoComponent, {keyboard: false, backdrop: 'static', size: 'lg'});
    ref.componentInstance.task = task;
    ref.result.then(() => this.activeModal.close());
  }

}
