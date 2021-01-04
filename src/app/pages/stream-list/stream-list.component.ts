import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GameService } from './../../services/game.service';



@Component({
  selector: 'stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {
  streams: any[] = null
  id: number = null
  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      this.gameService.queryByGameId(this.id).subscribe(streams =>  {
        this.streams = streams.data.map(stream => ({...stream, thumbnail_url: stream.thumbnail_url.replace('{width}','400').replace('{height}','200')}))
        console.log('streams:',this.streams)
      })
   });
    // const id = this.route.snapshot.paramMap.get('id');
    // console.log(this.route.snapshot.paramMap)
    // this.gameService.queryByGameId(id).subscribe(streams =>  {
    //   this.streams = streams.data.map(stream => ({...stream, thumbnail_url: stream.thumbnail_url.replace('{width}','400').replace('{height}','200')}))
    //   console.log('streams:',this.streams)
    // })
  }

}
