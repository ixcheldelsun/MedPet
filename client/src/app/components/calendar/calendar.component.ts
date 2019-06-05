import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick

import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from 'src/app/models/mascota';




@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; 

  colors: any = {
    vacunas: '#778beb',
    celos: '#f19066',
    consultas: '#f5cd79',
    desparasitaciones: '#786fa6',
    observaciones: '#f8a5c2',

  };
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];

  mascotaActual: Mascota;

  fechasC: EventInput[] = [];
  fechasV: EventInput[] = [];
  calendarEvents: EventInput[] = [];

  constructor( private mascotaService: MascotasService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {

    this.mascotaActual = this.mascotaService.mascotaActual;

    if(!this.mascotaActual) {
      this.router.navigateByUrl('/escoger-mascota')
    }

    this.mascotaService.getCelos(this.mascotaActual.id_mascota).subscribe( 
      celos => {
        const size = Object.keys(celos);//para obtener el tamaño del objeto celos
        let agregar: EventInput;

        for (let i = 0; i < size.length ; i++) {
          agregar = {
            title: "Celo nro: "+ (i+1),
            start: celos[i].fecha_i,
            color: this.colors.celos
          };
          this.fechasC.push(agregar);
        }
        this.agregarFechas(this.fechasC);
      },
      err =>{
        console.log(err);
      }
    )

    this.mascotaService.getVacunas(this.mascotaActual.id_mascota).subscribe( 
      vacunas => {
        const size = Object.keys(vacunas);//para obtener el tamaño del objeto celos
        let agregar: EventInput;

        for (let i = 0; i < size.length ; i++) {
          agregar = {
            title: vacunas[i].nombre,
            start: vacunas[i].fecha_i,
            end: vacunas[i].fecha_f,
            color: this.colors.vacunas
          };
          this.fechasV.push(agregar);
        }
        this.agregarFechas(this.fechasV);
    
      },
      err =>{
        console.log(err);
      }
    )
  }

  agregarFechas(fechas: EventInput[]) {
    this.calendarEvents = this.calendarEvents.concat(fechas);
  }

}
