import { ClientService } from './../client.service';

import { Component, OnInit } from '@angular/core';

import { Client } from '../client';

import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',

  templateUrl: './clients.component.html',

  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  Clients: Client[] = [];
isEditing : boolean = false;
  formGroupClient: FormGroup;
  submitted : boolean = false;

  constructor(
    private ClientService: ClientService,
    private formsBuilder: FormBuilder
  ) {
    this.formGroupClient = formsBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.ClientService.getClients().subscribe({
      next: (data) => (this.Clients = data),
    });
  }

  save() {
    this.submitted = true;

    if(this.formGroupClient.valid){

      if(this.isEditing){
        this.ClientService.edit(this.formGroupClient.value).subscribe({
      next: () =>{
        this.loadClients();
        this.formGroupClient.reset();
        this.isEditing = false;
        this.submitted = false
      }
        })
      }
      else{


          this.ClientService.save(this.formGroupClient.value).subscribe(
            {
              next: data =>{ this.Clients.push(data);
              this.formGroupClient.reset();
              this.submitted = false
              }
            }
          )
        }
    }

}

  edit(Client : Client){
this.formGroupClient.setValue(Client);
this.isEditing = true;
  }

  delete(Client : Client){
    this.ClientService.delete(Client).subscribe({

      next: () => this.loadClients()
    })
  }

  clean(){
    this.formGroupClient.reset();
this.isEditing = false;
this.submitted = false;
  }

  get name() : any{
return this.formGroupClient.get("name");
  }

  get email() : any{
    return this.formGroupClient.get("email");
      }
}

