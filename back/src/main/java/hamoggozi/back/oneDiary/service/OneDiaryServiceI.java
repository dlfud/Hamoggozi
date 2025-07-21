package hamoggozi.back.oneDiary.service;


import hamoggozi.back.dto.OneDiaryBean;

import java.util.List;

public interface OneDiaryServiceI {
    List<OneDiaryBean> getOneDiaryList(OneDiaryBean oneDiaryBean) throws Exception;

    int saveOneDiary(OneDiaryBean oneDiaryBean) throws Exception;
}
