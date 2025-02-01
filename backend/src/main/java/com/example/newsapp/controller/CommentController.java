package com.example.newsapp.controller;

import com.example.newsapp.dto.CommentDTO;
import com.example.newsapp.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:4200")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<?> createComment(
            @RequestBody CommentDTO commentDTO,
            Authentication authentication) {
        try {
            CommentDTO createdComment = commentService.createComment(commentDTO, authentication.getName());
            Map<String, Object> response = new HashMap<>();
            response.put("comment", createdComment);
            response.put("message", "Comment created successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/article/{articleId}")
    public ResponseEntity<?> getCommentsByArticleId(@PathVariable Long articleId) {
        try {
            List<CommentDTO> comments = commentService.getCommentsByArticleId(articleId);
            Map<String, Object> response = new HashMap<>();
            response.put("comments", comments);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long commentId,
            Authentication authentication) {
        try {
            commentService.deleteComment(commentId, authentication.getName());
            Map<String, String> response = new HashMap<>();
            response.put("message", "Comment deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
