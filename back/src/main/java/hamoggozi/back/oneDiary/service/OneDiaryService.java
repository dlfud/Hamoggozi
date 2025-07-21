package hamoggozi.back.oneDiary.service;

import hamoggozi.back.dao.OneDiaryDao;
import hamoggozi.back.dto.OneDiaryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OneDiaryService implements OneDiaryServiceI {
    @Autowired
    private OneDiaryDao oneDiaryDao;

    @Override
    public List<OneDiaryBean> getOneDiaryList(OneDiaryBean oneDiaryBean) throws Exception {
        return oneDiaryDao.getOneDiaryList(oneDiaryBean);
    }

    @Override
    public int saveOneDiary(OneDiaryBean oneDiaryBean) throws Exception {
        return oneDiaryDao.saveOneDiary(oneDiaryBean);
    }
}
