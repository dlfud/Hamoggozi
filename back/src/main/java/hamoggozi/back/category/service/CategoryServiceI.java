package hamoggozi.back.category.service;

import hamoggozi.back.dto.CategoryBean;
import hamoggozi.back.dto.FileBean;
import hamoggozi.back.dto.UserBean;

import java.util.List;

public interface CategoryServiceI {

    List<CategoryBean> getCategoryList(CategoryBean categoryBean) throws Exception;
    int insertCategory(CategoryBean categoryBean) throws Exception;
    int updateCategory(CategoryBean categoryBean) throws Exception;
    int deleteCategory(CategoryBean categoryBean) throws Exception;
}
