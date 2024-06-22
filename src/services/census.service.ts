import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { PersonToSave } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class CensusService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  public addPerson(person: PersonToSave): Observable<PersonToSave> {
    return this.http.post<PersonToSave>(`${this.apiUrl}/persons`, person);
  }
}
