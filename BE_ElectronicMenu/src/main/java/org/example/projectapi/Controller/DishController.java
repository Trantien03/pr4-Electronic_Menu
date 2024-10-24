package org.example.projectapi.Controller;

import org.example.projectapi.Service.CategoryService;
import org.example.projectapi.Service.DishService;
import org.example.projectapi.dto.response.MessageRespone;
import org.example.projectapi.enums.StatusDish;
import org.example.projectapi.model.Category;
import org.example.projectapi.model.Dish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;

@RestController
@RequestMapping("/api/v1/dishes")
public class DishController {
    @Autowired
    private DishService dishService;
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<Page<Dish>> getFoods(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Dish> foods = dishService.getAllDish(pageable);
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dish> getFood(@PathVariable long id) {
        return ResponseEntity.ok(dishService.findById(id));
    }

    @PostMapping
    public ResponseEntity<?> createFood(
            @RequestParam("name") String name,
            @RequestParam("price") double price,
            @RequestParam("discount") double discount,
            @RequestParam("description") String description,
            @RequestParam("category_id") Long categoryId,
            @RequestParam("image") MultipartFile image) {

        try {
            // Xử lý file hình ảnh
            String imageName = null;
            if (image != null && !image.isEmpty()) {
                // Lưu file hình ảnh vào thư mục
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




            Category category = categoryService.findCategoryId(categoryId);
            if (category == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageRespone("Category not found"));
            }

            Dish newDish = new Dish();
            newDish.setName(name);
            newDish.setPrice(price);
            newDish.setDiscount(discount);
            newDish.setCategory(category);
            newDish.setDescription(description);
            newDish.setImage(imageName);

            Dish savedDish = dishService.save(newDish);



            return ResponseEntity.status(HttpStatus.CREATED).body(savedDish);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageRespone("Error: " + e.getMessage()));
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<MessageRespone> updateFood(@PathVariable Long id,
                                                     @RequestParam("name") String name,
                                                     @RequestParam("price") Double price,
                                                     @RequestParam(value = "image") MultipartFile image,
                                                     @RequestParam("description") String description,
                                                     @RequestParam("discount") double discount,
                                                     @RequestParam("status_dish") StatusDish statusDish,
                                                     @RequestParam("category_id") Long categoryId) {
        try {
            Dish updateDish = dishService.findById(id);
            if (updateDish != null){

                if (image != null) {
                    String oldImageName = updateDish.getImage();
                    if (oldImageName != null) {
                        String imagePath = "public/img/" + oldImageName;
                        File oldImageFile = new File(imagePath);
                        if (oldImageFile.exists()) {
                            oldImageFile.delete();
                        }
                    }

                    File uploadDirectory = new File("public/img");
                    if (!uploadDirectory.exists()) {
                        uploadDirectory.mkdirs();
                    }

                    String originalFilename = image.getOriginalFilename();
                    String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
                    String uniqueFilename = new Date().getTime() + fileExtension;

                    String newImagePath = "public/img/" + uniqueFilename;
                    Files.copy(
                            image.getInputStream(),
                            Paths.get(newImagePath),
                            StandardCopyOption.REPLACE_EXISTING
                    );
                    updateDish.setImage(uniqueFilename);
                }

                Category category = categoryService.findCategoryId(categoryId);
                if (category != null) {
                    updateDish.setCategory(category);
                }
                updateDish.setName(name);
                updateDish.setPrice(price);
                updateDish.setDiscount(discount);
                updateDish.setStatus(statusDish);
                updateDish.setDescription(description);
                dishService.update(updateDish);


                return ResponseEntity.ok().body(new MessageRespone("Updated successfully"));
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageRespone("Food not found"));

        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageRespone("Failed to update food: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageRespone> deleteDish(@PathVariable long id) {
        Dish dish = dishService.findById(id);
        if (dish != null) {
            // Xóa ảnh liên quan
            String imageName = dish.getImage();
            if (imageName != null) {
                File imageFile = new File("public/img/"  + imageName);
                if (imageFile.exists()) {
                    imageFile.delete();
                }
            }

            dishService.deleteById(id);
            return ResponseEntity.ok().body(new MessageRespone("Delete successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageRespone("Dish not found"));
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<MessageRespone> changeStatusDish(@PathVariable long id, @RequestParam StatusDish status) {
        Dish updateDish = dishService.findById(id);
        if (updateDish != null) {
            updateDish.setStatus(status);
            dishService.update(updateDish);
            return ResponseEntity.ok().body(new MessageRespone("Change status successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageRespone("Food not found"));
        }
    }

}
