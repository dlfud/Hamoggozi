package hamoggozi.back.dto;

import java.util.List;

public class CategoryBean {
    private int uid;
    private int groupUid;
    private String name;
    private int upCategory;
    private int depth;
    private int order;
    private int insertBy;
    private String insertDate;
    private int updateBy;
    private String updateDate;


    private int userUid;
    private List<CategoryBean> categoryList;


    public int getUid() {
        return uid;
    }
    public void setUid(int uid) {
        this.uid = uid;
    }

    public int getGroupUid() {
        return groupUid;
    }
    public void setGroupUid(int groupUid) {
        this.groupUid = groupUid;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getUpCategory() {
        return upCategory;
    }
    public void setUpCategory(int upCategory) {
        this.upCategory = upCategory;
    }

    public int getDepth() {
        return depth;
    }
    public void setDepth(int depth) {
        this.depth = depth;
    }

    public int getOrder() {
        return order;
    }
    public void setOrder(int order) {
        this.order = order;
    }

    public int getInsertBy() {
        return insertBy;
    }
    public void setInsertBy(int insertBy) {
        this.insertBy = insertBy;
    }

    public String getInsertDate() {
        return insertDate;
    }
    public void setInsertDate(String insertDate) {
        this.insertDate = insertDate;
    }

    public int getUpdateBy() {
        return updateBy;
    }
    public void setUpdateBy(int updateBy) {
        this.updateBy = updateBy;
    }

    public String getUpdateDate() {
        return updateDate;
    }
    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }

    public int getUserUid() {
        return userUid;
    }
    public void setUserUid(int userUid) {
        this.userUid = userUid;
    }

    public List<CategoryBean> getCategoryList() {
        return categoryList;
    }
    public void setCategoryList(List<CategoryBean> categoryList) {
        this.categoryList = categoryList;
    }
}
