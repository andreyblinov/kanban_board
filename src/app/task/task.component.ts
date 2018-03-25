import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Task} from '../shared/models/task';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { noop } from 'lodash';
import {TaskModalComponent} from '../modals/new-task.modal/task.modal.component';
import {Board} from '../shared/models/board';

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

  constructor(private modal: NgbModal) { }

  ngOnInit() {}

  public editTask(taskToEdit): void {
    const ref = this.modal.open(TaskModalComponent, {keyboard: false, backdrop: 'static', size: 'lg'});
    ref.componentInstance.task = taskToEdit;
    ref.componentInstance.editMode = true;
    ref.result.then(task => this.edit.emit(task), noop);
  }

  public removeTask(): void {
    const ref = this.modal.open(this.confirmationModal, {keyboard: false, backdrop: 'static', size: 'lg'});
    ref.result.then(task => this.remove.emit(task));
  }

  public dragTask(event) {
    event.dataTransfer.setData('taskData', JSON.stringify({task: this.task, board: this.board}));
  }

}
