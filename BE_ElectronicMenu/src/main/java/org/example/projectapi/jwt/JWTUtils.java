package org.example.projectapi.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.example.projectapi.model.Employee;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Component
public class JWTUtils {

    private SecretKey key;
    private static final Long ACCESS_TOKEN_EXPIRATION_TIME = 86400000L; // 1 ngày
    private static final Long REFRESH_TOKEN_EXPIRATION_TIME = 2592000000L; // 30 ngày


    public JWTUtils() {
        String secretKeyString = "843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3";
        byte[] keyBytes = Base64.getDecoder().decode(secretKeyString.getBytes(StandardCharsets.UTF_8));
        this.key = new SecretKeySpec(keyBytes, "HmacSHA256");

    }

    public String generateToken(Employee employee) {
        return Jwts.builder()
                .subject(employee.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+ACCESS_TOKEN_EXPIRATION_TIME))
                .signWith(key)
                .compact();

    }

    public String generateRefreshToken(HashMap<String, Object> claims,Employee employee) {
        return Jwts.builder()
                .claims(claims)
                .subject(employee.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+REFRESH_TOKEN_EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
    }

    public boolean isTokenValid(String token,Employee employee) {
        final String username = extractUsername(token);
        return (username.equals(employee.getEmail()) && !isTokenExpired(token));
    }
    public boolean isTokenExpired(String token) {
        return extractClaims(token,Claims:: getExpiration).before(new Date());
    }
}