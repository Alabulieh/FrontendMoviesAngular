import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/movie.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private filmService: FilmService, private userService:UserService) { }

  ngOnInit(): void {
  }
  searchTitle(event){//en esta funcion guardamos lo que tecleamos por el input referenciado con el titulo y la url de la pelicula para compararlos
    if(event.target.value.length >= 2){//le decimos que se active cuando hayamos tecleado tres o mas teclas
      this.filmService.searchFilmsTitle(event.target.value)
      .subscribe(res=>this.filmService.setFilms(res))
      
    }
  }

  getUser():User {
    return this.userService.getUser();
  }

  logout(): void {
    this.userService.logout();
  }

}
