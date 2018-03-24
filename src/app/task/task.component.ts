import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../shared/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() edit: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() remove: EventEmitter<Task> = new EventEmitter<Task>();

  constructor() { }

  ngOnInit() {}

  public editTast(task): void {
    this.edit.emit(task);
  }

  public removeTask(task): void {
    this.remove.emit(task);
  }

}
