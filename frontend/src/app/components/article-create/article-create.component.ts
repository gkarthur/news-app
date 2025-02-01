import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent {
  form: any = {
    title: null,
    content: null
  };
  isSuccessful = false;
  errorMessage = '';

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  onSubmit(): void {
    const { title, content } = this.form;

    this.articleService.createArticle(title, content).subscribe({
      next: () => {
        this.isSuccessful = true;
        setTimeout(() => {
          this.router.navigate(['/articles']);
        }, 2000);
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }
}
