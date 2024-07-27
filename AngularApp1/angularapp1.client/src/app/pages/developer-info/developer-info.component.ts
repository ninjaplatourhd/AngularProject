import { Component } from '@angular/core';
import { Developer } from '../../../Models/Developer';
import { ApiManagerService } from '../../services/api-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-developer-info',
  templateUrl: './developer-info.component.html',
  styleUrl: './developer-info.component.css'
})
export class DeveloperInfoComponent {
  Developers: Developer[]= [];
  filteredDevelopers: Developer[]=[];
  searchText: string = '';

  constructor(private apiManagerService: ApiManagerService,private router:Router) {}

  ngOnInit() {
  
    this.getDevelopers();
    
  }

  developerColumns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Country', field:'country'}
  ];


  getDevelopers(){
    this.apiManagerService.getDevelopers().subscribe(
      (result) => { this.Developers=result;
        this.filteredDevelopers=this.Developers;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSearch(searchText: string): void {
    this.searchText = searchText;
    this.filterDevelopers();
  }

  private filterDevelopers(): void {
    this.filteredDevelopers = this.Developers.filter(Developer => {
      return Developer.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  updateDeveloper(id:number)
  {
    this.navigateToUpdate('/developer-input',id);
  }

  deleteDeveloper(id:number)
  {
    this.apiManagerService.deleteDeveloper(id).subscribe(
      () => {
        this.Developers= this.Developers.filter(Developer=> Developer.id!== id);
        this.filteredDevelopers=this.Developers;
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
