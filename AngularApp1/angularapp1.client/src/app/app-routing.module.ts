import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { GenreInfoComponent } from './pages/genre-info/genre-info.component';
import { DeveloperInfoComponent } from './pages/developer-info/developer-info.component';
import { GameInfoComponent } from './pages/game-info/game-info.component';
import { GameInputComponent } from './pages/game-input/game-input.component';
import { GenreInputComponent } from './pages/genre-input/genre-input.component';
import { DeveloperInputComponent } from './pages/developer-input/developer-input.component';

const routes: Routes =[{
  path:'home',
  component:HomeComponent
},
{
  path:'game-details/:id',
  component:GameDetailsComponent
},
{
  path:'genre-info',
  component:GenreInfoComponent
},
{
  path:'developer-info',
  component:DeveloperInfoComponent
},
{
  path:'game-info',
  component:GameInfoComponent
},
{
  path:'game-input',
  component:GameInputComponent
},
{
  path:'game-input/:id',
  component:GameInputComponent
},
{
  path:'genre-input',
  component:GenreInputComponent
},
{
  path:'genre-input/:id',
  component:GenreInputComponent
},
{
  path:'developer-input',
  component:DeveloperInputComponent
},
{
  path:'developer-input/:id',
  component:DeveloperInputComponent
},
{
  path:'',redirectTo: 'home',pathMatch:'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
