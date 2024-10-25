package org.example.projectapi.Service;

import org.example.projectapi.Repository.NotificationRepository;
import org.example.projectapi.Repository.RestaurantTableRepository;
import org.example.projectapi.dto.request.NotificationRequest;
import org.example.projectapi.dto.response.MessageResponse;
import org.example.projectapi.enums.NotifiStatus;
import org.example.projectapi.model.Notification;
import org.example.projectapi.model.RestaurantTable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    private NotificationRepository notificationRepository;
    private RestaurantTableRepository restaurantTableRepository;

    public NotificationService(NotificationRepository notificationRepository, RestaurantTableRepository restaurantTableRepository) {
        this.notificationRepository = notificationRepository;
        this.restaurantTableRepository = restaurantTableRepository;
    }

    public List<Notification> getNotifications() {
        return notificationRepository.findAll();
    }

    public MessageResponse sendNotification(NotificationRequest notification) {
        Notification notificationEntity = new Notification();
        Optional<RestaurantTable> table =  restaurantTableRepository.findById(notification.getTableId());
        if (table.isPresent()) {
            notificationEntity.setRestaurantTable(table.get());
            notificationEntity.setMessage(notification.getMessage());
            notificationRepository.save(notificationEntity);
            return new MessageResponse("Successfully sent notification");
        }

        return new MessageResponse("Table not found");
    }


    public Optional<Notification> findNotificationById(long id) {
        return notificationRepository.findById(id);
    }

    public MessageResponse deleteNotification(long id) {
        notificationRepository.deleteById(id);
        return new MessageResponse("Successfully deleted notification");
    }

    public MessageResponse changeNotification(long id, NotifiStatus status) {
        Optional<Notification> optional = findNotificationById(id);
        if (optional.isPresent()) {
            Notification notificationEntity = optional.get();
            notificationEntity.setStatus(status);
            return new MessageResponse("Successfully changed notification");
        }
        return new MessageResponse("Notification not found");
    }




}
