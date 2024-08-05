import { Component, OnInit } from '@angular/core';
import { GamificationService } from '../gamification.service';

interface Adolescent {
  id: number;
  name: string;
  points: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass']
})
export class LeaderboardComponent implements OnInit {
  adolescents: Adolescent[] = [];

  constructor(private gamificationService: GamificationService) { }

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard() {
    this.gamificationService.getLeaderboard().subscribe(data => {
      this.adolescents = data;
    });
  }

  getPositionClass(index: number): string {
    switch (index) {
      case 0: return 'first';
      case 1: return 'second';
      case 2: return 'third';
      default: return '';
    }
  }
}
