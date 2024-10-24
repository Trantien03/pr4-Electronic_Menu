package org.example.projectapi.Controller;

import jakarta.validation.Valid;
import org.example.projectapi.Service.*;
import org.example.projectapi.dto.request.OrderItemRequest;
import org.example.projectapi.dto.request.OrderRequest;
import org.example.projectapi.dto.response.MessageRespone;
import org.example.projectapi.dto.response.OrderResponse;
import org.example.projectapi.enums.OrderType;
import org.example.projectapi.enums.PaymentMethod;
import org.example.projectapi.enums.StatusOrder;
import org.example.projectapi.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;
    private final RestaurantTableService restaurantTableService;
    private final EventService eventService;
    private final DishService dishService;
    private final OrderItemService orderItemService;

    public OrderController(OrderService orderService,
                           RestaurantTableService restaurantTableService,
                           EventService eventService,
                           OrderItemService orderItemService,
                           DishService dishService
                           ) {
        this.orderService = orderService;
        this.restaurantTableService = restaurantTableService;
        this.eventService = eventService;
        this.orderItemService = orderItemService;
        this.dishService = dishService;
    }


    @GetMapping
    public ResponseEntity<Page<Orders>> getAllOrders(Pageable pageable) {
        Page<Orders> orders = orderService.findAll(pageable);
        return ResponseEntity.ok(orders);
    }


    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrdersById(@PathVariable Long id) {
        Optional<Orders> orders = orderService.findById(id);
        if (orders.isPresent()) {
            return ResponseEntity.ok(orderService.toOrderResponse(orders.get()));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{tableId}")
    public ResponseEntity<?> createOrdersDine(@PathVariable long tableId, @RequestBody OrderRequest orderRequest) {

        Optional<RestaurantTable> table = restaurantTableService.findById(tableId);

        if (table.isPresent() ) {
            Orders newOrder = new Orders();

            newOrder.setRestaurantTable(table.get());
                newOrder.setCustomer(orderRequest.getCustomer());

                double totalDiscount= eventService.applyEventDiscount(orderRequest);

                newOrder.setBillNumber(orderService.createNextBillNumber());
                newOrder.setPayment(orderRequest.getPayment());
                newOrder.setType(OrderType.Dine_in);
                newOrder.setOriginalPrice(orderRequest.getOriginalPrice());
                newOrder.setTotalDiscount(totalDiscount);
                newOrder.setTotalPrice(orderRequest.getOriginalPrice() - totalDiscount);
                Orders saveOrder= orderService.save(newOrder);

                for (OrderItemRequest o: orderRequest.getOrderItems()) {
                    orderItemService.addOrderItem(o,saveOrder);
                }

                return ResponseEntity.ok(saveOrder.getId());
            }

        return ResponseEntity.ok(new MessageRespone("Table not found"));
    }


    @PostMapping("/orderTake")
    public ResponseEntity<MessageRespone> createOrderTakeWay(@RequestBody OrderRequest orderRequest) {
            Orders newOrder = new Orders();
            newOrder.setCustomer(orderRequest.getCustomer());
            double totalDiscount= eventService.applyEventDiscount(orderRequest);

            newOrder.setBillNumber(orderService.createNextBillNumber());
            newOrder.setPayment(orderRequest.getPayment());
            newOrder.setType(OrderType.Take_away);
            newOrder.setOriginalPrice(orderRequest.getOriginalPrice());
            newOrder.setTotalDiscount(totalDiscount);
            newOrder.setTotalPrice(orderRequest.getOriginalPrice() - totalDiscount);
            Orders saveOrder= orderService.save(newOrder);

        for (OrderItemRequest o: orderRequest.getOrderItems()) {
            orderItemService.addOrderItem(o,saveOrder);
        }


        return ResponseEntity.ok(new MessageRespone("Create order successful"));


    }


    @PutMapping("/{id}")
    public ResponseEntity<OrderResponse> updateOrders(@PathVariable Long id, @RequestBody @Valid OrderRequest orderRequest) {
        Optional<Orders> existingOrder = orderService.findById(id);
        if (existingOrder.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Orders updatedOrder = existingOrder.get();
        updatedOrder.setCustomer(orderRequest.getCustomer());
        updatedOrder.setOriginalPrice(orderRequest.getOriginalPrice());
        updatedOrder.setTotalPrice(orderRequest.getTotalPrice());
        updatedOrder.setPayment(orderRequest.getPayment());
        updatedOrder.setTotalDiscount(orderRequest.getTotalDiscount());

        if (orderRequest.getType() == OrderType.Dine_in){
            Optional<RestaurantTable> table = restaurantTableService.findById(orderRequest.getRestaurantTableId());
            table.ifPresent(updatedOrder::setRestaurantTable);

        }

        Optional<Event> coupon = eventService.findByName(orderRequest.getCoupon());
        coupon.ifPresent(updatedOrder::setEvent);
        Orders savedOrder = orderService.save(updatedOrder);

        return ResponseEntity.ok(orderService.toOrderResponse(savedOrder));
    }

    @GetMapping("/nameTable")
    public List<Orders> findByNameTable(@RequestParam String nameTable) {
        return orderService.findByTableName(nameTable);
    }

    @GetMapping("/order_billnumber")
    public OrderResponse findByBillNumber(@RequestParam String billNumber) {
        return orderService.getOrderBillNumber(billNumber);
    }


    @GetMapping("/status")
    public ResponseEntity<List<OrderResponse>> findByStatus(@RequestParam StatusOrder status) {
        return ResponseEntity.ok(orderService.getOrderStatus(status));
    }


    @GetMapping("/by-date")
    public ResponseEntity<List<Orders>> getOrdersByDate(@RequestParam String date) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date orderDate = sdf.parse(date);
            List<Orders> orders = orderService.getOrdersByDate(orderDate);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrders(@PathVariable Long id) {
        Optional<Orders> publisher = orderService.findById(id);
        if (publisher.isPresent()) {
            orderItemService.delete(id);
            orderService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PatchMapping("/{id}")
    public ResponseEntity<OrderResponse> changStatusOrder(@PathVariable long id,@RequestParam StatusOrder status) {
        Optional<Orders> publisher = orderService.findById(id);
        if (publisher.isPresent()) {
            Orders order = publisher.get();
            order.setStatus(status);
            orderService.save(order);
            return ResponseEntity.ok(orderService.toOrderResponse(order));
        }
        return ResponseEntity.notFound().build();
    }


    @PatchMapping("/{billNumber}/status")
    public ResponseEntity<?> changeStatusOrder(@PathVariable String billNumber, @RequestParam StatusOrder status) {
        orderService.changStatusToBillNumber(status,billNumber);
        return ResponseEntity.ok().build();
    }


    @PatchMapping("/{id}/payment")
    public ResponseEntity<?> updatePaymentMethod(@PathVariable long id, @RequestParam PaymentMethod payment) {
        Optional<Orders> orderOptional = orderService.findById(id);
        if (orderOptional.isPresent()) {
            Orders order = orderOptional.get();
            order.setPayment(payment);
            orderService.save(order);
            return ResponseEntity.ok("Phương thức thanh toán đã được cập nhật.");
        }
        return ResponseEntity.notFound().build();
    }

}
