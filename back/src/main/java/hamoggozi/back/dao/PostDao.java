package hamoggozi.back.dao;

import hamoggozi.back.dto.PostBean;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostDao {

    List<PostBean> getPostList(PostBean postBean) throws Exception;

    PostBean getPostDetail(PostBean postBean) throws Exception;

    int insertPost(PostBean postBean) throws Exception;
    int updatePost(PostBean postBean) throws Exception;
    int deletePost(PostBean postBean) throws Exception;
}
