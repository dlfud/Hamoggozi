package hamoggozi.back.notice.service;

import hamoggozi.back.dto.FileBean;
import hamoggozi.back.dto.NoticeBean;
import hamoggozi.back.dto.UserBean;

public interface NoticeServiceI {
    NoticeBean getNotice(NoticeBean noticeBean) throws Exception;

    int saveNotice(NoticeBean noticeBean) throws Exception;
}
