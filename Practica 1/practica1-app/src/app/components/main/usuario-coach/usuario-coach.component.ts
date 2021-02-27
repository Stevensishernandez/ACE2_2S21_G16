import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-usuario-coach',
  templateUrl: './usuario-coach.component.html',
  styleUrls: ['./usuario-coach.component.css']
})
export class UsuarioCoachComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let usuario = sessionStorage.getItem('user');
    let rol = sessionStorage.getItem('rol');

    if(usuario == null || rol != 'C')
    {
      this.router.navigate(['']);
    }


  }

}
