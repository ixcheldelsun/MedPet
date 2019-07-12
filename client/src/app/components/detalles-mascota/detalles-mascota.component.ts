import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { MascotasService } from '../../services/mascotas.service';
import { UsuariosService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service'

import { Mascota } from 'src/app/models/mascota';
import { UserDetails } from 'src/app/models/usuario';


/**
 * Componente
 */
@Component({
  selector: 'app-detalles-mascota',
  templateUrl: './detalles-mascota.component.html',
  styleUrls: ['./detalles-mascota.component.css']
})
export class DetallesMascotaComponent implements OnInit {
/**
 * Declaracion de mascotaActual
 */
  mascotaActual: Mascota;
  usuarioActual: number;
  mascotasUsuario: any;
  cantMascotas: number;
  details: UserDetails;
  formMascota: FormGroup;
  subida: boolean;
  foto: string;

  // Atributos  subir imagen a Firebase Storage//
  //Task principal
  task: AngularFireUploadTask;
  path: string;

  //Monitoreo del proceso
  percentage: Observable<number>;
  snapshot: Observable<any>;

  //URL imagen
  downloadURL: Observable<string>;
  url: string;

  //Estado del dropzone para la imagen
  isHovering: boolean;
  //-------------------------------------------//

  nombreM = new FormControl('', Validators.required);
  apodoM = new FormControl('', Validators.required);
  especieM = new FormControl('', Validators.required);
  razaM = new FormControl('', Validators.required);
  sexoM = new FormControl('', Validators.required);
  fechaM = new FormControl('', Validators.required);

  /**
 * constructor
 */
  constructor(private mascotaService: MascotasService, private storage: AngularFireStorage, private auth: AuthService, private usuarioService: UsuariosService, private router: Router, fb: FormBuilder) {

    this.formMascota = fb.group({
      nombreM: this.nombreM,
      apodoM: this.apodoM,
      especieM: this.especieM,
      razaM: this.razaM,
      sexoM: this.sexoM,
      fechaM: this.fechaM,
    });
   }

/**
 * ngOnInit
 */
  ngOnInit() {
    this.mascotaActual = this.mascotaService.mascotaActual;

    if(!this.mascotaActual) {
      this.router.navigateByUrl('/escoger-mascota')
    }

    this.auth.profile().subscribe(
      user => {
        this.details = user
        this.usuarioActual = this.details.id_usuario
        this.usuarioService.getMascotas(this.usuarioActual).subscribe(
          mascotas => {
            this.mascotasUsuario = mascotas;
            this.cantMascotas = Object.keys(this.mascotasUsuario).length;
            this.path = `usuario_id_${this.usuarioActual}/mascota_${this.cantMascotas + 1}`;
          },
          err => {
            console.log(err);
          }
        )
      },
      err => {
        console.log(err)
      }
    )
    if(this.mascotaActual){
      this.foto = this.mascotaActual.foto;
    }
    this.downloadURL = undefined;
    this.url = undefined;
    this.task = undefined;
    this.path = undefined;
    this.subida = false;

    this.formMascota.patchValue({
      nombreM: this.mascotaActual.nombre,
      apodoM: this.mascotaActual.apodo,
      especieM: this.mascotaActual.especie,
      razaM: this.mascotaActual.raza,
      sexoM: this.mascotaActual.sexo,
      fechaM: this.mascotaActual.fecha_nacimiento,
    })
    
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // El objeto de la imagen a subir
    const file = event.item(0)

    // Validación de la imagen
    if (file.type.split('/')[0] !== 'image') {
      console.error('Tipo de archivo no es compatible :( ')
      return;
    }

    // Task principal
    this.task = this.storage.upload(this.path, file)

    // Monitoreo del proceso
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges()

    // El URL de la imagen
    this.snapshot.pipe(finalize(() => {
      this.downloadURL = this.storage.ref(this.path).getDownloadURL()
    }))
      .subscribe();
  }

  // Determina si está activa la función de upload
  isActive(snapshot: any) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  getImagenUrl(url: string) {
    this.url = url;
    this.foto = this.url;
  }

  editar() {

    if(this.url){
      this.snapshot.pipe(finalize(() => {
        const URL = this.storage.ref(this.path).getDownloadURL().pipe.toString()
      }))
      .subscribe();

      const editada: Mascota = {
        id_mascota: this.mascotaActual.id_mascota,
        nombre: this.formMascota.value.nombreM.toString(),
        apodo: this.formMascota.value.apodoM.toString(),
        especie: this.formMascota.value.especieM.toString(),
        raza: this.formMascota.value.razaM.toString(),
        sexo: this.formMascota.value.sexoM.toString(),
        fecha_nacimiento: this.formMascota.value.fechaM,
        foto: this.url,
        id_usuario: this.usuarioActual
      }

      this.mascotaService.editMascota(editada)
      .subscribe(
        res => {
          this.mascotaService.setMascotaActual(editada);
          Swal.fire({
            type: 'success',
            title: `Edición exitosa`,
            text: `Editaste los datos del perfil de ${editada.nombre}`,
            backdrop: 'rgba(57, 207, 60, 0.48)'
          })
          this.ngOnInit();
        },
        err => console.error(err)
      );
    }
    else{
      const editada: Mascota = {
        id_mascota: this.mascotaActual.id_mascota,
        nombre: this.formMascota.value.nombreM.toString(),
        apodo: this.formMascota.value.apodoM.toString(),
        especie: this.formMascota.value.especieM.toString(),
        raza: this.formMascota.value.razaM.toString(),
        sexo: this.formMascota.value.sexoM.toString(),
        fecha_nacimiento: this.formMascota.value.fechaM,
        foto: this.mascotaActual.foto,
        id_usuario: this.usuarioActual
      }

      this.mascotaService.editMascota(editada)
      .subscribe(
        res => {
          this.mascotaService.setMascotaActual(editada);
          Swal.fire({
            type: 'success',
            title: `Edición exitosa`,
            text: `Editaste los datos del perfil de ${editada.nombre}`,
            backdrop: 'rgba(57, 207, 60, 0.48)'
          })
          this.ngOnInit();
        },
        err => console.error(err)
      );
    }

  }


}
