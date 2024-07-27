import { Component } from '@angular/core';
import { ApiManagerService } from '../../services/api-manager.service';
import { Genre } from '../../../Models/Genre';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrl: './genre-info.component.css'
})
export class GenreInfoComponent {
    genres: Genre[]= [];
    filteredGenres: Genre[]=[];
    searchText: string = '';

    constructor(private apiManagerService: ApiManagerService,private router: Router) {}

    ngOnInit() {
    
      this.getGenres();
      
    }

    genreColumns = [
      { header: 'ID', field: 'id' },
      { header: 'Name', field: 'name' }
    ];
  

    getGenres(){
      this.apiManagerService.getGenres().subscribe(
        (result) => { this.genres=result;
          this.filteredGenres=this.genres;
        },
        (error) => {
          console.error(error);
        }
      );
    }

    onSearch(searchText: string): void {
      this.searchText = searchText;
      this.filterGenres();
    }

    private filterGenres(): void {
      this.filteredGenres = this.genres.filter(genre => {
        return genre.name.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }
  
    updateGenre(id:number)
    {
      this.navigateToUpdate('/genre-input',id)
    }

    deleteGenre(id:number)
    {
      this.apiManagerService.deleteGenre(id).subscribe(
        () => {
          this.genres= this.genres.filter(genre=> genre.id!== id);
          this.filteredGenres=this.genres;
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
