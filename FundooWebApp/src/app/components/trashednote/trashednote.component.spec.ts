import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashednoteComponent } from './trashednote.component';

describe('TrashednoteComponent', () => {
  let component: TrashednoteComponent;
  let fixture: ComponentFixture<TrashednoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashednoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashednoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
