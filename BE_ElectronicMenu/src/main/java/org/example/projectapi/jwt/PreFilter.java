package org.example.projectapi.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.example.projectapi.Service.EmployeeService;
import org.example.projectapi.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
public class PreFilter extends OncePerRequestFilter {
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private JWTUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("------------------PreFilter------------------");

        final String authorizationHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String email;

        // Kiểm tra header Authorization
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Loại bỏ tiền tố "Bearer " và lấy JWT
        jwtToken = authorizationHeader.substring(7);
        try {
            email = jwtUtils.extractUsername(jwtToken);
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                Employee employee = employeeService.loadUserByUsername(email);

                if (jwtUtils.isTokenValid(jwtToken, employee)) {
                    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                            employee, null, employee.getAuthorities()
                    );
                    token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(token);
                }
            }
        } catch (Exception e) {
            log.error("Cannot set user authentication: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}
