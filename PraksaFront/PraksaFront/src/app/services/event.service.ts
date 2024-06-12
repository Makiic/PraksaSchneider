import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventModel } from '../modules/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5188/api/Events';

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.apiUrl}/GetEvents`)
      .pipe(
        catchError(this.handleError<EventModel[]>('getEvents', []))
      );
  }
  

  getEvent(id: number): Observable<EventModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<EventModel>(url)
      .pipe(
        catchError(this.handleError<EventModel>(`getEvent id=${id}`))
      );
  }
  
  addEvent(eventItem: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(`${this.apiUrl}/PostEvent`, eventItem)
      .pipe(
        catchError(this.handleError<EventModel>('addEvent'))
      );
  }

  
  updateEvent(id: number, event: EventModel): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, event, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateEvent'))
      );
  }

  deleteEvent(id: number): Observable<EventModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<EventModel>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<EventModel>('deleteEvent'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
