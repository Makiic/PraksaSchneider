import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, NgFor, NgForOf } from '@angular/common'; // Uvozimo CommonModule

import { EventComponent } from './event.component';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule,NgForOf,NgFor], // Uvozimo CommonModule
      declarations: [EventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
