import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecord, IUserAndCount } from '../interfaces/main.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllUsersAndCounts(): Observable<IUserAndCount> {
    return this.http.get<IUserAndCount>(
      `${environment.BACKEND_SERVER_HOST}/api/getUsersAndCounts`
    );
  }

  getAllLogs(from: number, to: number) {
    const params = new HttpParams().set('from', from).set('size', to);
    return this.http.get(`${environment.BACKEND_SERVER_HOST}/api/listRecords`, {
      params,
    });
  }

  addRecord(user: string): Observable<any> {
    return this.http.post(
      `${environment.BACKEND_SERVER_HOST}/api/insertRecord`,
      {
        user,
        timestamp: Date.now(),
      }
    );
  }
  deleteRecord(log_id: string): Observable<any> {
    return this.http.delete<IRecord>(
      `${environment.BACKEND_SERVER_HOST}/api/deleteRecord/${log_id}`
    );
  }

  updateRecord(log_id: string, body: any): Observable<any> {
    return this.http.patch<IRecord>(
      `${environment.BACKEND_SERVER_HOST}/api/updateRecord/${log_id}`,
      body
    );
  }
}
