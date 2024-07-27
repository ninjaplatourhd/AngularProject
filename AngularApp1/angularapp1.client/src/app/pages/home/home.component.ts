import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Genre } from '../../../Models/Genre';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Game } from '../../../Models/Game';
import { Developer } from '../../../Models/Developer';
import { Router } from '@angular/router';
import { ApiManagerService } from '../../services/api-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  developers: Developer[]=[];
  genres: Genre[] = [];
  games: Game[]=[];
  selectedGenres: Set<string> = new Set(); 
  selectedDevelopers:Set<string> = new Set();
  filteredGames: Game[] = [];
  searchText: string = '';
  genreForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router,private apiManagerService: ApiManagerService) {}
  
  ngOnInit() {
    
    this.getGenres();
    this.genres.sort((a, b) => a.name.localeCompare(b.name));
    this.getGames();
    this.games.sort((a, b) => a.name.localeCompare(b.name));
    this.getDevelopers();
    this.developers.sort((a, b) => a.name.localeCompare(b.name));
  }

  onSearch(searchText: string): void {
    this.searchText = searchText;
    this.filterGames();
  }

  private filterGames(): void {
    this.filteredGames = this.games.filter(game => {
      const matchesSearchText = game.name.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesGenre = this.selectedGenres.size === 0 || this.selectedGenres.has(game.genre);
      const matchesDeveloper = this.selectedDevelopers.size === 0 || game.developers.some(developer => this.selectedDevelopers.has(developer));
      return matchesSearchText && matchesGenre && matchesDeveloper;
    });
  }

  onGenreChange(genre: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.checked) {
      this.selectedGenres.add(genre);
    } else {
      this.selectedGenres.delete(genre);
    }
    this.filterGames();
  }

  onDeveloperChange(developer: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.checked) {
      this.selectedDevelopers.add(developer);
    } else {
      this.selectedDevelopers.delete(developer);
    }
    this.filterGames();
  }

  
  getGenres() {
    this.apiManagerService.getGenres().subscribe(
      (result) => {
        this.genres = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
  getDevelopers() {
    this.apiManagerService.getDevelopers().subscribe(
      (result) => {
        this.developers = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getGames() {
    this.apiManagerService.getGames().subscribe(
      (result) => {
        this.games = result;
        this.filteredGames = this.games;
      },
      (error) => {
        console.error(error);
      }
    );
  }





}
