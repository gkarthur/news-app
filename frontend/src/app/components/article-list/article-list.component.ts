import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];
  currentPage = 0;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  isAdmin = false;
  isEditor = false;
  loading = false;
  error: string | null = null;

  constructor(
    private articleService: ArticleService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.checkUserRoles();
    this.loadArticles();
  }

  private checkUserRoles(): void {
    const user = this.tokenStorageService.getUser();
    if (user && user.roles) {
      this.isAdmin = user.roles.includes('ROLE_ADMIN');
      this.isEditor = user.roles.includes('ROLE_EDITOR');
    }
  }

  loadArticles(): void {
    this.loading = true;
    this.error = null;
    
    this.articleService.getArticles(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.articles = response.articles;
          this.currentPage = response.currentPage;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading articles:', error);
          this.error = 'Failed to load articles. Please try again later.';
          this.loading = false;
        }
      });
  }

  deleteArticle(id: number): void {
    if (confirm('Are you sure you want to delete this article?')) {
      this.loading = true;
      this.error = null;
      this.articleService.deleteArticle(id)
        .subscribe({
          next: () => {
            this.loadArticles();
          },
          error: (error) => {
            console.error('Error deleting article:', error);
            this.error = 'Failed to delete article. Please try again later.';
            this.loading = false;
          }
        });
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadArticles();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadArticles();
    }
  }
}
