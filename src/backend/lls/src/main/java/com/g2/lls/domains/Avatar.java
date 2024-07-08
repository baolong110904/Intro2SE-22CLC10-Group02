package com.g2.lls.domains;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "avatars")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Avatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "public_id")
    private String publicId;

    @Column(name = "image_url")
    private String imageUrl;

    @Override
    public String toString() {
        return imageUrl;
    }

    @Column(name = "user_id")
    private Long userId;
}
