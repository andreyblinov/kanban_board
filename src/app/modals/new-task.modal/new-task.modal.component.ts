import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupsService} from '../../shared/services/groups.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.modal.component.html',
  styleUrls: ['./new-task.modal.component.scss']
})
export class NewTaskModalComponent implements OnInit {

  constructor(private groupsService: GroupsService,
              private modal: NgbActiveModal) { }

  ngOnInit() {}

  public addTask(task) {
    console.log(task)
    this.groupsService.saveTask(task);
    this.modal.close(task);
  }

  resetForm(form) {
    form.reset();
    this.modal.close();
  }

}
