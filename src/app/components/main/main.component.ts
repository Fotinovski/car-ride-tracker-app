import { Component, OnInit } from '@angular/core';
import { timeStamp } from 'console';
import { mergeMap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  userAndRecords: any;
  logs: any = [];
  logFrom: number = 0;
  logTo: number = 10;

  constructor(private apiService: ApiService) {
    this.userAndRecords = [];
  }

  ngOnInit(): void {
    this.getAllUsersAndCounts();
    this.getAllUserLogs();
  }

  getAllUserLogs(): void {
    this.apiService
      .getAllLogs(this.logFrom, this.logTo)
      .subscribe((data) => (this.logs = data));
  }

  changeLogsPage(logFrom: number): void {
    console.log(logFrom);
    this.logFrom = (logFrom - 1) * this.logTo;
    this.apiService
      .getAllLogs(this.logFrom, this.logTo)
      .subscribe((data) => (this.logs = data));
  }

  deleteRecord(log_id: string) {
    this.apiService.deleteRecord(log_id).subscribe(() => this.updataState());
  }
  updateRecord(log_id: string) {
    //this.apiService.updateRecord(log_id).subscribe();
  }

  getAllUsersAndCounts() {
    this.apiService
      .getAllUsersAndCounts()
      .subscribe((data) => (this.userAndRecords = data));
  }

  addRecord(name: string) {
    this.apiService.addRecord(name).subscribe(() => this.updataState());
  }

  private updataState() {
    this.getAllUsersAndCounts();
    this.getAllUserLogs();
  }
}
