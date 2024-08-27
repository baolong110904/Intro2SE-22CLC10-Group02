package com.g2.lls.domains;

import com.g2.lls.events.listener.CourseListener;
import com.g2.lls.utils.security.SecurityUtil;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "courses")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(CourseListener.class)
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String language;

    @Column
    private Long rating;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String title;

    @Column(name = "sub_category", nullable = false, columnDefinition = "TEXT")
    private String subCategory;

    @Column(columnDefinition = "TEXT")
    private String description;

    // meeting room id
    @Column(name = "meeting_room_id")
    private String meetingRoomId;

    @Column(name = "start_date")
    private String startDate;

    // references documents
    @Column(name = "document_id")
    private String documentId;

    @Column(name = "price")
    private Long price;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Material> materials;

    // created by user
    @Column(name = "teacher_id")
    private Long teacherId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "level_id")
    private Level level;

    // students who are in the course
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "courses_users",
               joinColumns = @JoinColumn(name = "course_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private List<User> users;

    @ManyToOne
    @JoinColumn(name = "thumbnail_id")
    private Thumbnail thumbnail;

    @Column(name = "is_enabled", columnDefinition = "BIT(1) DEFAULT FALSE")
    private Boolean isEnabled;

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
}
