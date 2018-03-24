import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { KanbanListComponent } from './kanban-list/kanban-list.component';
import {GroupsService} from './shared/services/groups.service';
import {FormsModule} from '@angular/forms';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {ContextService} from './shared/services/context.service';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TaskComponent } from './task/task.component';
import { BoardModalComponent } from './modals/new-board.modal/board.modal.component';
import { NewTaskModalComponent } from './modals/new-task.modal/new-task.modal.component';


@NgModule({
  declarations: [
    AppComponent,
    KanbanListComponent,
    BoardModalComponent,
    KanbanBoardComponent,
    TaskComponent,
    NewTaskModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule
  ],
  providers: [NgbModalStack, NgbActiveModal, GroupsService, ContextService],
  bootstrap: [AppComponent],
  entryComponents: [BoardModalComponent]
})
export class AppModule { }
