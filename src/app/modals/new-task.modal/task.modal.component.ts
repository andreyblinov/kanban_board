import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupsService} from '../../shared/services/groups.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './task.modal.component.html',
  styleUrls: ['./task.modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  constructor(private groupsService: GroupsService,
              private modal: NgbActiveModal) { }

  ngOnInit() {}

  public addTask(taskToAdd, currentBoard) {
    taskToAdd.id = new Date().getTime();
    this.groupsService
      .saveTask(taskToAdd, currentBoard)
      .subscribe(() => {
        this.modal.close(taskToAdd);
      });
  }

  public changeTask(task, newValue, valueType) {
    if (valueType === 'title') {
      task.title = newValue;
    } else if (valueType === 'description') {
      task.description = newValue;
    } else if (valueType === 'estimate') {
      task.estimate = newValue;
    }
  }

  public editTask(task, currentBoard): any {
    this.groupsService
      .changeTask(task, currentBoard)
      .subscribe(data => {
        this.modal.close(data);
      });
  }

  resetForm(form) {
    form.reset();
    this.modal.close();
  }
}
