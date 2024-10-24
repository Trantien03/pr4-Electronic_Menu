package org.example.projectapi.Controller;

import org.example.projectapi.Service.NotificationService;
import org.example.projectapi.dto.request.NotificationRequest;
import org.example.projectapi.dto.response.MessageRespone;
import org.example.projectapi.enums.NotifiStatus;
import org.example.projectapi.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications() {
        List<Notification> list = notificationService.getNotifications();
        return ResponseEntity.ok(list);
    }


    @PostMapping()
    public ResponseEntity<MessageRespone> createNotification(@RequestBody NotificationRequest notification) {
        return ResponseEntity.ok(notificationService.sendNotification(notification));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<MessageRespone> updateNotification(@PathVariable long id, @RequestParam NotifiStatus status) {
        return ResponseEntity.ok(notificationService.changeNotification(id,status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageRespone> deleteNotification(@PathVariable long id) {
        return ResponseEntity.ok(notificationService.deleteNotification(id));
    }
}
