package hamoggozi.back.dao;

import hamoggozi.back.dto.OneDiaryBean;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OneDiaryDao {
    List<OneDiaryBean> getOneDiaryList(OneDiaryBean oneDiaryBean) throws Exception;

    int saveOneDiary(OneDiaryBean oneDiaryBean) throws Exception;
}
