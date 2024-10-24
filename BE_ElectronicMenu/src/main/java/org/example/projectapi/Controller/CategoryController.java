package org.example.projectapi.Controller;

import org.example.projectapi.Service.CategoryService;
import org.example.projectapi.dto.request.CategoryRequest;
import org.example.projectapi.dto.response.MessageRespone;
import org.example.projectapi.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategory() {
        return categoryService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.findCategoryId(id);
        return ResponseEntity.ok().body(category);
    }


    // Định nghĩa endpoint tạo Category
    @PostMapping
    public ResponseEntity<MessageRespone> createCategory(
            @RequestParam("name") String name,
            @RequestParam("image") MultipartFile image) {

        try {
            // Xử lý file hình ảnh
            String imageName = null;
            if (image != null && !image.isEmpty()) {
                String originalFilename = image.getOriginalFilename();
                String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
                String uniqueFilename = new Date().getTime() + fileExtension;
                String imagePath = "public/img/" + uniqueFilename;

                File uploadDirectory = new File("public/img");
                if (!uploadDirectory.exists()) {
                    uploadDirectory.mkdirs();
                }

                Files.copy(image.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING);
                imageName = uniqueFilename;
            }

            // Tạo Category mới
            Category category = new Category();
            category.setName(name);
            category.setImage(imageName);

            categoryService.save(category);

            return ResponseEntity.ok().body(new MessageRespone("Category created successfully"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageRespone("Error: " + e.getMessage()));
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<MessageRespone> updateCategory(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        Category category = categoryService.findCategoryId(id);
        if (category == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageRespone("Category not found"));
        }

        // Cập nhật tên
        category.setName(name);

        // Cập nhật ảnh nếu có
        if (image != null && !image.isEmpty()) {
            // Xóa ảnh cũ nếu có
            String oldImageName = category.getImage();
            if (oldImageName != null) {
                String oldImagePath = "public/img/" + oldImageName;
                File oldImageFile = new File(oldImagePath);
                if (oldImageFile.exists()) {
                    oldImageFile.delete();
                }
            }

            // Lưu ảnh mới
            String originalFilename = image.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFilename = new Date().getTime() + fileExtension;
            String newImagePath = "public/img/" + uniqueFilename;

            File uploadDirectory = new File("public/img");
            if (!uploadDirectory.exists()) {
                uploadDirectory.mkdirs();
            }

            try {
                Files.copy(image.getInputStream(), Paths.get(newImagePath), StandardCopyOption.REPLACE_EXISTING);
                category.setImage(uniqueFilename);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageRespone("Failed to save image"));
            }
        }

        categoryService.save(category);
        return ResponseEntity.ok().body(new MessageRespone("Category updated successfully"));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<MessageRespone> deleteCategory(@PathVariable Long id) {
        Category category = categoryService.findCategoryId(id);
        if (category != null) {
            // Xóa ảnh liên quan
            String imageName = category.getImage();
            if (imageName != null && !imageName.isEmpty()) {
                String imagePath = "public/img/" + imageName;
                File imageFile = new File(imagePath);
                if (imageFile.exists()) {
                    boolean deleted = imageFile.delete();
                    if (!deleted) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageRespone("Failed to delete image"));
                    }
                }
            }

            categoryService.deleteById(id);
            return ResponseEntity.ok().body(new MessageRespone("Category deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageRespone("Category not found"));
        }
    }



}