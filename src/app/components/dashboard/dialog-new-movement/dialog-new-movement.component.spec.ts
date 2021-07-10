import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewMovementComponent } from './dialog-new-movement.component';

describe('DialogNewMovementComponent', () => {
  let component: DialogNewMovementComponent;
  let fixture: ComponentFixture<DialogNewMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
