package hamoggozi.back.dto;

public class FileBean extends ParamBean {
    private int uid;
    private String fileName;
    private String saveName;
    private String publickey;
    private String url;


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
}
