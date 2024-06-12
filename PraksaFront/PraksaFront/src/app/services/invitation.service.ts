import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Invitation } from '../modules/invitation.model';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private apiUrl = 'http://localhost:5188/api/Invitations';

  constructor(private http: HttpClient) { }


  sendInvitation(eventId: number, invitation: any): Observable<any> {
    const url = `http://localhost:5188/api/Invitations/${eventId}/invite`;
    const payload = {
      Email: invitation.email
    };
    return this.http.post(url, payload);
  }
}
