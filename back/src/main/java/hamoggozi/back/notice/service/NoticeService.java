package hamoggozi.back.notice.service;

import hamoggozi.back.dao.GeneralDao;
import hamoggozi.back.dao.NoticeDao;
import hamoggozi.back.dto.FileBean;
import hamoggozi.back.dto.NoticeBean;
import hamoggozi.back.dto.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Service
public class NoticeService implements NoticeServiceI {
    @Autowired
    private NoticeDao noticeDao;

    @Override
    public NoticeBean getNotice(NoticeBean noticeBean) throws Exception {
        return noticeDao.getNotice(noticeBean);
    }

    @Override
    public int saveNotice(NoticeBean noticeBean) throws Exception {
        if(noticeDao.getNotice(noticeBean) == null){
            return noticeDao.insertNotice(noticeBean);
        }
        return noticeDao.updateNotice(noticeBean);
    }
}
