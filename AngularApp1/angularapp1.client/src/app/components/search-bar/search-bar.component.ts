import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value;
    console.log('Search Text:', searchText);
    this.search.emit(searchText);
  }

}
