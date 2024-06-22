import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Person } from '../interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CensusService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  public addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.apiUrl}/persons`, person);
  }
}
