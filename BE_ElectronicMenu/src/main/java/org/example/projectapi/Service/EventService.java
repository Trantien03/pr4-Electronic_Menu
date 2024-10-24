package org.example.projectapi.Service;

import org.example.projectapi.Repository.EventRepository;
import org.example.projectapi.Repository.OrderRepository;
import org.example.projectapi.dto.request.OrderRequest;
import org.example.projectapi.model.Event;
import org.example.projectapi.model.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public Optional<Event> findByName(String name){
        return eventRepository.findByName(name);
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public Optional<Event> findById(Long id) {
        return eventRepository.findById(id);
    }

    public Event save(Event customer) {
        return eventRepository.save(customer);
    }

    public void deleteById(Long id) {
        eventRepository.deleteById(id);
    }


    public Optional<Event> findActiveEvent(Date date) {
        return eventRepository.findByStartDayBeforeAndEndDayAfter(date, date);
    }

    public boolean checkOrderToEvent(Event event,Date date) {

        Date startDay = event.getStartDay();
        Date endDay = event.getEndDay();

        return (date.after(startDay) || date.equals(startDay) && date.before(endDay) || date.equals(endDay));

    }


    public double applyEventDiscount(OrderRequest orderRequest) {
        double totalDiscount =0;
        Date currentDate = new Date();

        Optional<Event> activeEvent = findActiveEvent(currentDate);
        if (activeEvent.isPresent()) {
            Event event = activeEvent.get();
            if (checkOrderToEvent(event,currentDate)) {
                System.out.println("Original Price: " + orderRequest.getOriginalPrice());
                System.out.println("Event Discount: " + event.getDiscount());

                totalDiscount = (orderRequest.getOriginalPrice() * (event.getDiscount() / 100.0));
                System.out.println("Total Discount: " + String.format("%.2f", totalDiscount));
                return totalDiscount;
            }
        }
        return totalDiscount;
    }

    public boolean checkEventStartDayAndEndDay(Date startDay, Date endDay) {
        List<Event> events = eventRepository.findAll();
        for (Event event : events) {
            if ((startDay.equals(event.getStartDay()) || startDay.equals(event.getEndDay()) ||
                    (startDay.after(event.getStartDay()) && startDay.before(event.getEndDay()))) ||
                    (endDay.equals(event.getStartDay()) || endDay.equals(event.getEndDay()) ||
                            (endDay.after(event.getStartDay()) && endDay.before(event.getEndDay())))) {
                return true;
            }
        }
        return false;
    }
}
