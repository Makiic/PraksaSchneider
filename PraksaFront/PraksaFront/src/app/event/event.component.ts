import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { InvitationService } from '../services/invitation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventModel } from '../modules/event.model';
import { MatDialog } from '@angular/material/dialog';
import { InvitationComponent } from '../invitation/invitation.component';
import { Invitation, InvitationStatus } from '../modules/invitation.model';
import { AddEventModalComponent } from '../add-event-modal/add-event-modal.component';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event: EventModel = {
    id: 0,
    name: '',
    date: '',
    time: '',
    location: '',
    description: ''
  };

  events: EventModel[] = [];
  eventForm: FormGroup;
  selectedEvent: EventModel | null = null;

  constructor(
    private eventService: EventService,
    private invitationService: InvitationService,
    private fb: FormBuilder,
    public dialog: MatDialog
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
    this.loadEvents();
  }

  private loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events: EventModel[]) => {
        this.events = events;
        console.log('Data loaded successfully:', this.events);
      },
      error: (error) => {
        console.error('API error:', error);
      }
    });
  }

  addEvent(): void {
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
  openAddEventModal(): void {
    const dialogRef = this.dialog.open(AddEventModalComponent, {
      width: '400px', // Prilagodi širinu prozora po potrebi
      data: {} // Dodaj podatke ako je potrebno
    });

    dialogRef.afterClosed().subscribe(result => {
      // Ovde možeš obraditi rezultat zatvaranja modalnog prozora
      if (result) {
        // Ako postoji rezultat, na primer, podaci koji su uneti u modalni prozor
        // Ovde možeš izvršiti neku akciju, poput dodavanja događaja
        console.log('Result from modal:', result);
        // Dodaj logiku za obradu rezultata po potrebi
      }
    });
  }

  private convertTimeStringToTimeSpan(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}:00`;
  }
  openInvitationModal(event: EventModel): void {
    const dialogRef = this.dialog.open(InvitationComponent, {
      width: '250px',
      data: { eventName: event.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const invitation = {
          email: result,
          id:0,
          status : "Pending",
          eventId: event.id

        };

        this.invitationService.sendInvitation(event.id, invitation).subscribe(
          response => {
            console.log('Invitation sent successfully:', response);
          },
          error => {
            console.error('There was an error sending the invitation:', error);
            if (error.error) {
              console.error('Server error message:', error.error);
              if (error.error.errors) {
                console.error('Validation errors:', error.error.errors);
                for (const key in error.error.errors) {
                  if (error.error.errors.hasOwnProperty(key)) {
                    console.error(`${key}: ${error.error.errors[key].join(', ')}`);
                  }
                }
              }
            }
          }
        );
      }
    });
  }
  
}
