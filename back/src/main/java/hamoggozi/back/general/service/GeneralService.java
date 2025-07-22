package hamoggozi.back.general.service;

import hamoggozi.back.dao.GeneralDao;
import hamoggozi.back.dto.FileBean;
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
        return generalDao.getUser(userId);
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
    public NoticeBean getNotice() throws Exception {
        return generalDao.getNotice();
    }

    @Override
    public int saveNotice(NoticeBean noticeBean) throws Exception {
        if(generalDao.getNotice() == null){
            return generalDao.updateNotice();
        }
        return generalDao.insertNotice();
    }
}
