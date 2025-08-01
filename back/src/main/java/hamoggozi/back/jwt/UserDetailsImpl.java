package hamoggozi.back.jwt;

import hamoggozi.back.dto.UserBean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserDetailsImpl implements UserDetails {
    private UserBean user;

    public UserDetailsImpl(UserBean user) {
        this.user = user;
    }

    @Override
    public String getUsername() {
        return user.getId();
    }

    @Override
    public String getPassword() {
        return user.getPw();
    }

    @Override public Collection<? extends GrantedAuthority> getAuthorities() { return List.of(); }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
