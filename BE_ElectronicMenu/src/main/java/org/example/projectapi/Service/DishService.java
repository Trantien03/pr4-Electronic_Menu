package org.example.projectapi.Service;

import org.example.projectapi.Repository.DishRepository;
import org.example.projectapi.dto.request.DishRequest;
import org.example.projectapi.model.Dish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DishService {
    @Autowired
    private DishRepository dishRepository;

    public Page<Dish> getAllDish(Pageable pageable) {
        return dishRepository.findAll(pageable);
    }

    public Dish findById(Long id) {
        return dishRepository.findById(id).orElse(null);
    }

    public Dish save(Dish dish) {
        return dishRepository.save(dish);
    }

    public Dish update(Dish dish) {
        return dishRepository.save(dish);
    }
    public void deleteById(Long id) {
        dishRepository.deleteById(id);
    }

    public DishRequest toDishRequest(Dish dish) {
        DishRequest dishRequest = new DishRequest();
        dishRequest.setName(dish.getName());
        dishRequest.setPrice(dish.getPrice());
        dishRequest.setImage(dish.getImage());
        dishRequest.setCategoryId(dish.getCategory().getId());
        dishRequest.setStatus(dish.getStatus());
        dishRequest.setDiscount(dish.getDiscount());
        return dishRequest;
    }


}
