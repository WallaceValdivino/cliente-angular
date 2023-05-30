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
  Client: Client = {} as Client;
  isEditing : boolean = false;



  constructor(private ClientService: ClientService) {

  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.ClientService.getClients().subscribe({
      next: (data) => (this.Clients = data),
    });
  }

  onSaveEvent(client: Client) {
      if(this.isEditing){
        this.ClientService.edit(client).subscribe({
      next: () =>{
        this.loadClients();
        this.isEditing = false;
      }
        }

        )
      }
      else{


          this.ClientService.save(client).subscribe(
            {
              next: data =>{ this.Clients.push(data);
              }
            }
          )
        }


}

  edit(Client : Client){
this.Client = Client;
this.isEditing = true;
  }

  delete(Client : Client){
    this.ClientService.delete(Client).subscribe({

      next: () => this.loadClients()
    })
  }




}

