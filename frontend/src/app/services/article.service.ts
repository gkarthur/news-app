import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

const API_URL = 'http://localhost:8080/api/articles';

export interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    id: number;
    username: string;
  };
}

export interface ArticleResponse {
  articles: Article[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) { }

  getArticles(page: number, size: number): Observable<ArticleResponse> {
    return this.http.get<ArticleResponse>(`${API_URL}?page=${page}&size=${size}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching articles:', error);
          throw error;
        })
      );
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${API_URL}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching article ${id}:`, error);
          throw error;
        })
      );
  }

  createArticle(title: string, content: string): Observable<Article> {
    return this.http.post<Article>(API_URL, { title, content })
      .pipe(
        catchError(error => {
          console.error('Error creating article:', error);
          throw error;
        })
      );
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting article ${id}:`, error);
          throw error;
        })
      );
  }
}
