package org.example.projectapi.Repository;

import org.example.projectapi.model.Evaluate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluateRepository extends JpaRepository<Evaluate, Long> {
    // Bạn có thể thêm các phương thức custom query ở đây nếu cần
}
