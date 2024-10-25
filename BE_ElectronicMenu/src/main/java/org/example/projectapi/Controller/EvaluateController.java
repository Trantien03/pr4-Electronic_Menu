package org.example.projectapi.Controller;

import org.example.projectapi.Service.EvaluateService;
import org.example.projectapi.dto.request.EvaluateRequest;
import org.example.projectapi.dto.response.EvaluateResponse;
import org.example.projectapi.dto.response.MessageResponse;
import org.example.projectapi.enums.EvaluateStatus;
import org.example.projectapi.model.Evaluate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/evaluates")
public class EvaluateController {

    private final EvaluateService evaluateService;

    public EvaluateController(EvaluateService evaluateService) {
        this.evaluateService = evaluateService;
    }

    // Lấy danh sách tất cả đánh giá
    @GetMapping
    public ResponseEntity<List<Evaluate>> getEvaluates() {
        List<Evaluate> evaluates = evaluateService.getEvaluates();
        return ResponseEntity.ok(evaluates);
    }

    // Lưu đánh giá mới
    @PostMapping
    public ResponseEntity<EvaluateResponse> saveEvaluate(@RequestBody EvaluateRequest evaluateRequest) {
        try {
            EvaluateResponse response = evaluateService.saveEvaluate(evaluateRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new EvaluateResponse(0, 0, null, e.getMessage(), null));
        }
    }

    // Tìm kiếm đánh giá theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Evaluate> findEvaluateById(@PathVariable long id) {
        Optional<Evaluate> evaluate = evaluateService.findEvaluateById(id);
        return evaluate.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Xóa đánh giá theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteEvaluate(@PathVariable long id) {
        MessageResponse response = evaluateService.deleteEvaluate(id);
        HttpStatus status = response.getMessage().equals("Evaluate not found") ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return ResponseEntity.status(status).body(response);
    }

    // Cập nhật trạng thái đánh giá
    @PatchMapping("/{id}/status")
    public ResponseEntity<EvaluateResponse> changeEvaluateStatus(@PathVariable long id, @RequestParam String status) {
        try {
            EvaluateStatus evaluateStatus = EvaluateStatus.valueOf(status.toUpperCase());
            EvaluateResponse response = evaluateService.changeEvaluateStatus(id, evaluateStatus);
            HttpStatus responseStatus = response.getId() == 0 ? HttpStatus.NOT_FOUND : HttpStatus.OK;
            return ResponseEntity.status(responseStatus).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new EvaluateResponse(0, 0, null, "Invalid status value", null));
        }
    }
}
