package hamoggozi.back.general.service;

import hamoggozi.back.dao.GeneralDao;
import hamoggozi.back.dto.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeneralService implements GeneralServiceI {
    @Autowired
    private GeneralDao generalDao;

    @Override
    public void insertUser(UserBean userBean) throws Exception {
        generalDao.insertUser(userBean);
    }

    @Override
    public UserBean getUserBean(String userId) throws Exception {
        return generalDao.getUser(userId);
    }
}
