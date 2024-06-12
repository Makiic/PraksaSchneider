import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent {
  invitationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<InvitationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.invitationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendInvitation(): void {
    if (this.invitationForm.valid) {
      this.dialogRef.close(this.invitationForm.value.email);
    }
  }
}
