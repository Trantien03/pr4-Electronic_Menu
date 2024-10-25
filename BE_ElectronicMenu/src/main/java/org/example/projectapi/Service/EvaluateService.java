package org.example.projectapi.Service;

import org.example.projectapi.Repository.EvaluateRepository;
import org.example.projectapi.Repository.RestaurantTableRepository;
import org.example.projectapi.dto.request.EvaluateRequest;
import org.example.projectapi.dto.response.EvaluateResponse;
import org.example.projectapi.dto.response.MessageResponse;
import org.example.projectapi.enums.EvaluateStatus;
import org.example.projectapi.model.Evaluate;
import org.example.projectapi.model.RestaurantTable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EvaluateService {
    private final EvaluateRepository evaluateRepository;
    private final RestaurantTableRepository restaurantTableRepository;

    public EvaluateService(EvaluateRepository evaluateRepository, RestaurantTableRepository restaurantTableRepository) {
        this.evaluateRepository = evaluateRepository;
        this.restaurantTableRepository = restaurantTableRepository;
    }

    // Lấy danh sách tất cả đánh giá
    public List<Evaluate> getEvaluates() {
        return evaluateRepository.findAll();
    }

    // Gửi đánh giá mới
    public EvaluateResponse sendEvaluate(EvaluateRequest evaluateRequest) {
        return saveEvaluate(evaluateRequest);
    }

    // Lưu đánh giá
    public EvaluateResponse saveEvaluate(EvaluateRequest evaluateRequest) {
        if (evaluateRequest == null) {
            throw new IllegalArgumentException("Evaluate request is null");
        }

        Optional<RestaurantTable> table = restaurantTableRepository.findById(evaluateRequest.getTableId());
        if (table.isPresent()) {
            Evaluate evaluateEntity = new Evaluate();
            evaluateEntity.setRestaurantTable(table.get());
            evaluateEntity.setDescription(evaluateRequest.getDescription());
            evaluateEntity.setRating(evaluateRequest.getRating());
            evaluateEntity.setPhone(evaluateRequest.getPhone());
            evaluateEntity.setStatus(EvaluateStatus.received); // Thiết lập trạng thái mặc định

            // Lưu đánh giá
            Evaluate savedEvaluate = evaluateRepository.save(evaluateEntity);

            // Trả về phản hồi thành công
            return new EvaluateResponse(
                    savedEvaluate.getId(),
                    savedEvaluate.getRating(),
                    savedEvaluate.getPhone(),
                    savedEvaluate.getDescription(),
                    List.of(savedEvaluate.getStatus().name()) // Lấy tên trạng thái của đánh giá
            );
        }

        // Trả về thông báo khi không tìm thấy bàn
        return new EvaluateResponse(0L, 0.0, null, "Table not found", null);
    }

    // Tìm kiếm đánh giá theo ID
    public Optional<Evaluate> findEvaluateById(long id) {
        return evaluateRepository.findById(id);
    }

    // Xóa đánh giá theo ID
    public MessageResponse deleteEvaluate(long id) {
        if (!evaluateRepository.existsById(id)) {
            return new MessageResponse("Evaluate not found");
        }
        evaluateRepository.deleteById(id);
        return new MessageResponse("Successfully deleted evaluate");
    }

    // Cập nhật trạng thái đánh giá
    public EvaluateResponse changeEvaluateStatus(long id, EvaluateStatus status) {
        Optional<Evaluate> optional = findEvaluateById(id);
        if (optional.isPresent()) {
            Evaluate evaluateEntity = optional.get();
            evaluateEntity.setStatus(status);
            Evaluate updatedEvaluate = evaluateRepository.save(evaluateEntity); // Lưu lại thay đổi
            return new EvaluateResponse(
                    updatedEvaluate.getId(),
                    updatedEvaluate.getRating(),
                    updatedEvaluate.getPhone(),
                    updatedEvaluate.getDescription(),
                    List.of(updatedEvaluate.getStatus().name()) // Trả về danh sách chứa tên trạng thái cập nhật
            );
        }
        return new EvaluateResponse(0L, 0.0, null, "Evaluate not found", null);
    }
}
