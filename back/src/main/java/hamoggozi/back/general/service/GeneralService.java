package hamoggozi.back.general.service;

import hamoggozi.back.dao.GeneralDao;
import hamoggozi.back.dto.FileBean;
import hamoggozi.back.dto.GroupUserBean;
import hamoggozi.back.dto.NoticeBean;
import hamoggozi.back.dto.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

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
        return generalDao.getUserExceptPw(userId);
    }

    @Override
    public void insertFile(FileBean fileBean) throws Exception {
        generalDao.insertFile(fileBean);
    }

    @Override
    public void deleteFile(String url) throws Exception {
        String decodedFilename = URLDecoder.decode(url, StandardCharsets.UTF_8);
        generalDao.deleteFile(decodedFilename);
    }

    @Override
    public String checkAuth(int groupUid, int userUid) throws Exception {
        return generalDao.checkAuth(groupUid, userUid);
    }

    @Override
    public int checkGroupUser(int groupUid, int userUid) throws Exception {
        GroupUserBean groupUserBean = new GroupUserBean();
        groupUserBean.setGroupUid(groupUid);
        groupUserBean.setUserUid(userUid);
        return generalDao.checkGroupUser(groupUserBean);
    }

    @Override
    public int checkGroupPost(int groupUid, int postUid) throws Exception {
        return generalDao.checkGroupPost(groupUid, postUid);
    }

    @Override
    public int checkPostUser(int postUid, int userUid) throws Exception {
        return generalDao.checkPostUser(postUid, userUid);
    }
}
