import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrifileComponent } from './edit-prifile.component';

describe('EditPrifileComponent', () => {
  let component: EditPrifileComponent;
  let fixture: ComponentFixture<EditPrifileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPrifileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPrifileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
