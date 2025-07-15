package hamoggozi.back.post.controller;

import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import hamoggozi.back.dto.PostBean;
import hamoggozi.back.dto.UserBean;
import hamoggozi.back.general.service.GeneralServiceI;
import hamoggozi.back.jwt.JwtUtil;
import hamoggozi.back.jwt.RedisService;
import hamoggozi.back.post.service.PostService;
import hamoggozi.back.post.service.PostServiceI;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class PostController {
    @Autowired
    private PostServiceI postService;
    @Autowired
    private GeneralServiceI generalService;
    @Autowired
    private JwtUtil jwtUtil;

    @RequestMapping(value="/post/getPostList", method=RequestMethod.POST)
    public ResponseEntity<List<PostBean>> getPostList(@RequestBody PostBean postBean) throws Exception {
        List<PostBean> postList = postService.getPostBean(postBean);
        return ResponseEntity.ok().body(postList);
    }

    //html To markdown
    public String htmlToMarkdown(String html) {
        FlexmarkHtmlConverter converter = FlexmarkHtmlConverter.builder().build();
        return converter.convert(html);
    }

    @RequestMapping(value="/post/getPostDetail", method=RequestMethod.POST)
    public ResponseEntity<PostBean> getPostDetail(@RequestHeader("Authorization") String authHeader, @RequestBody PostBean postBean) throws Exception {
        PostBean postDetail = postService.getPostDetail(postBean);
        String token = authHeader.replace("Bearer ", "");
        String userId = jwtUtil.getUsername(token);
        postDetail.setUserName(userId);
        postDetail.setContent(htmlToMarkdown(postDetail.getContent()));
        return ResponseEntity.ok().body(postDetail);
    }

    @RequestMapping(value="/post/insertPost", method=RequestMethod.POST)
    public ResponseEntity<Map<String, String>> insertPost(@RequestHeader("Authorization") String authHeader, @RequestBody PostBean postBean) throws Exception {
        Map<String, String> resultMap = new HashMap<>();

        String token = authHeader.replace("Bearer ", "");
        Claims claims = jwtUtil.parseToken(token);
        int uid = claims.get("uid", Integer.class);
        postBean.setUserUid(uid);
        postBean.setInsertBy(uid);
        postBean.setUpdateBy(uid);
        String sanitizedContent = Jsoup.clean(postBean.getContent(), Safelist.basicWithImages());
        postBean.setContent(sanitizedContent);
        int result = postService.insertPost(postBean);
        if(result > 0) {
            resultMap.put("status", "success");
            resultMap.put("code", "200");
        }
        return ResponseEntity.ok().body(resultMap);
    }

    @RequestMapping(value="/post/updatePost", method=RequestMethod.POST)
    public ResponseEntity<Map<String, String>> updatePost(@RequestHeader("Authorization") String authHeader, @RequestBody PostBean postBean) throws Exception {
        Map<String, String> resultMap = new HashMap<>();

        String token = authHeader.replace("Bearer ", "");
        Claims claims = jwtUtil.parseToken(token);
        int uid = claims.get("uid", Integer.class);
        postBean.setUserUid(uid);
        postBean.setInsertBy(uid);
        postBean.setUpdateBy(uid);
        String sanitizedContent = Jsoup.clean(postBean.getContent(), Safelist.basicWithImages());
        postBean.setContent(sanitizedContent);
        int result = postService.updatePost(postBean);
        if(result > 0) {
            resultMap.put("status", "success");
            resultMap.put("code", "200");
        }
        return ResponseEntity.ok().body(resultMap);
    }

    @RequestMapping(value="/post/deletePost", method=RequestMethod.POST)
    public ResponseEntity<Map<String, String>> deletePost(@RequestBody PostBean postBean) throws Exception {
        Map<String, String> resultMap = new HashMap<>();

        int result = postService.deletePost(postBean);
        if(result > 0) {
            resultMap.put("status", "success");
            resultMap.put("code", "200");
        }
        return ResponseEntity.ok().body(resultMap);
    }
}
