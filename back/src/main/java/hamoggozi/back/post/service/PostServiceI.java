package hamoggozi.back.post.service;

import hamoggozi.back.dto.PostBean;
import hamoggozi.back.dto.UserBean;

import java.util.List;

public interface PostServiceI {
    List<PostBean> getPostBean(PostBean postBean) throws Exception;

    PostBean getPostDetail(PostBean postBean) throws Exception;

    int insertPost(PostBean postBean) throws Exception;
    int updatePost(PostBean postBean) throws Exception;
    int deletePost(PostBean postBean) throws Exception;
}
