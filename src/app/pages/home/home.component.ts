import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITask } from "./../../models/task.model"
//Libreria para trabajar con formularios reactivos
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //Se crea una variable que va a contener un array de tareas, siendo tareas una interfaz
  tasks_signal = signal<ITask[]>([])

  //Estado de filtro
  filter = signal<'all' | 'pending' | 'completed'>('all')
  tasksByFilter = computed(() => {
    const filter = this.filter()
    const tasks = this.tasks_signal()

    if (filter === 'pending') {
      return tasks.filter(task => !task.completed)
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed)
    }
    return tasks
  })

  //Manejador de formulario
  //Esta variable se encarga de validar que el campo no este vacio
  //Tambien permite agregar otros validadores como pattern, min, max, etc
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      //Validators.pattern('^(?=.*\S).+$')
    ]
  })

  //ESTA SECCION DE CODIGO FUNCIONA BIEN ASI, YA QUE SE EJECUTA PRIMERO
  //NGONINIT Y LUEGO EL CONSTRUCTOR

  //Este codigo se va a ejecutar cada vez que cambia algo del elemento
  constructor() {
    effect(() => {
      const tasks = this.tasks_signal()
      console.log(tasks)
      localStorage.setItem('tasks', JSON.stringify(tasks))
    })
  }

  ngOnInit() {
    const storage = localStorage.getItem('tasks')
    console.log('storage')
    if (storage) {
      const tasks = JSON.parse(storage)
      this.tasks_signal.set(tasks)
    }
  }
  //----------------------------------------------
  //Esta es la version alternativa del codigo de arriba
  /*

  injector = inject(Injector)

  ngOnInit() {
    const storage = localStorage.getItem('tasks')
    console.log('storage')
    if(storage){
      const tasks = JSON.parse(storage)
      this.tasks_signal.set(tasks)
    }
    this.trackTask()
  }

  trackTask(){
    effect(() => {
      const tasks = this.tasks_signal()
      console.log(tasks)
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, {injector: this.injector})
  }
  */
  //***************************************************** */
  //Esta es la funcion que se encarga de poner en blanco la casilla al presionar enter
  // y de agregar la tarea a la lista
  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim()
      if (value !== "") {
        this.addTask(value)
        this.newTaskCtrl.setValue('')
      }

    }
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    //Esta funcion lo que hace es volver a tomar la lista ya creada, replicarla y agregar al final el nuevo valor
    this.tasks_signal.update((tasks_signal) => [...tasks_signal, newTask]);
  }

  deleteTask(index: number) {
    this.tasks_signal.update((tasks_signal) => tasks_signal.filter((task) => task.id !== index))
  }

  updateTask(index: number) {
    this.tasks_signal.update((tasks_signal) => {
      return tasks_signal.map((task, position) => {
        if (task.id === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task
      })
    })
  }

  editTask(index: number) {
    //Linea para que no permita editar tareas ya realizadas.

    this.tasks_signal.update((tasks_signal) => {
      return tasks_signal.map((task) => {
        if (task.id === index && !task.completed) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        }
      })
    })
  }

  changeTask(index: number, event: Event) {
    const input = event.target as HTMLInputElement

    this.tasks_signal.update((tasks_signal) => {
      return tasks_signal.map((task) => {
        if (task.id === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task
      })
    })
  }
  //Aqui se indica que filter solo puede tomar uno de esos tres valores
  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter)
  }
}
