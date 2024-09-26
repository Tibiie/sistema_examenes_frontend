import { Component, OnInit } from '@angular/core';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css']
})
export class ViewExamenesComponent implements OnInit {

  examenes: any = [
    
  ]


  constructor(private examenService: ExamenService) { }

  ngOnInit(): void {
    this.examenService.listarCuestionarios().subscribe(
      (dato:any) =>{
        this.examenes = dato;
        console.log(this.examenes);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "Hubo un error al cargar los examenes", "error")
      }
    )
  }

  eliminarExamen(examenId:any){
    Swal.fire({
      title: "Eliminar cuestionario",
      text: "¿Estas seguro de que quieres eliminar el examen?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenService.eliminarExamen(examenId).subscribe(
          (data) => {
            this.examenes = this.examenes.filter((examen:any) => examen.examenId != examenId)
          }
        )
        Swal.fire({
          title: "Cuestionario eliminado!",
          text: "El examen fue eliminado con exito.",
          icon: "success"
        });
      }
    });
  }

}
