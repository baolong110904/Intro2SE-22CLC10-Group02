package com.g2.lls.domains;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.g2.lls.utils.security.SecurityUtil;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "posts")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Column(name = "author_id")
//    private Long authorId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;

    @Column(name = "title", nullable = false)
    @NotBlank(message = "Title is required")
    private String title;

    @Column(name = "slug", nullable = false, unique = true)
    @NotBlank(message = "Slug is required")
    private String slug;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "content", nullable = false)
    @NotBlank(message = "Content is required")
    private String content;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Comment> comments = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_by")
    private String updatedBy;

    @PrePersist
    public void handleBeforeCreate() {
        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent()
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";

        this.createdAt = Instant.now();
    }

    @PreUpdate
    public void handleBeforeUpdate() {
        this.updatedBy = SecurityUtil.getCurrentUserLogin().isPresent()
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";
        this.updatedAt = Instant.now();
    }

    @Column(name = "is_enabled", columnDefinition = "BIT(1) DEFAULT FALSE")
    private Boolean isEnabled;
}