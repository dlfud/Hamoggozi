package com.hamoggozi.hamoggozi.dto;

public class OneLineDiaryBean {
    private int uid;
    private String content;
    private int userUid;
    private String insertDate;
    private String updateDate;

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

    public String getInsertDate() {
        return insertDate;
    }
    public void setInsertDate(String insertDate) {
        this.insertDate = insertDate;
    }

    public String getUpdateDate() {
        return updateDate;
    }
    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }
}
