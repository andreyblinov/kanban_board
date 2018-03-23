import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { KanbanListComponent } from './kanban-list/kanban-list.component';
import {GroupsService} from './shared/services/groups.service';
import { CreateModalComponent } from './modals/new-board.modal/new-board.modal.component';
import {FormsModule} from '@angular/forms';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {ContextService} from './shared/services/context.service';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';


@NgModule({
  declarations: [
    AppComponent,
    KanbanListComponent,
    CreateModalComponent,
    KanbanBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule
  ],
  providers: [NgbModalStack, GroupsService, ContextService],
  bootstrap: [AppComponent],
  entryComponents: [CreateModalComponent]
})
export class AppModule { }
