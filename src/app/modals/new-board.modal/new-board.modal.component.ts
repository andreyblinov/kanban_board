import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GroupsService} from '../../shared/services/groups.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './new-board.modal.component.html',
  styleUrls: ['./new-board.modal.component.scss']
})
export class CreateModalComponent implements OnInit {

  constructor(private groupsService: GroupsService,
              public modal: NgbActiveModal) { }

  ngOnInit() {
  }

  addBoard(board) {
    this.groupsService.saveBoard(board)
      this.modal.close(board);
  }
}
