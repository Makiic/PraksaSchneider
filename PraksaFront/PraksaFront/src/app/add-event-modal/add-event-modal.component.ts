import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventModel } from '../modules/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.css']
})
export class AddEventModalComponent implements OnInit {
  eventForm: FormGroup;
  events: EventModel[] = [];
  event: EventModel = {
    id: 0,
    name: '',
    date: '',
    time: '',
    location: '',
    description: ''
  };

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      description: ['']
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      return;
    }

    const eventItem: EventModel = this.eventForm.value;

    const date = new Date(eventItem.date);
    if (isNaN(date.getTime())) {
      console.error('Invalid date value');
      return;
    }
    eventItem.date = date.toISOString();

    const timeParts = eventItem.time.split(':');
    if (timeParts.length < 2) {
      console.error('Invalid time value');
      return;
    }
    eventItem.time = this.convertTimeStringToTimeSpan(eventItem.time);

    this.eventService.addEvent(eventItem).subscribe(
      response => {
        console.log('Event successfully added:', response);
        this.events.push(response);
        this.eventForm.reset();
      },
      error => {
        console.error('There was an error adding the event:', error);
      }
    );
  }
  private convertTimeStringToTimeSpan(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}:00`;
  }
}
