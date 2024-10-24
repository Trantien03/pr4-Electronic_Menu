package org.example.projectapi.Repository;

import org.example.projectapi.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findByName(String name);


    Optional<Event> findByStartDayBeforeAndEndDayAfter(Date start, Date end);
}
