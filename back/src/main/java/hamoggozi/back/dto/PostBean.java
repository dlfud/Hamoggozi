package hamoggozi.back.dto;

import java.util.List;

public class PostBean {
    private int uid;
    private int groupUid;
    private int userUid;
    private String title;
    private String content;
    private String category;
    private int insertBy;
    private String insertDate;
    private int updateBy;
    private String updateDate;

    private String userName;

    private List<String> moveFile;
    private List<String> tempDeleteFile;
    private List<String> deleteFile;

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

    public int getUserUid() {
        return userUid;
    }
    public void setUserUid(int userUid) {
        this.userUid = userUid;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
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

    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<String> getMoveFile() {
        return moveFile;
    }
    public void setMoveFile(List<String> moveFile) {
        this.moveFile = moveFile;
    }

    public List<String> getDeleteFile() {
        return deleteFile;
    }
    public void setDeleteFile(List<String> deleteFile) {
        this.deleteFile = deleteFile;
    }

    public List<String> getTempDeleteFile() {
        return tempDeleteFile;
    }
    public void setTempDeleteFile(List<String> tempDeleteFile) {
        this.tempDeleteFile = tempDeleteFile;
    }
}
