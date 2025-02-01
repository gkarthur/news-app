import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

const API_URL = 'http://localhost:8080/api/comments';

export interface Comment {
  id: number;
  content: string;
  username: string;
  articleId: number;
  createdAt: Date;
}

export interface CommentResponse {
  comment?: Comment;
  comments?: Comment[];
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }

  getComments(articleId: number): Observable<Comment[]> {
    return this.http.get<CommentResponse>(`${API_URL}/article/${articleId}`)
      .pipe(
        map(response => response.comments || []),
        catchError(error => {
          console.error('Error fetching comments:', error);
          throw error;
        })
      );
  }

  createComment(content: string, articleId: number): Observable<Comment> {
    return this.http.post<CommentResponse>(API_URL, { content, articleId })
      .pipe(
        map(response => {
          if (!response.comment) {
            throw new Error('No comment data in response');
          }
          return response.comment;
        }),
        catchError(error => {
          console.error('Error creating comment:', error);
          throw error;
        })
      );
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<CommentResponse>(`${API_URL}/${id}`)
      .pipe(
        map(() => void 0),
        catchError(error => {
          console.error('Error deleting comment:', error);
          throw error;
        })
      );
  }
}
