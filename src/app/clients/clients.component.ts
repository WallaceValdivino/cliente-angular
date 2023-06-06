import { ClientService } from './../client.service';

import { Component, OnInit } from '@angular/core';

import { Client } from '../client';

import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',

  templateUrl: './clients.component.html',

  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  Clients: Client[] = [];




  constructor(private ClientService: ClientService, private router : Router) {

  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.ClientService.getClients().subscribe({
      next: (data) => (this.Clients = data),
    });
  }



  edit(client : Client){
    this.router.navigate(['clientDetails', client.id])

  }

  delete(Client : Client){
    this.ClientService.delete(Client).subscribe({

      next: () => this.loadClients()
    })
  }
create(){
  this.router.navigate(['createClient']);
}



}

