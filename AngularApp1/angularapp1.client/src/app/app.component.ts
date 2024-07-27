import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../Models/Game';
import { AsyncPipe } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public games: Game[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getGames();
  }

  
  getGames() {
    this.http.get<Game[]>('https://localhost:7187/api/Games').subscribe(
      (result) => {
        this.games = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'angularapp1.client';
}
