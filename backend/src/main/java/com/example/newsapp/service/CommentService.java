package com.example.newsapp.service;

import com.example.newsapp.dto.CommentDTO;
import com.example.newsapp.model.Article;
import com.example.newsapp.model.Comment;
import com.example.newsapp.model.User;
import com.example.newsapp.repository.ArticleRepository;
import com.example.newsapp.repository.CommentRepository;
import com.example.newsapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public CommentDTO createComment(CommentDTO commentDTO, String username) {
        try {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Article article = articleRepository.findById(commentDTO.getArticleId())
                    .orElseThrow(() -> new RuntimeException("Article not found"));

            Comment comment = new Comment();
            comment.setContent(commentDTO.getContent());
            comment.setArticle(article);
            comment.setUser(user);

            Comment savedComment = commentRepository.save(comment);
            return convertToDTO(savedComment);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create comment: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public List<CommentDTO> getCommentsByArticleId(Long articleId) {
        try {
            return commentRepository.findByArticleIdOrderByCreatedAtDesc(articleId)
                    .stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch comments: " + e.getMessage());
        }
    }

    @Transactional
    public void deleteComment(Long commentId, String username) {
        try {
            Comment comment = commentRepository.findById(commentId)
                    .orElseThrow(() -> new RuntimeException("Comment not found"));

            if (!comment.getUser().getUsername().equals(username)) {
                throw new RuntimeException("You can only delete your own comments");
            }

            commentRepository.delete(comment);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete comment: " + e.getMessage());
        }
    }

    private CommentDTO convertToDTO(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setArticleId(comment.getArticle().getId());
        dto.setUsername(comment.getUser().getUsername());
        dto.setCreatedAt(comment.getCreatedAt());
        return dto;
    }
}
