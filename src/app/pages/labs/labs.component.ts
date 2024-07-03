import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
//Libreria para trabajar con formularios reactivos
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  Lastname = signal('Chavarria');
  name = "Mario"
  age = 25;
  img = 'https://w3schools.com/howto/img_avatar.png';
  disable = true;

  //Private variables can't be accessed from the template
  private phone = "1234567890";

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
    const input = event.target as HTMLInputElement;
    this.Lastname.set(input.value); //Forma de asignar un nuevo valor a una variable con Signal
  }

  //Se ejecuta cuando se presiona una tecla
  keyDownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  /* La principal diferencia entre un change y un keyboard event es que en los 
    input de tipo texto el change no se actualiza hasta que se presiona ENTER
    y el keyboard event se actualiza conforme de presionan las teclas  */

  tasks_signal = signal([
    'Instalar Angular CLI',
    'Crear nuevo proyecto',
    'Crear componentes',
  ]);

  persona_signal = signal({
    name: 'Jose',
    age: 17,
    img: 'https://w3schools.com/howto/img_avatar.png',
    phone: '1234567890'
  })

  //Asi se declara el formulario reactivo
  colorCtrl = new FormControl()
  //Controlador que permite manejar el ancho de los objetos
  widthCtrl = new FormControl(50, {
    nonNullable: true,
  })

  nameCtrl = new FormControl('prueba', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  })

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value)
    })
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value
    this.persona_signal.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue, 10)
      }
    })
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value
    this.persona_signal.update(prevState => {
      return {
        ...prevState,
        name: newValue
      }
    })
  }
}