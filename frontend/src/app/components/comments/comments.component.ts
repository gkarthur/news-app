import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Comment {
  id: number;
  content: string;
  username: string;
  articleId: number;
  createdAt: Date;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() articleId!: number;
  
  comments: Comment[] = [];
  commentForm: FormGroup;
  isLoggedIn = false;
  currentUser: any = null;
  loading = false;
  error: string | null = null;
  
  constructor(
    private commentService: CommentService,
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  ngOnInit(): void {
    this.loadComments();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorageService.getUser();
    }
  }

  loadComments(): void {
    this.loading = true;
    this.error = null;
    this.commentService.getComments(this.articleId)
      .subscribe({
        next: (comments) => {
          this.comments = comments;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading comments:', error);
          this.error = 'Failed to load comments. Please try again later.';
          this.loading = false;
        }
      });
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const content = this.commentForm.get('content')?.value;
      this.loading = true;
      this.error = null;

      this.commentService.createComment(content, this.articleId)
        .subscribe({
          next: (comment) => {
            this.comments.unshift(comment);
            this.commentForm.reset();
            this.loading = false;
          },
          error: (error) => {
            console.error('Error creating comment:', error);
            this.error = 'Failed to create comment. Please try again later.';
            this.loading = false;
          }
        });
    }
  }

  deleteComment(commentId: number): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.loading = true;
      this.error = null;
      this.commentService.deleteComment(commentId)
        .subscribe({
          next: () => {
            this.comments = this.comments.filter(c => c.id !== commentId);
            this.loading = false;
          },
          error: (error) => {
            console.error('Error deleting comment:', error);
            this.error = 'Failed to delete comment. Please try again later.';
            this.loading = false;
          }
        });
    }
  }

  canDeleteComment(comment: Comment): boolean {
    return this.isLoggedIn && 
           this.currentUser && 
           comment.username === this.currentUser.username;
  }
}
