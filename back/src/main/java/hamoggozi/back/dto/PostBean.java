package hamoggozi.back.dto;

import java.util.List;

public class PostBean extends ParamBean {
    private int uid;
    private int groupUid;
    private int userUid;
    private String title;
    private String content;
    private String category1Uid;
    private String category2Uid;

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

    public String getCategory1Uid() {
        return category1Uid;
    }
    public void setCategory1Uid(String category1Uid) {
        this.category1Uid = category1Uid;
    }

    public String getCategory2Uid() {
        return category2Uid;
    }
    public void setCategory2Uid(String category2Uid) {
        this.category2Uid = category2Uid;
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
