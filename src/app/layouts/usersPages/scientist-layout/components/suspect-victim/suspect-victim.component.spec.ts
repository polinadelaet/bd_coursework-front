import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectVictimComponent } from './suspect-victim.component';

describe('SuspectVictimComponent', () => {
  let component: SuspectVictimComponent;
  let fixture: ComponentFixture<SuspectVictimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspectVictimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspectVictimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
