import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/movie.service';
import { Film } from '../models/film.model';
import { OrderService } from '../services/order.service';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-film',
  templateUrl: './detail-film.component.html',
  styleUrls: ['./detail-film.component.scss']
})
export class DetailFilmComponent implements OnInit {

  choosenFilm: Film;

  constructor(private filmService:FilmService, private orderService: OrderService, private router:Router) { }

  ngOnInit(): void {
    this.choosenFilm = this.filmService.getChoosenFilm();
  }

  setChoosenFilm(film:Film){
    this.filmService.setChoosenFilm(film);
  }

  rentFilm():void{
    const userData:User = JSON.parse(localStorage.getItem("user"));
   
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);

    const order:Order = {
      UserId: userData.id,
      FilmId: this.choosenFilm.id,
      OrderDate: today,
      Devolution: tomorrow,
      Price: 2.95,
      Days: 1
    }
  
    this.orderService.createOrder(order);
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 50);
  }
}
