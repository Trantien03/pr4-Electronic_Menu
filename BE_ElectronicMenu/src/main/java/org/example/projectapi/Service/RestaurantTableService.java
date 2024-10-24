package org.example.projectapi.Service;


import org.example.projectapi.Repository.RestaurantTableRepository;
import org.example.projectapi.model.RestaurantTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantTableService {
    @Autowired
    private RestaurantTableRepository restaurantTableRepository;

    public List<RestaurantTable> findAll() {
        return restaurantTableRepository.findAll();
    }

    public Optional<RestaurantTable> findById(Long id) {
        return restaurantTableRepository.findById(id);
    }

    public RestaurantTable save(RestaurantTable customer) {
        return restaurantTableRepository.save(customer);
    }

    public void deleteById(Long id) {
        restaurantTableRepository.deleteById(id);
    }
}
