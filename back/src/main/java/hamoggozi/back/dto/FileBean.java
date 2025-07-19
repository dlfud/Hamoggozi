package hamoggozi.back.dto;

public class FileBean {
    private int uid;
    private String fileName;
    private String saveName;
    private String publickey;
    private String url;
    private int insertBy;
    private String insertDate;
    private int updateBy;
    private String updateDate;


    public int getUid() {
        return uid;
    }
    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getFileName() {
        return fileName;
    }
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getSaveName() {
        return saveName;
    }
    public void setSaveName(String saveName) {
        this.saveName = saveName;
    }

    public String getPublickey() {
        return publickey;
    }
    public void setPublickey(String publickey) {
        this.publickey = publickey;
    }

    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
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
}
