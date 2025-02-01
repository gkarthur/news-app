package com.example.newsapp.repository;

import com.example.newsapp.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByArticleIdOrderByCreatedAtDesc(Long articleId);
    List<Comment> findByUserIdOrderByCreatedAtDesc(Long userId);
}
