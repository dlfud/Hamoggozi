package hamoggozi.back.post.service;

import hamoggozi.back.dao.GeneralDao;
import hamoggozi.back.dao.PostDao;
import hamoggozi.back.dto.PostBean;
import hamoggozi.back.dto.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService implements PostServiceI {
    @Autowired
    private PostDao postDao;

    @Override
    public List<PostBean> getPostBean(PostBean postBean) throws Exception {
        return postDao.getPostList(postBean);
    }

    @Override
    public PostBean getPostDetail(PostBean postBean) throws Exception {
        return postDao.getPostDetail(postBean);
    }

    @Override
    public int insertPost(PostBean postBean) throws Exception {
        return postDao.insertPost(postBean);
    }

    @Override
    public int updatePost(PostBean postBean) throws Exception {
        return postDao.updatePost(postBean);
    }

    @Override
    public int deletePost(PostBean postBean) throws Exception {
        return postDao.deletePost(postBean);
    }
}
