import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdolescentComponent } from './add-adolescent.component';

describe('AddAdolescentComponent', () => {
  let component: AddAdolescentComponent;
  let fixture: ComponentFixture<AddAdolescentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAdolescentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAdolescentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
