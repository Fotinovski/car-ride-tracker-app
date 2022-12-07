import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
  isAddUserVisible: boolean = false;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {
    this.userAndRecords = [];
  }

  ngOnInit(): void {
    this.getAllUsersAndCounts();
    this.getAllUserLogs();
  }

  editRecordForm = this.fb.group({
    log_id: [''],
    user: ['', Validators.required],
    timestamp: [null, Validators.required],
  });

  addUserForm = this.fb.group({
    user: ['', Validators.required],
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
    this.logFrom = (logFrom - 1) * this.logTo;
    this.apiService
      .getAllLogs(this.logFrom, this.logTo)
      .subscribe((data) => (this.logs = data));
  }

  addRecord(name: string): void {
    this.apiService.addRecord(name).subscribe({
      next: (msg) => {
        this.updataState(),
          this.notification.create('success', msg.Success, '', {
            nzDuration: 5000,
          });
      },
    });
  }

  deleteRecord(log_id: string): void {
    this.apiService.deleteRecord(log_id).subscribe({
      next: (msg) => {
        this.updataState(),
          this.notification.create('success', msg.Success, '', {
            nzDuration: 5000,
          });
      },
    });
  }

  addUserModalOpen() {
    this.addUserForm.reset();
    this.isAddUserVisible = true;
  }
  addUser() {
    this.apiService.addRecord(this.addUserForm.value.user).subscribe({
      next: (msg) => {
        this.updataState(),
          this.notification.create('success', msg.Success, '', {
            nzDuration: 5000,
          });
      },
    });
    this.isAddUserVisible = false;
  }

  showModal(record: any): void {
    this.isVisible = true;

    record.timestamp = new Date(record.timestamp);
    this.editRecordForm.patchValue(record);
  }
  updateRecord(): void {
    this.editRecordForm.value.timestamp = new Date(
      this.editRecordForm.value.timestamp
    ).getTime();

    this.apiService
      .updateRecord(this.editRecordForm.value.log_id, this.editRecordForm.value)
      .subscribe({
        next: (msg) => {
          this.updataState(),
            this.notification.create('success', msg.Success, '', {
              nzDuration: 5000,
            });
          this.isVisible = false;
        },
      });
  }
  handleCancel(): void {
    this.isVisible = false;
    this.isAddUserVisible = false;
  }

  private updataState(): void {
    this.getAllUsersAndCounts();
    this.getAllUserLogs();
  }
}
