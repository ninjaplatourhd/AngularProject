import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GameItemComponent } from './components/game-item/game-item.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { GenreInfoComponent } from './pages/genre-info/genre-info.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DeveloperInfoComponent } from './pages/developer-info/developer-info.component';
import { GameInfoComponent } from './pages/game-info/game-info.component';
import { GameInputComponent } from './pages/game-input/game-input.component';
import { GenreInputComponent } from './pages/genre-input/genre-input.component';
import { DeveloperInputComponent } from './pages/developer-input/developer-input.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchBarComponent,
    GameItemComponent,
    GameDetailsComponent,
    GenreInfoComponent,
    DataTableComponent,
    DeveloperInfoComponent,
    GameInfoComponent,
    GameInputComponent,
    GenreInputComponent,
    DeveloperInputComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
