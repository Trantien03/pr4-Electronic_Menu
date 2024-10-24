package org.example.projectapi.Service;

import org.example.projectapi.Repository.OrderItemRepository;
import org.example.projectapi.dto.request.OrderItemRequest;
import org.example.projectapi.dto.response.OrderItemResponse;
import org.example.projectapi.dto.response.OrderResponse;
import org.example.projectapi.enums.StatusOrder;
import org.example.projectapi.model.Dish;
import org.example.projectapi.model.OrderItem;
import org.example.projectapi.model.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ListIterator;
import java.util.Optional;

@Service
public class OrderItemService {
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private DishService dishService;

    public List<OrderItem> findAll() {
        return orderItemRepository.findAll();
    }

    public List<OrderItem> findByOrderId(long orderId) {
        return orderItemRepository.findOrderItemsByOrderId(orderId);
    }

    public List<OrderItem> findByOrderStatus(StatusOrder statusOrder) {
        return orderItemRepository.findByOrderStatus(statusOrder);
    }

    public void delete(long orderId) {
        orderItemRepository.deleteOrderItemsByOrderId(orderId);
    }

    public OrderItem save(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public void delete(OrderItem orderItem) {
        orderItemRepository.delete(orderItem);
    }

    public Optional<OrderItem> findById(long id) {
        return orderItemRepository.findById(id);
    }

    public OrderItemResponse toOrderItemResponse(OrderItem orderItem) {
        OrderItemResponse itemResponse = new OrderItemResponse();
        itemResponse.setId(orderItem.getId());
        itemResponse.setDish(orderItem.getDish());
        itemResponse.setQuantity(orderItem.getQuantity());
        itemResponse.setPrice(orderItem.getPrice());
        itemResponse.setNote(orderItem.getNote());
        return itemResponse;
    }


    public boolean checkDiscount(Dish dish){
        if (dish.getDiscount() !=0  ){
            return true;
        }
        return false;
    }


    public void addOrderItem( OrderItemRequest o, Orders orders){
        OrderItem orderItem = new OrderItem();

        Dish dish = dishService.findById(o.getDish_id());
        if (dish!=null){
            orderItem.setDish(dish);
            orderItem.setQuantity(o.getQuantity());
            orderItem.setNote(o.getNote());
            if (checkDiscount(dish)){
                orderItem.setPrice(o.getQuantity() * (dish.getPrice() - dish.getPrice() * dish.getDiscount() / 100));
            }else {
                orderItem.setPrice(dish.getPrice()*o.getQuantity());
            }
            orderItem.setOrder(orders);
            save(orderItem);
        }
    }
}
