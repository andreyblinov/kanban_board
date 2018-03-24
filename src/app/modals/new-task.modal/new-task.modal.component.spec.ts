import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTask.ModalComponent } from './new-task.modal.component';

describe('NewTask.ModalComponent', () => {
  let component: NewTask.ModalComponent;
  let fixture: ComponentFixture<NewTask.ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTask.ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTask.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
