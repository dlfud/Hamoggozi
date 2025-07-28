package hamoggozi.back.post.controller;

import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import hamoggozi.back.dto.*;
import hamoggozi.back.general.service.GeneralServiceI;
import hamoggozi.back.group.service.GroupServiceI;
import hamoggozi.back.jwt.JwtUtil;
import hamoggozi.back.jwt.RedisService;
import hamoggozi.back.post.service.PostService;
import hamoggozi.back.post.service.PostServiceI;
import hamoggozi.back.utils.FileUtil;
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
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
public class PostController {
    @Autowired
    private PostServiceI postService;
    @Autowired
    private GeneralServiceI generalService;
    @Autowired
    private GroupServiceI groupService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private FileUtil fileUtil;

    @RequestMapping(value="/post/getPostList", method=RequestMethod.POST)
    public ResponseEntity<List<PostBean>> getPostList(@RequestBody PostBean postBean) throws Exception {
        List<PostBean> postList = postService.getPostList(postBean);
        return ResponseEntity.ok().body(postList);
    }

    //html To markdown
    public String htmlToMarkdown(String html) {
        FlexmarkHtmlConverter converter = FlexmarkHtmlConverter.builder().build();
        return converter.convert(html);
    }

    @RequestMapping(value="/post/getPostDetail", method=RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> getPostDetail(@RequestHeader("Authorization") String authHeader, @RequestBody PostBean postBean) throws Exception {
        GroupUserBean groupUserBean = new GroupUserBean();
        groupUserBean.setGroupUid(postBean.getGroupUid());
        groupUserBean.setUserUid(postBean.getUserUid());
        int result = groupService.checkGroupUser(groupUserBean);

        Map<String, Object> resultMap = new HashMap<>();
        if(result > 0) {
            PostBean postDetail = postService.getPostDetail(postBean);
            String token = authHeader.replace("Bearer ", "");
            String userId = jwtUtil.getUsername(token);
            postDetail.setUserName(userId);
            postDetail.setContent(htmlToMarkdown(postDetail.getContent()));
            resultMap.put("code", "200");
            resultMap.put("status", "success");
            resultMap.put("result", postDetail);
        }else{
            resultMap.put("code", "200");
            resultMap.put("status", "fail");
        }

        return ResponseEntity.ok().body(resultMap);
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

        //임시폴더 영구폴더로 이동 및 내용 url치환
        for(String fileUrl: postBean.getMoveFile()){
            String moveUrl = fileUtil.moveFile(fileUrl);
            postBean.setContent(postBean.getContent().replaceAll(fileUrl, moveUrl));

            FileBean fileBean = new FileBean();
            String url = fileUtil.extractFileUrl(moveUrl);
            fileBean.setFileName(url.split("/")[2].split("_")[1]);
            fileBean.setPublickey(url.split("/")[2].split("_")[0]);
            fileBean.setSaveName(url.split("/")[2]);
            fileBean.setUrl(url);
            generalService.insertFile(fileBean);
        }
        //임시폴더에서 삭제한 이미지 삭제
        for(String fileUrl: postBean.getTempDeleteFile()){
            fileUtil.deleteTempFile(fileUrl);
        }

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

        //영구 폴더에서 이미지 삭제
        for(String fileUrl: postBean.getDeleteFile()){
            fileUtil.deleteFile(fileUrl);

            String url = fileUtil.extractFileUrl(fileUrl);
            generalService.deleteFile(url);
        }
        //임시폴더 영구폴더로 이동 및 내용 url치환
        for(String fileUrl: postBean.getMoveFile()){
            String moveUrl = fileUtil.moveFile(fileUrl);
            postBean.setContent(postBean.getContent().replaceAll(fileUrl, moveUrl));

            FileBean fileBean = new FileBean();
            String url = fileUtil.extractFileUrl(moveUrl);
            fileBean.setFileName(url.split("/")[2].split("_")[1]);
            fileBean.setPublickey(url.split("/")[2].split("_")[0]);
            fileBean.setSaveName(url.split("/")[2]);
            fileBean.setUrl(url);
            generalService.insertFile(fileBean);
        }
        //임시폴더에서 삭제한 이미지 삭제
        for(String fileUrl: postBean.getTempDeleteFile()){
            fileUtil.deleteTempFile(fileUrl);
        }

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

        PostBean postDetail = postService.getPostDetail(postBean);

        String regex = "<img[^>]+src=[\"']([^\">']*images[^\">']*)[\"']";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(postDetail.getContent());
        while (matcher.find()) {
            String url = matcher.group(1);
            String fileUrl = fileUtil.extractFileUrl(url);
            //폴더에서 이미지 삭제
            fileUtil.deleteFile(url);
            //DB에서 정보 삭제
            generalService.deleteFile(fileUrl);
        }

        int result = postService.deletePost(postBean);
        if(result > 0) {
            resultMap.put("status", "success");
            resultMap.put("code", "200");
        }
        return ResponseEntity.ok().body(resultMap);
    }

    //임시 폴더에 이미지 저장
    @RequestMapping(value="/post/uploadTempImg", method=RequestMethod.POST)
    public ResponseEntity<Map<String, String>> uploadTempImg(@RequestParam("tempFile") MultipartFile tempFile) throws Exception {
        Map<String, String> resultMap = new HashMap<>();

        String uuid = UUID.randomUUID().toString().replace("-", "");
        String fileName = uuid + "_" + tempFile.getOriginalFilename();

        String fileUrl = fileUtil.uploadFile("temp", tempFile, fileName);
        resultMap.put("fileUrl", fileUrl);
        return ResponseEntity.ok().body(resultMap);
    }

    //임시 폴더 이미지 삭제
    @RequestMapping(value="/post/deleteTempImg", method=RequestMethod.POST)
    public ResponseEntity<Map<String, String>> deleteTempImg(@RequestBody Map<String, List<String>> request) throws Exception {
        Map<String, String> resultMap = new HashMap<>();

        List<String> file = request.get("file");
        for(String fileUrl : file) {
            fileUtil.deleteTempFile(fileUrl);
        }

        resultMap.put("status", "success");
        resultMap.put("code", "200");
        return ResponseEntity.ok().body(resultMap);
    }
}
