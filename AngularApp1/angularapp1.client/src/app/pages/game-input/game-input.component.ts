import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../../../Models/Genre';
import { Developer } from '../../../Models/Developer';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiManagerService } from '../../services/api-manager.service';
import { Game } from '../../../Models/Game';

@Component({
  selector: 'app-game-input',
  templateUrl: './game-input.component.html',
  styleUrl: './game-input.component.css'
})
export class GameInputComponent {
  gameForm: FormGroup;
  genres: Genre[] = [];
  developers: Developer[] = [];
  selectedDevelopers: number[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiManagerService: ApiManagerService
  ) {
    this.gameForm = this.fb.group({
      name: ['', Validators.required],
      genre: ['', Validators.required],
      price: ['', Validators.required],
      releaseDate: ['', Validators.required],
      imagePath: [''],
      bannerPath: [''],
      developers: [[]],
      description: [''] 
    });
  }
  

  ngOnInit(): void {
    this.loadGenres();
    this.loadDevelopers();
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.loadGame(parseInt(gameId, 10));
    }
  }

  loadGenres(): void {
    this.apiManagerService.getGenres().subscribe((genres) => {
      this.genres = genres;
    });
  }

  loadDevelopers(): void {
    this.apiManagerService.getDevelopers().subscribe((developers) => {
      this.developers = developers;
    });
  }

  loadGame(id: number): void {
    this.apiManagerService.getGame(id).subscribe(game => {
      const genreId = this.genres.find(g => g.name === game.genre)?.id;
      const developerIds = this.developers
      .filter(dev => game.developers.includes(dev.name))
      .map(dev => dev.id);
      this.selectedDevelopers=developerIds;
      this.gameForm.patchValue({
        name: game.name,
        genre: genreId,
        price: game.price,
        releaseDate: this.formatDate(game.releaseDate),
        imagePath: game.imagePath,
        bannerPath: game.bannerPath,
        description: game.description
      });

     
      console.log(developerIds);
  
    });
  }

  

  onDeveloperChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = +target.value;
    if (target.checked) {
      this.selectedDevelopers.push(value);
    } else {
      this.selectedDevelopers = this.selectedDevelopers.filter(id => id !== value);
    }
  }

  onSubmit(): void {
    const formValue = this.gameForm.value;
    const game: any = {
      name: formValue.name,
      price: formValue.price,
      genreID: formValue.genre,  // Directly use genre ID
      releaseDate: this.formatDate(formValue.releaseDate),
      imagePath: formValue.imagePath,
      bannerPath: formValue.bannerPath,
      description: formValue.description,
      developerIDs: this.selectedDevelopers // Use selected developer IDs
    };
    const gameId  =this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.apiManagerService.updateGame(parseInt(gameId, 10),game).subscribe(() => {
        this.router.navigate(['/game-info']);
      });
    } else {
      this.apiManagerService.addGame(game).subscribe(() => {
        this.router.navigate(['/game-info']);
      });
    }
  }

  formatDate(date: string): string {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(dateObj.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  
}
