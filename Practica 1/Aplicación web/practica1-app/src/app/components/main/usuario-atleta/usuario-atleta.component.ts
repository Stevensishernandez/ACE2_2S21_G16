import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-usuario-atleta',
  templateUrl: './usuario-atleta.component.html',
  styleUrls: ['./usuario-atleta.component.css']
})
export class UsuarioAtletaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let usuario = sessionStorage.getItem('user');
    let rol = sessionStorage.getItem('rol');

    if(usuario == null || rol != 'A')
    {
      this.router.navigate(['']);
    }

  }

}
