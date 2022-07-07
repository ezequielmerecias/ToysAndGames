import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Confirmación</h1>
    <div mat-dialog-content>
      <p>{{ messageTxt }}</p>
    </div>
    <div>
      <button mat-raised-button type="button" (click)="closeDialog()">No</button>
      <button mat-raised-button type="button" color="primary" (click)="confirm()" cdkFocusInitial>Sí</button>
    </div>
  `,
})
export class ConfirmationDialog implements OnInit {
  constructor(
    public dialog: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public messageTxt: string
  ) {}

  closeDialog(): void {
    this.dialog.close(false);
  }
  confirm(): void {
    this.dialog.close(true);
  }

  ngOnInit() {}
}