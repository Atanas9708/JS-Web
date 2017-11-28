import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  public displayImage: boolean = false;
  public hide: boolean = false;
  public imageText: string = 'Show Image';
  public limit: number = 250;


  @Input() article;
  @Output() deleteArticleEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  limitDesc(text): string {
    return text.slice(0, this.limit);
  }

  showHideImage(): void {
    if (this.imageText === 'Show Image') {
      this.displayImage = true;
      this.imageText = 'Hide Image';
    } else if (this.imageText === 'Hide Image') {
      this.displayImage = false;
      this.imageText = 'Show Image';
    }
  }

  readMore(): void {
    if (this.limit >= this.article.text.length) {
      this.hide = true;
    }
    this.limit += 250;
  }

  hideDesc(): void {
    this.hide = false;
    this.limit = 250;
  }

  deleteArticle(id): void {
    this.deleteArticleEmitter.emit(id);
  }

}
