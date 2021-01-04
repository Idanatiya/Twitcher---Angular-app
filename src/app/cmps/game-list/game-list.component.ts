import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { GameService } from './../../services/game.service';



@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  games : string[] = null
  constructor(private gameService : GameService, private storageService: StorageService ) { }

  ngOnInit(): void {
    // game.box_art_url.replace('{width}','200').replace('{height}','400')
    if(this.storageService.load('gameDB')) {
      this.games = this.storageService.load('gameDB');
      return
    }
    this.gameService.query().subscribe(games => {
      const gamesFixed = games.data.map(game => ({...game, box_art_url: game.box_art_url.replace('{width}','300').replace('{height}','400')}))
      this.games = gamesFixed
      this.storageService.save('gameDB', gamesFixed);

    })

  }

 

}
