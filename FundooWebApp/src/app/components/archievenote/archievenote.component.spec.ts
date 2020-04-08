import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchievenoteComponent } from './archievenote.component';

describe('ArchievenoteComponent', () => {
  let component: ArchievenoteComponent;
  let fixture: ComponentFixture<ArchievenoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchievenoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchievenoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
