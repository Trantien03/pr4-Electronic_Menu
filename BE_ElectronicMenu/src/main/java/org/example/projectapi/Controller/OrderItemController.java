package org.example.projectapi.Controller;

import org.example.projectapi.Service.DishService;
import org.example.projectapi.Service.OrderItemService;
import org.example.projectapi.Service.OrderService;
import org.example.projectapi.dto.request.OrderItemRequest;
import org.example.projectapi.dto.response.MessageRespone;
import org.example.projectapi.dto.response.OrderItemResponse;
import org.example.projectapi.enums.StatusOrder;
import org.example.projectapi.model.Dish;
import org.example.projectapi.model.OrderItem;
import org.example.projectapi.model.Orders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/order_item")
public class OrderItemController {

    final OrderItemService orderItemService;
    final OrderService orderService;
    final DishService dishService;

    public OrderItemController(OrderItemService orderItemService,OrderService orderService,DishService dishService) {
        this.orderItemService = orderItemService;
        this.orderService = orderService;
        this.dishService = dishService;
    }


    @GetMapping("/{order_id}")
    public List<OrderItem> getOrderItem(@PathVariable long order_id) {
        return orderItemService.findByOrderId(order_id);
    }

    @GetMapping("/status")
    public List<OrderItem> getOrderItemStatus(@RequestParam StatusOrder statusOrder) {
        return orderItemService.findByOrderStatus(statusOrder);
    }

    @GetMapping
    public List<OrderItem> getOrderItems() {
        List<OrderItem> orderItems = orderItemService.findAll();
        return orderItems;
    }

//    @GetMapping("/{orderID}")
//    public List<OrderItemResponse> getOrderItems(@PathVariable long  orderID) {
//        List<OrderItemResponse> list =  new ArrayList<>();
//
//        Optional<Orders> orders = orderService.findById(orderID);
//        if (orders.isPresent()) {
//            for (OrderItem orderItem : orders.get().getOrderItems()) {
//                OrderItemResponse response = new OrderItemResponse();
//                response.setId(orderItem.getId());
//                response.setOrderBillNumber(orders.get().getBillNumber());
//                response.setDish(dishService.toDishRequest(orderItem.getDish()));
//                response.setQuantity(orderItem.getQuantity());
//                response.setPrice(orderItem.getPrice());
//
//                list.add(response);
//
//            }
//        }
//        return list;
//    }

//    @PostMapping("/{orderID}")
//    public ResponseEntity<OrderItemResponse> addOrderItem(@PathVariable long orderID, @RequestBody OrderItemRequest orderItemRequest) {
//        OrderItemResponse response = new OrderItemResponse();
//        OrderItem newOrderItem = new OrderItem();
//        Optional<Orders> orders = orderService.findById(orderID);
//        if (orders.isPresent()) {
//            Dish dish = dishService.findById(orderItemRequest.getDish_id());
//            Orders order = orders.get();
//            newOrderItem.setOrder(order);
//            newOrderItem.setQuantity(orderItemRequest.getQuantity());
//            newOrderItem.setPrice(orderItemRequest.getPrice());
//            newOrderItem.setDish(dish);
//            orderItemService.save(newOrderItem);
//
//            response.setOrderBillNumber(orders.get().getBillNumber());
//            response.setDish(dishService.toDishRequest(newOrderItem.getDish()));
//            response.setQuantity(newOrderItem.getQuantity());
//            response.setPrice(newOrderItem.getPrice());
//            return ResponseEntity.ok().body(response);
//        }
//        return ResponseEntity.notFound().build();
//
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageRespone> deleteOrderItem(@PathVariable long id) {
        Optional<OrderItem> orderItem = orderItemService.findById(id);
        if (orderItem.isPresent()) {
            orderItemService.delete(orderItem.get());
            return ResponseEntity.ok(new MessageRespone("Order item deleted successfully"));
        }
        return ResponseEntity.notFound().build();

    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateOrderItem(@PathVariable long id, @RequestParam int quantity) {
        Optional<OrderItem> orderItem = orderItemService.findById(id);
        if (orderItem.isPresent()) {
            orderItem.get().setQuantity(quantity);
            return ResponseEntity.ok().body(orderItemService.save(orderItem.get()));
        }
        return ResponseEntity.notFound().build();
    }



}
