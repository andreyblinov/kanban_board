import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { KanbanListComponent } from './kanban-list/kanban-list.component';


@NgModule({
  declarations: [
    AppComponent,
    KanbanListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
