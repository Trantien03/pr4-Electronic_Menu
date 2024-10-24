package org.example.projectapi.Controller;

import org.example.projectapi.Service.EventService;
import org.example.projectapi.dto.request.EventRequest;
import org.example.projectapi.dto.response.MessageRespone;
import org.example.projectapi.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Event> getAllCoupon() {
        return eventService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getCouponById(@PathVariable Long id) {
        Optional<Event> publisher = eventService.findById(id);
        return publisher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createCoupon(@RequestBody EventRequest eventRequest) {
        Event newEvent = new Event();

        newEvent.setName(eventRequest.getName());
        newEvent.setDiscount(eventRequest.getDiscount());
        newEvent.setStartDay(eventRequest.getStartDay());
        newEvent.setEndDay(eventRequest.getEndDay());
        Optional<Event> event = eventService.findActiveEvent(newEvent.getStartDay());
        if (event.isPresent()) {
            return ResponseEntity.badRequest().body("Ngày bắt đầu đang có sự kiện diễn ra");
        }
        Optional<Event> event2 = eventService.findActiveEvent(newEvent.getEndDay());
        if (event2.isPresent()) {
            return ResponseEntity.badRequest().body("Ngày kết thúc đang có sự kiện diễn ra");
        }

        if (eventService.checkEventStartDayAndEndDay(newEvent.getStartDay(), newEvent.getEndDay())) {
            return ResponseEntity.badRequest().body("Trùng");
        }
        return ResponseEntity.ok(eventService.save(newEvent));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> updateCoupon(@PathVariable Long id, @RequestBody EventRequest eventRequest) {
        Optional<Event> couponOptional = eventService.findById(id);
        if (couponOptional.isPresent()) {
            Event couponUpdate = couponOptional.get();
            couponUpdate.setName(eventRequest.getName());
            couponUpdate.setDiscount(eventRequest.getDiscount());
            couponUpdate.setStartDay(eventRequest.getStartDay());
            couponUpdate.setEndDay(eventRequest.getEndDay());
            return ResponseEntity.ok(eventService.save(couponUpdate));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageRespone> deleteCoupon(@PathVariable Long id) {
        Optional<Event> publisher = eventService.findById(id);
        if (publisher.isPresent()) {
            eventService.deleteById(id);
            return ResponseEntity.ok(new MessageRespone("Coupon deleted successfully"));
        } else {
            return ResponseEntity.ok(new MessageRespone("Coupon could not be deleted"));
        }
    }
}
