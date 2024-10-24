package org.example.projectapi.Repository;

import org.example.projectapi.enums.StatusOrder;
import org.example.projectapi.model.OrderItem;
import org.example.projectapi.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Orders, Long> {

    @Query("SELECT b.billNumber FROM Orders b ORDER BY b.id DESC")
    List<String> findLastBillNumber();

    @Query("SELECT o FROM Orders o WHERE o.restaurantTable.nameTable = :nameTable")
    List<Orders> findOrdersByNameTable(@Param("nameTable") String nameTable);


    @Query("SELECT o FROM Orders o WHERE DATE(o.createAt) = :orderDate")
    List<Orders> findOrdersByDate(@Param("orderDate") Date orderDate);

    @Query("SELECT o FROM Orders o WHERE o.status = :status")
    List<Orders> findOrdersByStatus(@Param("status") StatusOrder status);


    Optional<Orders> findByBillNumber(String billNumber);


}
