package com.g2.lls.services.impl;

import com.g2.lls.domains.Course;
import com.g2.lls.domains.User;
import com.g2.lls.dtos.CourseDTO;
import com.g2.lls.dtos.CourseFilterDTO;
import com.g2.lls.dtos.response.CourseResponse;
import com.g2.lls.dtos.response.MaterialResponse;
import com.g2.lls.dtos.response.ThumbnailResponse;
import com.g2.lls.enums.RoleType;
import com.g2.lls.repositories.CourseRepository;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.services.RedisService;
import com.g2.lls.services.CourseService;
import com.g2.lls.services.UserService;
import com.g2.lls.utils.security.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
@Transactional
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final CloudinaryServiceImpl cloudinaryServiceImpl;
    private final UserServiceImpl userServiceImpl;
    private final RedisService redisService;
    private ModelMapper modelMapper;

    @Override
    public CourseResponse createCourse(CourseDTO courseDTO) throws Exception {

        Course course = modelMapper.map(courseDTO, Course.class);
        course.setIsEnabled(true);
        User currentUser = userService.fetchUserByEmail(SecurityUtil.getCurrentUserLogin().get());
        course.setTeacherId(currentUser.getId());
        courseRepository.save(course);
        CourseResponse courseResponse = modelMapper.map(course, CourseResponse.class);
        courseResponse.setFirstName(currentUser.getFirstName());
        courseResponse.setLastName(currentUser.getLastName());

        return courseResponse;
    }

    public CourseResponse convertToCourseResponse(Course course) throws Exception {
        CourseResponse courseResponse = modelMapper.map(course, CourseResponse.class);
        User teacher = userService.fetchUserById(course.getTeacherId());
        courseResponse.setFirstName(teacher.getFirstName());
        courseResponse.setLastName(teacher.getLastName());
        courseResponse.setNumStudent(course.getUsers().size());

        return courseResponse;
    }

    @Override
    public List<CourseResponse> getAllCourses(CourseFilterDTO courseFilterDTO) throws Exception {
        List<Course> courses = courseRepository.findAll(courseFilterDTO);
        List<CourseResponse> courseResponses = new ArrayList<>();
        for(Course course : courses) {
            courseResponses.add(convertToCourseResponse(course));
        }

        return  courseResponses;
    }

    @Override
    public CourseResponse getCourseById(Long id) throws Exception {
        Optional<Course> course = courseRepository.findById(id);

        if (course.isPresent()) {
            courseRepository.save(course.get());
            return convertToCourseResponse(course.get());
        }
        else {
            throw new Exception();
        }
    }

    @Override
    public void deleteCourse(Long id) throws Exception {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            Course updatedCourse = course.get();
            updatedCourse.setIsEnabled(false);
            courseRepository.save(updatedCourse);
        }
        else {
            throw new Exception();
        }
    }

    @Override
    public CourseResponse updateCourse(Long id, CourseDTO courseDTO) throws Exception {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
             Course currenCourse = course.get();

            Field[] courseDTOFields = courseDTO.getClass().getDeclaredFields();
            Field[] currenCourseFields = currenCourse.getClass().getDeclaredFields();

            for (Field courseField : currenCourseFields) {
                for (Field courseDTOField : courseDTOFields) {
                    if (courseDTOField.getName().equals(courseField.getName())) {
                        courseField.setAccessible(true);
                        courseDTOField.setAccessible(true);
                        if (courseDTOField.get(courseDTO) != null && courseDTOField.get(courseDTO) != "") {
                            courseField.set(currenCourse, courseDTOField.get(courseDTO));
                        }
                    }
                }
            }

             courseRepository.save(currenCourse);
             return convertToCourseResponse(course.get());
        }
        else {
            throw new Exception();
        }
    }

    @Override
    public List<CourseResponse> addStudent(List<Long> courseIds, String email, Long orderId) throws Exception {
        if (!redisService.checkOrder(orderId)){
            throw new Exception("Can not find this order or payment failed.");
        }

        List<Course> courses = courseRepository.findByIdIn(courseIds);
        User user = userServiceImpl.fetchUserByEmail(email);
        List<CourseResponse> courseResponses = new ArrayList<>();

        boolean flag = false;
        for (Course course : courses) {
            List<User> currentUsers = course.getUsers();
            if(!currentUsers.contains(user)) {
                flag = true;
                currentUsers.addLast(user);
                course.setUsers(currentUsers);
                courseRepository.save(course);
            }
            courseResponses.add(convertToCourseResponse(course));
        }
        if (flag) {
            redisService.deleteCart(user.getId());
            redisService.deleteOrder(orderId);
        }

        return courseResponses;
    }

    @Override
    public CourseResponse removeStudent(Long id, Long studentId) throws Exception {
        Optional<Course> course = courseRepository.findById(id);
        Optional<User> user = userRepository.findById(studentId);
        if (course.isPresent() && user.isPresent()) {
            Course currentCourse = course.get();
            List<User> currentUsers = currentCourse.getUsers();

            if(currentUsers.contains(user.get())) {
                currentUsers.remove(user.get());
                currentCourse.setUsers(currentUsers);
                courseRepository.save(currentCourse);
            }
            return convertToCourseResponse(course.get());
        }
        else {
            throw new Exception();
        }
    }

    @Override
    public MaterialResponse uploadMaterial(Long id, MultipartFile file) throws Exception {
        return cloudinaryServiceImpl.uploadMaterial(id, file);
    }

    @Override
    public ThumbnailResponse uploadThumbnailForCourse(Long id, MultipartFile file) throws Exception {
        return cloudinaryServiceImpl.updateThumbnail(id, file);
    }

    @Override
    public List<CourseResponse> getUserCourses(String email, String role) throws Exception {
        List<CourseResponse> courseResponses = new ArrayList<>();
        User user = userServiceImpl.fetchUserByEmail(email);

        if (RoleType.STUDENT.toString().equals(role)) {
            List<Course> courses = courseRepository.findAll();
            for (Course course : courses) {
                if(course.getUsers().contains(user)) {
                    courseResponses.add(convertToCourseResponse(course));
                }
            }
            return courseResponses;
        }
        else if (RoleType.TEACHER.toString().equals(role)) {
            List<Course> courses = courseRepository.findAll();
            for (Course course : courses) {
                if(course.getTeacherId().equals(user.getId())) {
                    courseResponses.add(convertToCourseResponse(course));
                }
            }
            return courseResponses;
        }

        return null;
    }
}
