import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GroupsService} from '../../shared/services/groups.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ContextService} from '../../shared/services/context.service';
import {Board} from '../../shared/models/board';

@Component({
  selector: 'app-board',
  templateUrl: './board.modal.component.html',
  styleUrls: ['./board.modal.component.scss']
})
export class BoardModalComponent implements OnInit {
  @Output() add: EventEmitter<Board> = new EventEmitter();

  constructor(private groupsService: GroupsService,
              private contextService: ContextService,
              private modal: NgbActiveModal) { }

  ngOnInit() {
  }

  addBoard(board) {
    board.value.tasks = [];
    this.groupsService
      .saveBoard(board.value)
      .subscribe(data => {
        this.modal.close(data);
      });
  }

  resetForm(form) {
    form.reset();
    this.modal.close();
  }
}
