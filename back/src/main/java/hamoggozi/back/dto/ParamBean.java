package hamoggozi.back.dto;

public class ParamBean {
    private int searchCount;
    private String searchWord;
    private int offset;

    private int insertBy;
    private String insertDate;
    private int updateBy;
    private String updateDate;

    public int getSearchCount() {
        return searchCount;
    }
    public void setSearchCount(int searchCount) {
        this.searchCount = searchCount;
    }

    public String getSearchWord() {
        return searchWord;
    }
    public void setSearchWord(String searchWord) {
        this.searchWord = searchWord;
    }

    public int getOffset() {
        return offset;
    }
    public void setOffset(int offset) {
        this.offset = offset;
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
