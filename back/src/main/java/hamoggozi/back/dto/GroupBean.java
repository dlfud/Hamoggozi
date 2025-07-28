package hamoggozi.back.dto;

public class GroupBean extends ParamBean {
    private int uid;
    private String groupId;
    private String groupName;

    private String auth;


    public int getUid() {
        return uid;
    }
    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getGroupId() {
        return groupId;
    }
    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }
    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getAuth() {
        return auth;
    }
    public void setAuth(String auth) {
        this.auth = auth;
    }
}
