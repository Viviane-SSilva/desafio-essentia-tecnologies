import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Login</h1>
        <form (ngSubmit)="onLogin()" class="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email"
              [(ngModel)]="loginData.email" 
              name="email"
              placeholder="Digite seu email"
              class="form-input"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="password">Senha</label>
            <input 
              type="password" 
              id="password"
              [(ngModel)]="loginData.password" 
              name="password"
              placeholder="Digite sua senha"
              class="form-input"
              required
            />
          </div>
          
          <button 
            type="submit" 
            class="auth-button"
            [disabled]="!loginData.email || !loginData.password"
          >
            Entrar
          </button>
          
          <div class="auth-link">
            <p>Não tem uma conta? 
              <a (click)="goToRegister()" class="link">Registre-se</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      background: #1a1a1a;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .auth-card {
      background: #2a2a2a;
      border-radius: 12px;
      padding: 40px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .auth-title {
      color: #fff;
      font-size: 28px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 30px;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      color: #ccc;
      font-size: 14px;
      font-weight: 500;
    }

    .form-input {
      background: #333;
      border: 1px solid #555;
      border-radius: 8px;
      padding: 12px 16px;
      color: #fff;
      font-size: 16px;
      transition: border-color 0.3s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: #ffd700;
    }

    .form-input::placeholder {
      color: #888;
    }

    .auth-button {
      background: #ffd700;
      color: #1a1a1a;
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 10px;
    }

    .auth-button:hover:not(:disabled) {
      background: #ffed4e;
      transform: translateY(-1px);
    }

    .auth-button:disabled {
      background: #666;
      color: #999;
      cursor: not-allowed;
      transform: none;
    }

    .auth-link {
      text-align: center;
      margin-top: 20px;
    }

    .auth-link p {
      color: #ccc;
      font-size: 14px;
    }

    .link {
      color: #ffd700;
      cursor: pointer;
      text-decoration: none;
      font-weight: 500;
    }

    .link:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/todos']);
    }
  }

  onLogin() {
    if (this.loginData.email && this.loginData.password) {
      this.authService.login(this.loginData).subscribe({
        next: (response) => {
          console.log('Login realizado com sucesso:', response);
          this.router.navigate(['/todos']);
        },
        error: (error) => {
          console.error('Erro no login:', error);
          // TODO: Mostrar mensagem de erro para o usuário
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

