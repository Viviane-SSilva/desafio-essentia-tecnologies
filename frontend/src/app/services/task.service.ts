import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/task.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://192.168.1.9:3000'; // URL da sua API
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  getTasks(): Observable<Task[]> {
    this.loadTasks();
    return this.tasksSubject.asObservable();
  }

  private async loadTasks(): Promise<void> {
    try {
      const headers = this.getHeaders();
      const response = await this.http.get<Task[]>(`${this.apiUrl}/get-task`, { headers }).toPromise();
      if (response) {
        this.tasksSubject.next(response);
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  }

  async addTask(title: string): Promise<void> {
    try {
      const headers = this.getHeaders();
      const newTask = { title, description: '' };
      const response = await this.http.post<Task>(`${this.apiUrl}/create-task`, newTask, { headers }).toPromise();
      
      if (response) {
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next([...currentTasks, response]);
      }
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<void> {
    try {
      const headers = this.getHeaders();
      const response = await this.http.put(`${this.apiUrl}/put-task`, 
        { title: updates.title, id }, 
        { headers }
      ).toPromise();

      if (response) {
        const currentTasks = this.tasksSubject.value;
        const updatedTasks = currentTasks.map(task => 
          task.id === id ? { ...task, ...updates } : task
        );
        this.tasksSubject.next(updatedTasks);
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      const headers = this.getHeaders();
      const response = await this.http.delete(`${this.apiUrl}/task/${id}`, { headers }).toPromise();
      
      if (response) {
        const currentTasks = this.tasksSubject.value;
        const filteredTasks = currentTasks.filter(task => task.id !== id);
        this.tasksSubject.next(filteredTasks);
      }
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  }

  async toggleTask(id: number): Promise<void> {
    try {
      const headers = this.getHeaders();
      const currentTask = this.tasksSubject.value.find(task => task.id === id);
      if (!currentTask) return;

      const completed = !currentTask.completed;
      const response = await this.http.put(`${this.apiUrl}/completed-task`, 
        { completed, id }, 
        { headers }
      ).toPromise();

      if (response) {
        const currentTasks = this.tasksSubject.value;
        const updatedTasks = currentTasks.map(task => 
          task.id === id ? { ...task, completed } : task
        );
        this.tasksSubject.next(updatedTasks);
      }
    } catch (error) {
      console.error('Erro ao alterar status da tarefa:', error);
    }
  }
}

