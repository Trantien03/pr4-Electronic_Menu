package org.example.projectapi.Controller;

import org.example.projectapi.Service.RestaurantTableService;
import org.example.projectapi.dto.response.MessageRespone;
import org.example.projectapi.model.RestaurantTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/restaurantTables")
public class RestaurantTableController {
    @Autowired
    private RestaurantTableService restaurantTableService;

    @GetMapping
    public List<RestaurantTable> getAllRestaurantTable() {
        return restaurantTableService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestaurantTable> getRestaurantTableById(@PathVariable Long id) {
        Optional<RestaurantTable> publisher = restaurantTableService.findById(id);
        if (publisher.isPresent()) {
            return ResponseEntity.ok(publisher.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public RestaurantTable createRestaurantTable(@RequestBody RestaurantTable publisher) {
        return restaurantTableService.save(publisher);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RestaurantTable> updateRestaurantTable(@PathVariable Long id, @RequestBody RestaurantTable restaurantTable) {
        Optional<RestaurantTable> table = restaurantTableService.findById(id);
        if (table.isPresent()) {
            RestaurantTable updatedTable = table.get();
            updatedTable.setNameTable(restaurantTable.getNameTable());
            updatedTable.setStatus(restaurantTable.getStatus());
            return ResponseEntity.ok(restaurantTableService.save(updatedTable));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageRespone> deleteRestaurantTable(@PathVariable Long id) {
        Optional<RestaurantTable> publisher = restaurantTableService.findById(id);
        if (publisher.isPresent()) {
            restaurantTableService.deleteById(id);
            return ResponseEntity.ok(new MessageRespone("Delete table successfully"));
        } else {
            return ResponseEntity.ok(new MessageRespone("Not found table"));
        }
    }
}
