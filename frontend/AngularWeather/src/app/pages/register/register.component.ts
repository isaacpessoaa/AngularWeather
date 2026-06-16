import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirm = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    if (this.password !== this.confirm) {
      this.error = 'As senhas não coincidem';
      return;
    }

    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        this.success = 'Conta criada! Redirecionando...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => this.error = err.error?.message || 'Erro ao cadastrar'
    });
  }
}