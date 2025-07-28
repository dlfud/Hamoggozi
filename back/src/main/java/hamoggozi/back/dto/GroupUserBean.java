package hamoggozi.back.dto;

public class GroupUserBean extends ParamBean {
    private int uid;
    private int groupUid;
    private int userUid;
    private String auth;


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

    public String getAuth() {
        return auth;
    }
    public void setAuth(String auth) {
        this.auth = auth;
    }
}
