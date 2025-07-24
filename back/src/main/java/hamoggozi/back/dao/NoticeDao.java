package hamoggozi.back.dao;

import hamoggozi.back.dto.FileBean;
import hamoggozi.back.dto.NoticeBean;
import hamoggozi.back.dto.UserBean;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NoticeDao {
    NoticeBean getNotice(NoticeBean noticeBean) throws Exception;
    int updateNotice(NoticeBean noticeBean) throws Exception;
    int insertNotice(NoticeBean noticeBean) throws Exception;


}
