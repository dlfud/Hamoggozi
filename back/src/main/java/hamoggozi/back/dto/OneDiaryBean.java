package hamoggozi.back.dto;

public class OneDiaryBean {
    private int uid;
    private String content;
    private int userUid;
    private int insertBy;
    private String insertDate;
    private int updateBy;
    private String updateDate;

    private String userName;

    public int getUid() {
        return uid;
    }
    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public int getUserUid() {
        return userUid;
    }
    public void setUserUid(int userUid) {
        this.userUid = userUid;
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
}
