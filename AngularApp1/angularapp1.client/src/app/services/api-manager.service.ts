import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../../Models/Genre';
import { Developer } from '../../Models/Developer';
import { Observable } from 'rxjs/internal/Observable';
import { Game } from '../../Models/Game';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {
  constructor(private http: HttpClient) {}
  private baseURL: string = 'https://localhost:7187';

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.baseURL+'/api/Games');
  }

  getGame(id:number): Observable<Game> {
    return this.http.get<Game>(this.baseURL+'/Games/'+id);
  }

  addGame(game: any): Observable<void> {
    console.log('Sending game data:', game);  // Log the game data
    return this.http.post<void>(`${this.baseURL}/AddGame`, game)
      .pipe(catchError(this.handleError));
  }

  updateGame(id: number, game: Game): Observable<void> {
    console.log('Updating game data:', game);  // Log the game data
    return this.http.put<void>(`${this.baseURL}/UpdateGame/${id}`, game)
      .pipe(catchError(this.handleError));
  }

  deleteGame(id:number): Observable<void> {
    return this.http.delete<void>(this.baseURL+'/DeleteGame/'+id).pipe(catchError(this.handleError));
  }


  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.baseURL+'/api/Genres');
  }

  getGenre(id:number): Observable<Genre> {
    return this.http.get<Genre>(this.baseURL+'/Genres/'+id);
  }

  addGenre(genre: any): Observable<void> {
    console.log('Sending genre data:', genre);  // Log the game data
    return this.http.post<void>(`${this.baseURL}/AddGenre`, genre)
      .pipe(catchError(this.handleError));
  }

  updateGenre(id: number, genre: Genre): Observable<void> {
    console.log('Updating genre data:', genre);  // Log the game data
    return this.http.put<void>(`${this.baseURL}/UpdateGenre/${id}`, genre)
      .pipe(catchError(this.handleError));
  }

  deleteGenre(id:number): Observable<void> {
    return this.http.delete<void>(this.baseURL+'/DeleteGenre/'+id).pipe(catchError(this.handleError));
  }

  getDevelopers(): Observable<Developer[]> {
    return this.http.get<Developer[]>(this.baseURL+'/api/Developers');
  }

  getDeveloper(id:number): Observable<Developer> {
    return this.http.get<Developer>(this.baseURL+'/Developers/'+id);
  }

  addDeveloper(developer: any): Observable<void> {
    console.log('Sending developer data:', developer);  // Log the game data
    return this.http.post<void>(`${this.baseURL}/AddDeveloper`, developer)
      .pipe(catchError(this.handleError));
  }

  updateDeveloper(id: number, developer: Developer): Observable<void> {
    console.log('Updating developer data:', developer);  // Log the game data
    return this.http.put<void>(`${this.baseURL}/UpdateDeveloper/${id}`, developer)
      .pipe(catchError(this.handleError));
  }

  deleteDeveloper(id:number): Observable<void> {
    return this.http.delete<void>(this.baseURL+'/DeleteDeveloper/'+id).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Backend returned code ${error.status}, body was: ${error.message}`);
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }

}
