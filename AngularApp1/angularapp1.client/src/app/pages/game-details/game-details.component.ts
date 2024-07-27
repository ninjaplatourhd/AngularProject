import { Component } from '@angular/core';
import { Game } from '../../../Models/Game';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiManagerService } from '../../services/api-manager.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css'
})
export class GameDetailsComponent {
  game!: Game;
  gameId!:number;

  constructor(private route: ActivatedRoute, private apiManagerService: ApiManagerService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.gameId = +params.get('id')!;
      // Fetch game details using this.gameId
    });

    this.getGame(this.gameId);
  
  }

  getGame(id:number) {
    this.apiManagerService.getGame(this.gameId).subscribe(
      (result) => {
        this.game = result;
        if (!this.game.imagePath) {
          this.game.imagePath = 'BaseImage';
        }
        if (!this.game.bannerPath) {
          this.game.bannerPath = 'BaseBanner';
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
}
