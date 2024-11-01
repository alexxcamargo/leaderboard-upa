import { Component, OnInit } from '@angular/core';
import { GamificationService } from '../gamification.service';

interface Adolescent {
  id: number;
  name: string;
  birthdate: string;
  points: number;
  presences: number;
  correctAnswers: number;
  correctAnswersInput?: number; // Campo opcional para armazenar a quantidade de respostas corretas
  presenceDate?: string; // Campo opcional para a data da presença
}

@Component({
  selector: 'app-add-adolescent',
  templateUrl: './add-adolescent.component.html',
  styleUrls: ['./add-adolescent.component.sass']
})
export class AddAdolescentComponent implements OnInit {
  name: string = '';
  birthdate: string = '';
  filterText: string = '';
  loading: boolean = false;
  adolescents: Adolescent[] = [];

  constructor(private gamificationService: GamificationService) { }

  ngOnInit(): void {
    this.loadAdolescents();
  }

  loadAdolescents() {
    this.gamificationService.getAllAdolescents().subscribe(data => {
      this.adolescents = data;
      this.adolescents.forEach(adolescent => {
        adolescent.correctAnswersInput = 0; // Inicializa o campo de entrada para cada adolescente
        adolescent.presenceDate = ''; // Inicializa a data da presença para cada adolescente
      });
    });
  }

  addAdolescent() {
    this.loading = true;
    this.gamificationService.addAdolescent(this.name, this.birthdate).subscribe(adolescent => {
      adolescent.correctAnswers = 0;
      this.adolescents.push(adolescent);
      this.name = '';
      this.birthdate = '';
      this.loading = false;
    });
  }

  addPresencePoints(adolescent: Adolescent) {
    if (adolescent.presenceDate) {
      this.loading = true;
      this.gamificationService.registerPresence(adolescent.id, adolescent.presenceDate).subscribe({
        next: (response) => {
          // Sucesso: resposta recebida com sucesso
          this.loadAdolescents();
          setTimeout(() => this.loading = false, 2000);
        },
        error: (error) => {
          // Erro: trata diferentes tipos de erro com base no status ou mensagem
          if (error.status === 400 && error.error?.error === 'Presença já registrada para esta data.') {
            alert('A presença já foi registrada para esta data.');
          } else {
            alert('Ocorreu um erro ao registrar a presença. Tente novamente mais tarde.');
          }
          this.loading = false;
        }
      });
    }
  }

  addCorrectAnswerPoints(adolescent: Adolescent) {
    if (adolescent.correctAnswersInput && adolescent.correctAnswersInput > 0) {
      this.loading = true;
      this.gamificationService.registerCorrectAnswer(adolescent.id, adolescent.correctAnswersInput).subscribe(() => {
        this.loadAdolescents();
        setTimeout(() => this.loading = false, 2000);
      });
    }
  }

  filteredAdolescents() {
    return this.adolescents.filter(adolescent =>
      adolescent.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
