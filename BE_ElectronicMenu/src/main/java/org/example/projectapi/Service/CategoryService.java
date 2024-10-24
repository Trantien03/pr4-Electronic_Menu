package org.example.projectapi.Service;

import org.example.projectapi.Repository.CategoryRepository;
import org.example.projectapi.model.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findCategoryId(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public Category save(Category customer) {
        return categoryRepository.save(customer);
    }

    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }
}
