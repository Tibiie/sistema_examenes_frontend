import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, tap } from 'rxjs';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categorias:any;

  constructor(private categoriaService: CategoriaService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().pipe(
      tap((data) =>{
        this.categorias = data;

      }),catchError((error: Error) => {
        this.snack.open('Ha ocurrido un error al intentar cargar las categorias !!','',{
          duration : 3000
        });
        console.error(error);
        return of([])
      })
    ).subscribe()
  }

}
