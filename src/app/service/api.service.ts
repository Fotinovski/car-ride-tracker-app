import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecord, IUserAndCount } from '../interfaces/main.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:3050';

  constructor(private http: HttpClient) {}

  getAllUsersAndCounts(): Observable<IUserAndCount> {
    return this.http.get<IUserAndCount>(`${this.url}/api/getUsersAndCounts`);
  }

  getAllLogs(from: number, to: number) {
    const params = new HttpParams().set('from', from).set('size', to);
    return this.http.get(`${this.url}/api/listRecords`, { params });
  }

  addRecord(user: string): Observable<any> {
    return this.http.post(`${this.url}/api/insertRecord`, {
      user,
      timestamp: Date.now(),
    });
  }
  deleteRecord(log_id: string): Observable<IRecord> {
    return this.http.delete<IRecord>(`${this.url}/api/deleteRecord/${log_id}`);
  }

  updateRecord(log_id: string, body: any): Observable<IRecord> {
    return this.http.patch<IRecord>(
      `${this.url}/api/updateRecord/${log_id}`,
      body
    );
  }
}
