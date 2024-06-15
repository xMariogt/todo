import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  tasks = [
    'Instalar Angular CLI',
    'Crear nuevo proyecto',
    'Crear componentes',
  ];

  //Variables public for the template
  name = 'Mario';
  age = 25;
  img = 'https://w3schools.com/howto/img_avatar.png';
  disable = true;

  //Private variables can't be accessed from the template
  private phone= "1234567890";

  //Object
  person = {
    name: 'Mario',
    age: 25,
    img: 'https://w3schools.com/howto/img_avatar.png',
    phone: '1234567890'
  };

  clickHandler() {
    alert('Hello World!');
  }

  //Se ejecuta cuando el input cambia
  changeHandler(event: Event) {
    console.log(event);
  }

  //Se ejecuta cuando se presiona una tecla
  keyDownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  /* La principal diferencia entre un change y un keyboard event es que en los 
    input de tipo texto el change no se actualiza hasta que se presiona ENTER
    y el keyboard event se actualiza conforme de presionan las teclas  */
}
