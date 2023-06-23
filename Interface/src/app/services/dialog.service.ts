import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/shared/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmationDialog(): Observable<boolean>{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    return dialogRef.afterClosed();
  }
}
