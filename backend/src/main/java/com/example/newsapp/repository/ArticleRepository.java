package com.example.newsapp.repository;

import com.example.newsapp.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
