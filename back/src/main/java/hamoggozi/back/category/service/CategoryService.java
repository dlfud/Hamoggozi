package hamoggozi.back.category.service;

import hamoggozi.back.dao.CategoryDao;
import hamoggozi.back.dao.GeneralDao;
import hamoggozi.back.dto.CategoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements CategoryServiceI {
    @Autowired
    private CategoryDao categoryDao;


    @Override
    public List<CategoryBean> getCategoryList(CategoryBean categoryBean) throws Exception {
        return categoryDao.getCategoryList(categoryBean);
    }

    @Override
    public int insertCategory(CategoryBean categoryBean) throws Exception {
        return categoryDao.insertCategory(categoryBean);
    }

    @Override
    public int updateCategory(CategoryBean categoryBean) throws Exception {
        return categoryDao.updateCategory(categoryBean);
    }

    @Override
    public int deleteCategory(CategoryBean categoryBean) throws Exception {
        return categoryDao.deleteCategory(categoryBean);
    }
}
