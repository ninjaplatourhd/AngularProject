import { Component } from '@angular/core';
import { Game } from '../../../Models/Game';
import { ApiManagerService } from '../../services/api-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.css'
})
export class GameInfoComponent {
  Games: Game[]= [];
  filteredGames: Game[]=[];
  searchText: string = '';

  constructor(private apiManagerService: ApiManagerService,private router: Router) {}

  ngOnInit() {
  
    this.getGames();
    
  }

 gameColumns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Genre', field: 'genre'},
    { header: 'Release Date', field: 'releaseDate'},
    { header: 'Price', field: 'price'},
    { header: 'Developers', field: 'developers'},
  ];


  getGames(){
    this.apiManagerService.getGames().subscribe(
      (result) => { this.Games=result;
        this.filteredGames=this.Games;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSearch(searchText: string): void {
    this.searchText = searchText;
    this.filterGames();
  }

  private filterGames(): void {
    this.filteredGames = this.Games.filter(Game => {
      return Game.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  updateGame(id:number)
  {
    this.navigateToUpdate('/game-input',id)
  }

  deleteGame(id:number)
  {
    this.apiManagerService.deleteGame(id).subscribe(
      () => {
        this.Games= this.Games.filter(Game=> Game.id!== id);
        this.filteredGames=this.Games;
        this.searchText='';
      },
      (error) => {
        console.error(error);
      }
    );
  }

  navigateToAdd(name: string) {
    this.router.navigate([name]);
  }
  navigateToUpdate(name: string, id:number) {
    this.router.navigate([name,id]);
  }
}
