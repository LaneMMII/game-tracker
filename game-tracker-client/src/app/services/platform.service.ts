import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Platform {
  platformId: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private apiUrl = 'http://localhost:5127/api/platforms';

  constructor(private http: HttpClient) {}

  getPlatforms(): Observable<Platform[]> {
    return this.http.get<Platform[]>(this.apiUrl);
  }

  addPlatform(platform: Platform): Observable<Platform> {
    return this.http.post<Platform>(this.apiUrl, platform);
  }
}