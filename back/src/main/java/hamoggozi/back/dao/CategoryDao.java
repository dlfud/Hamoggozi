package hamoggozi.back.dao;

import hamoggozi.back.dto.CategoryBean;
import hamoggozi.back.dto.FileBean;
import hamoggozi.back.dto.GroupUserBean;
import hamoggozi.back.dto.UserBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CategoryDao {

    List<CategoryBean> getCategoryList(CategoryBean categoryBean) throws Exception;

    int getMaxOrder(CategoryBean categoryBean) throws Exception;
    int insertCategory(CategoryBean categoryBean) throws Exception;

    int updateCategory(CategoryBean categoryBean) throws Exception;
    int getOriginUpCategory(CategoryBean categoryBean) throws Exception;

    int deleteCategory(CategoryBean categoryBean) throws Exception;

    void updateOrder(CategoryBean categoryBean) throws Exception;
}
