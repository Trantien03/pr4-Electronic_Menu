package org.example.projectapi.Controller;

import jakarta.servlet.http.HttpServletRequest;
import org.example.projectapi.Service.OrderService;
import org.example.projectapi.vnpay.VNPAYService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.File;

@Controller
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @Autowired
    private VNPAYService vnpayService;
    @Autowired
    private OrderService orderService;

    @PostMapping("/order/{orderId}")
    public ResponseEntity<String> createPayment(@PathVariable Long orderId, HttpServletRequest request) {
        try {
            if (orderId <= 0) {
                return ResponseEntity.badRequest().body("Invalid order ID.");
            }

            if (!orderService.findById(orderId).isPresent()) {
                return ResponseEntity.badRequest().body("Order not found.");
            }

            String paymentUrl = vnpayService.processOrderPayment(request, orderId);
            return ResponseEntity.ok(paymentUrl); // Trả về URL thanh toán
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error occurred", e);
            return ResponseEntity.status(500).body("An unexpected error occurred. Please try again later.");
        }
    }

    @GetMapping("/vnpay-payment-return")
    public String paymentCompleted(HttpServletRequest request, Model model) {
        vnpayService.handlePaymentResponse(request);

        int paymentStatus = vnpayService.orderReturn(request);

        String path = new File("src/main/resources/templates/payment_success.html").getAbsolutePath();
        System.out.println("Path: " + path);


        if (paymentStatus == 1) {
            model.addAttribute("message", "Thanh toán thành công!");
            model.addAttribute("content", "/payment_success.html");
            return "payment_success.html";  // Chuyển hướng về trang thành công
        } else {
            model.addAttribute("message", "Thanh toán thất bại!");
            model.addAttribute("content", "/payment_fail.html");
            return "payment_fail.html";  // Chuyển hướng về trang thất bại
        }
    }
}
