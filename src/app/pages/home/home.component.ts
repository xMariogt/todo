import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from "./../../models/task.model"

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks_signal = signal<Task[]>([
    {
      id: Date.now(),
      title: "Crear Proyecto",
      completed: false
    },
    {
      id: Date.now(),
      title: "Crear Componentes",
      completed: false
    }
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement
    const newTask = input.value
    this.addTask(newTask)
  }

  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    //Esta funcion lo que hace es volver a tomar la lista ya creada, replicarla y agregar al final el nuevo valor
    this.tasks_signal.update((tasks_signal) => [...tasks_signal, newTask]); 
  }

  deleteTask(index: number){
    this.tasks_signal.update((tasks_signal) => tasks_signal.filter((tasks_signal, position) => position !== index))
  }
}
