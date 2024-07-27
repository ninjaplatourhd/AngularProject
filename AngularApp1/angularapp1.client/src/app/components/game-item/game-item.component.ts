import { Component, Input } from '@angular/core';
import { Game } from '../../../Models/Game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.css'
})
export class GameItemComponent {
  @Input() game!: Game;

  

  ngOnInit() {
    
    if(this.game.imagePath==="")
      this.game.imagePath="BaseImage"

     if(this.game.bannerPath==="")
      this.game.bannerPath="BaseBanner"
  }

  constructor(private router: Router) { }

  onSelect(id: number) {
    this.router.navigate(['/game-details', id]);
  }
}
