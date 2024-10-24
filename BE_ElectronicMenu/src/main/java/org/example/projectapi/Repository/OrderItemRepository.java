package org.example.projectapi.Repository;

import jakarta.transaction.Transactional;
import org.example.projectapi.dto.response.OrderItemResponse;
import org.example.projectapi.enums.StatusOrder;
import org.example.projectapi.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.ListIterator;
import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
//    Optional<OrderItem> findByOrderId(long id);

    @Query("SELECT i FROM OrderItem i WHERE i.order.id = :order_id")
    List<OrderItem> findOrderItemsByOrderId(@Param("order_id") Long orderId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM OrderItem i WHERE i.order.id = :order_id", nativeQuery = true)
    void deleteOrderItemsByOrderId(@Param("order_id") Long orderId);

    @Query("select i FROM OrderItem i where i.order.status = :status")
    List<OrderItem> findByOrderStatus(@Param("status")StatusOrder statusOrder);
}
