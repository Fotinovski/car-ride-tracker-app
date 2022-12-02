import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  isVisible: boolean = false;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.userAndRecords = [];
  }

  ngOnInit(): void {
    this.getAllUsersAndCounts();
    this.getAllUserLogs();
  }

  editRecordForm = this.fb.group({
    log_id: [''],
    user: ['', Validators.required],
    timestamp: ['', Validators.required],
  });

  getAllUserLogs(): void {
    this.apiService
      .getAllLogs(this.logFrom, this.logTo)
      .subscribe((data) => (this.logs = data));
  }
  getAllUsersAndCounts(): void {
    this.apiService
      .getAllUsersAndCounts()
      .subscribe((data) => (this.userAndRecords = data));
  }

  changeLogsPage(logFrom: number): void {
    console.log(logFrom);
    this.logFrom = (logFrom - 1) * this.logTo;
    this.apiService
      .getAllLogs(this.logFrom, this.logTo)
      .subscribe((data) => (this.logs = data));
  }

  addRecord(name: string): void {
    this.apiService.addRecord(name).subscribe(() => this.updataState());
  }

  deleteRecord(log_id: string): void {
    this.apiService.deleteRecord(log_id).subscribe(() => this.updataState());
  }

  showModal(record: any): void {
    this.isVisible = true;
    this.editRecordForm.patchValue(record);
  }
  updateRecord(): void {
    this.apiService
      .updateRecord(this.editRecordForm.value.log_id, this.editRecordForm.value)
      .subscribe(() => (this.isVisible = false));

    console.log(this.editRecordForm.value.log_id);
    this.isVisible = false;
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  private updataState(): void {
    this.getAllUsersAndCounts();
    this.getAllUserLogs();
  }
}
