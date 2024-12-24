import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordsService } from './words.service';

@Component({
  selector: 'app-words-list',
  imports: [],
  templateUrl: './words-list.component.html',
  styleUrl: './words-list.component.css',
})
export class WordsListComponent implements OnInit {
  letter: string | null = null;
  words: { word: string; emoji: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private wordsService: WordsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      this.letter = params['letter'];
      if (this.letter) {
        this.words = await this.wordsService.getWordsForLetter(this.letter);
      }
    });
  }
}
