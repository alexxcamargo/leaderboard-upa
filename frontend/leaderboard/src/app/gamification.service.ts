import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Presence {
  id: number;
  date: string;
  adolescentId: number;
}

interface Adolescent {
  id: number;
  name: string;
  birthdate: string;
  points: number;
  presences: number;
  correctAnswers: number;
  presenceLogs: Presence[];
}

@Injectable({
  providedIn: 'root'
})
export class GamificationService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerPresence(adolescentId: number, date: string): Observable<Adolescent> {
    return this.http.post<Adolescent>(`${this.apiUrl}/registerPresence`, { adolescentId, date });
  }

  registerCorrectAnswer(adolescentId: number, correctAnswers: number): Observable<Adolescent> {
    return this.http.post<Adolescent>(`${this.apiUrl}/registerCorrectAnswer`, { adolescentId, correctAnswers });
  }

  getLeaderboard(): Observable<Adolescent[]> {
    return this.http.get<Adolescent[]>(`${this.apiUrl}/leaderboard`);
  }

  addAdolescent(name: string, birthdate: string): Observable<Adolescent> {
    return this.http.post<Adolescent>(`${this.apiUrl}/addAdolescent`, { name, birthdate });
  }

  updateAdolescentBirthdate(id: number, birthdate: string): Observable<Adolescent> {
    return this.http.put<Adolescent>(`${this.apiUrl}/updateAdolescentBirthdate`, { id, birthdate });
  }

  getAllAdolescents(): Observable<Adolescent[]> {
    return this.http.get<Adolescent[]>(`${this.apiUrl}/adolescents`);
  }
}
