package hamoggozi.back.jwt;

import hamoggozi.back.dao.GeneralDao;
import hamoggozi.back.dto.UserBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private GeneralDao generalDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserBean user = generalDao.getUser(username);
        if (user == null) {
            throw new UsernameNotFoundException("사용자 없음");
        }
        return new UserDetailsImpl(user);
    }
}
