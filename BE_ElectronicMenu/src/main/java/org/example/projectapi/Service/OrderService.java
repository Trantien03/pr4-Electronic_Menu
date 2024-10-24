package org.example.projectapi.Service;

import jakarta.transaction.Transactional;
import org.example.projectapi.Repository.OrderItemRepository;
import org.example.projectapi.Repository.OrderRepository;
import org.example.projectapi.dto.response.MessageRespone;
import org.example.projectapi.dto.response.OrderItemResponse;
import org.example.projectapi.dto.response.OrderResponse;
import org.example.projectapi.enums.StatusOrder;
import org.example.projectapi.model.OrderItem;
import org.example.projectapi.model.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemService orderItemService;

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);


    public Page<Orders> findAll(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    public Optional<Orders> findById(Long id) {
        return orderRepository.findById(id);
    }

    public Orders save(Orders customer) {
        return orderRepository.save(customer);
    }

    public void deleteById(Long id) {
        orderRepository.deleteById(id);
    }


    @Transactional
    public String createNextBillNumber() {
        List<String> lastBillNumList = orderRepository.findLastBillNumber();
        String lastBillNum = lastBillNumList.isEmpty() ? null : lastBillNumList.get(0);

        String nextBillNum;
        if (lastBillNum == null || lastBillNum.isEmpty()) {
            nextBillNum = "B000000001";
        } else {
            String numberPart = lastBillNum.substring(1);
            int lastNumber = Integer.parseInt(numberPart);
            nextBillNum = "B" + String.format("%09d", ++lastNumber);
        }

        return nextBillNum;
    }


    public List<Orders> findByTableName(String tableName) {
        return orderRepository.findOrdersByNameTable(tableName);
    }

    public List<Orders> getOrdersByDate(Date date) {
        return orderRepository.findOrdersByDate(date);
    }

    public OrderResponse getOrderBillNumber(String billNumber) {

        Optional<Orders> orders = orderRepository.findByBillNumber(billNumber);
        if (orders.isPresent()) {
            return toOrderResponse(orders.get());
        }
        return null;
    }

    public MessageRespone changStatusToBillNumber(StatusOrder statusOrder, String billNumber) {
        Optional<Orders> orders = orderRepository.findByBillNumber(billNumber);
        if (orders.isPresent()) {
            Orders order = orders.get();
            order.setStatus(statusOrder);
            orderRepository.save(order);
            return new MessageRespone("Changed status to " + statusOrder);
        }
        return new MessageRespone("Bill number not found");
    }

    public List<OrderResponse> getOrderStatus(StatusOrder statusOrder) {
        List<OrderResponse> orderResponses = new ArrayList<>();
        List<Orders> ordersList = orderRepository.findOrdersByStatus(statusOrder);
        for (Orders order : ordersList) {
            orderResponses.add(toOrderResponse(order));
        }
        return orderResponses;
    }

    public List<OrderItemResponse> getOrderItem(List<OrderItem> orderItem){
        List<OrderItemResponse> orderResponses = new ArrayList<>();
        for (OrderItem item : orderItem){
            OrderItemResponse itemResponse = orderItemService.toOrderItemResponse(item);
            orderResponses.add(itemResponse);
        }
        return orderResponses;
    }

    public OrderResponse toOrderResponse(Orders order) {
        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setId(order.getId());
        orderResponse.setBillNumber(order.getBillNumber());
        orderResponse.setNameCustomer(order.getCustomer());
        orderResponse.setItems(getOrderItem(order.getOrderItems()));
        orderResponse.setTable(order.getRestaurantTable());
        if (order.getEvent()!= null){
            orderResponse.setCoupon(order.getEvent().getName());
        }
        orderResponse.setType(order.getType());
        orderResponse.setCreateAt(order.getCreateAt());
        orderResponse.setOriginalPrice(order.getOriginalPrice());
        orderResponse.setTotalPrice(order.getTotalPrice());
        orderResponse.setTotalDiscount(order.getTotalDiscount());
        orderResponse.setStatus(order.getStatus());
        return orderResponse;
    }

    @Transactional
    public MessageRespone updateOrderStatus(Long orderId, StatusOrder newStatus) {
        logger.info("Updating order status for Order ID: " + orderId + " to " + newStatus);

        Optional<Orders> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Orders order = optionalOrder.get();
            order.setStatus(newStatus); // Cập nhật trạng thái mới
            orderRepository.save(order); // Lưu thay đổi
            logger.info("Order status updated successfully for Order ID: " + orderId);
            return new MessageRespone("Order status updated to " + newStatus);
        }

        logger.warn("Order not found for ID: " + orderId);
        return new MessageRespone("Order not found");
    }


}