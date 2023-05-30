import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnChanges {
  @Input()
  Client: Client = {} as Client;

  @Output()
  saveEvent = new EventEmitter<Client>();
  formGroupClient: FormGroup;
  submitted: boolean = false;
  isEditing : boolean = false;
  constructor(private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.formGroupClient.setValue(this.Client);
  }

  save() {
    this.submitted = true;
    if (this.formGroupClient.valid && this.isEditing == true) {
      this.saveEvent.emit(this.formGroupClient.value);
      this.formGroupClient.reset();
      this.submitted = false;
      this.isEditing = false;
    }
  }
  clean() {
    this.isEditing = false;
    this.formGroupClient.reset();
    this.submitted = false;

  }
  get name(): any {
    return this.formGroupClient.get('name');
  }

  get email(): any {
    return this.formGroupClient.get('email');
  }
}
