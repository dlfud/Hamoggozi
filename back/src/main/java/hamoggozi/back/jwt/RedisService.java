package hamoggozi.back.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RedisService {
    @Autowired
    private StringRedisTemplate redisTemplate;

    public void blacklistToken(String token, long expirationMillis) {
        redisTemplate.opsForValue().set(token, "logout", expirationMillis, TimeUnit.MILLISECONDS);
    }

    public boolean isBlacklisted(String token) {
        return redisTemplate.hasKey(token);
    }
}
