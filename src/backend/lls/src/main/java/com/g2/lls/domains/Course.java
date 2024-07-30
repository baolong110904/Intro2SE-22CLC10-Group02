//package com.g2.lls.domains;
//
//import com.g2.lls.utils.security.SecurityUtil;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.time.Instant;
//import java.util.Set;
//
//@Entity
//@Table(name = "courses")
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//public class Course {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false, columnDefinition = "TEXT")
//    private String name;
//
//    @Column(columnDefinition = "TEXT")
//    private String description;
//
//    // meeting room id
//    @Column(name = "meeting_room_id")
//    private String meetingRoomId;
//
//    @Column(name = "start_date")
//    private String startDate;
//
//    // references documents
//    @Column(name = "document_id")
//    private String documentId;
//
//    // created by user
//    @Column(name = "user_id")
//    private Long userId;
//
//    // students who are in the course
//    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
//    Set<User> users;
//
//    @Column(name = "is_enabled", columnDefinition = "BIT(1) DEFAULT FALSE")
//    private Boolean isEnabled;;
//
//    @Column(name = "created_at")
//    private Instant createdAt;
//
//    @Column(name = "updated_at")
//    private Instant updatedAt;
//
//    @Column(name = "created_by")
//    private String createdBy;
//
//    @Column(name = "updated_by")
//    private String updatedBy;
//
//    @PrePersist
//    public void handleBeforeCreate() {
//        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent()
//                ? SecurityUtil.getCurrentUserLogin().get()
//                : "";
//
//        this.createdAt = Instant.now();
//    }
//
//    @PreUpdate
//    public void handleBeforeUpdate() {
//        this.updatedBy = SecurityUtil.getCurrentUserLogin().isPresent()
//                ? SecurityUtil.getCurrentUserLogin().get()
//                : "";
//
//        this.updatedAt = Instant.now();
//    }
//}
