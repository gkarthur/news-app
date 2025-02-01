import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: any = null;
  
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadArticle(id);
    });
  }

  private loadArticle(id: number): void {
    this.articleService.getArticle(id).subscribe({
      next: (data) => {
        this.article = data;
      },
      error: (error) => {
        console.error('Error loading article:', error);
      }
    });
  }
}
