import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
   url = "http://localhost:3000/clients";
  constructor(private http: HttpClient) {}
  getClients(): Observable<Client[]>{
  return this.http.get<Client[]>(this.url);
  }
  save(Client: Client): Observable<Client>{
    return this.http.post<Client>(this.url, Client);

  }
  edit(Client: Client): Observable<Client>{
    return this.http.put<Client>(`${this.url}/${Client.id}`, Client);
  }
  delete(Client: Client): Observable<void>{
    return this.http.delete<void>(`${this.url}/${Client.id}`);

  }


}
