package hamoggozi.back.category.controller;

import hamoggozi.back.category.service.CategoryServiceI;
import hamoggozi.back.dto.CategoryBean;
import hamoggozi.back.dto.UserBean;
import hamoggozi.back.general.service.GeneralServiceI;
import hamoggozi.back.jwt.JwtUtil;
import hamoggozi.back.jwt.RedisService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class CategoryController {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private GeneralServiceI generalService;
    @Autowired
    private CategoryServiceI categoryService;


    @RequestMapping(value="/setting/category/getCategoryList", method=RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> getCategoryList(@RequestHeader("Authorization") String authHeader, @RequestBody CategoryBean categoryBean) throws Exception{
        Map<String, Object> resultMap = new HashMap<>();
        String token = authHeader.replace("Bearer ", "");
        Claims claims = jwtUtil.parseToken(token);
        int uid = claims.get("uid", Integer.class);

        int checkGroupUser = generalService.checkGroupUser(categoryBean.getGroupUid(), uid);
        if(checkGroupUser > 0){
            String checkAuth = generalService.checkAuth(categoryBean.getGroupUid(), uid);
            if("MANAGER".equals(checkAuth)){
                resultMap.put("status", "success");
                resultMap.put("code", "200");
                resultMap.put("list", categoryService.getCategoryList(categoryBean));
            }else{
                resultMap.put("status", "fail");
                resultMap.put("code", "200");
                resultMap.put("massage", "권한이 없습니다.");
            }
        }else{
            resultMap.put("status", "fail");
            resultMap.put("code", "200");
            resultMap.put("massage", "그룹에 속한 유저가 아닙니다.");
        }

        return ResponseEntity.ok(resultMap);
    }

    @RequestMapping(value="/setting/category/insertCategory",method=RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> insertCategory(@RequestHeader("Authorization") String authHeader, @RequestBody CategoryBean categoryBean) throws Exception{
        Map<String, Object> resultMap = new HashMap<>();

        String token = authHeader.replace("Bearer ", "");
        Claims claims = jwtUtil.parseToken(token);
        int uid = claims.get("uid", Integer.class);
        int checkGroupUser = generalService.checkGroupUser(categoryBean.getGroupUid(), uid);
        if(checkGroupUser > 0){
            String checkAuth = generalService.checkAuth(categoryBean.getGroupUid(), uid);
            if("MANAGER".equals(checkAuth)){
                categoryBean.setUserUid(uid);
                if(categoryBean.getUpCategory() > 0){
                    categoryBean.setDepth(2);
                }else{
                    categoryBean.setDepth(1);
                }
                resultMap.put("status", "success");
                resultMap.put("code", "200");
                resultMap.put("list", categoryService.insertCategory(categoryBean));
            }else{
                resultMap.put("status", "fail");
                resultMap.put("code", "200");
                resultMap.put("massage", "권한이 없습니다.");
            }
        }else{
            resultMap.put("status", "fail");
            resultMap.put("code", "200");
            resultMap.put("massage", "그룹에 속한 유저가 아닙니다.");
        }

        return ResponseEntity.ok(resultMap);
    }

    @RequestMapping(value="/setting/category/updateCategory",method=RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> updateCategory(@RequestHeader("Authorization") String authHeader, @RequestBody CategoryBean categoryBean) throws Exception{
        Map<String, Object> resultMap = new HashMap<>();

        String token = authHeader.replace("Bearer ", "");
        Claims claims = jwtUtil.parseToken(token);
        int uid = claims.get("uid", Integer.class);
        int checkGroupUser = generalService.checkGroupUser(categoryBean.getGroupUid(), uid);
        if(checkGroupUser > 0){
            String checkAuth = generalService.checkAuth(categoryBean.getGroupUid(), uid);
            if("MANAGER".equals(checkAuth)){
                categoryBean.setUserUid(uid);
                if(categoryBean.getUpCategory() > 0){
                    categoryBean.setDepth(2);
                }else{
                    categoryBean.setDepth(1);
                }
                resultMap.put("status", "success");
                resultMap.put("code", "200");
                resultMap.put("list", categoryService.updateCategory(categoryBean));
            }else{
                resultMap.put("status", "fail");
                resultMap.put("code", "200");
                resultMap.put("massage", "권한이 없습니다.");
            }
        }else{
            resultMap.put("status", "fail");
            resultMap.put("code", "200");
            resultMap.put("massage", "그룹에 속한 유저가 아닙니다.");
        }

        return ResponseEntity.ok(resultMap);
    }

    @RequestMapping(value="/setting/category/deleteCategory",method=RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> deleteCategory(@RequestHeader("Authorization") String authHeader, @RequestBody CategoryBean categoryBean) throws Exception{
        Map<String, Object> resultMap = new HashMap<>();

        String token = authHeader.replace("Bearer ", "");
        Claims claims = jwtUtil.parseToken(token);
        int uid = claims.get("uid", Integer.class);
        int checkGroupUser = generalService.checkGroupUser(categoryBean.getGroupUid(), uid);
        if(checkGroupUser > 0){
            String checkAuth = generalService.checkAuth(categoryBean.getGroupUid(), uid);
            if("MANAGER".equals(checkAuth)){
                categoryBean.setUserUid(uid);
                resultMap.put("status", "success");
                resultMap.put("code", "200");
                resultMap.put("list", categoryService.deleteCategory(categoryBean));
            }else{
                resultMap.put("status", "fail");
                resultMap.put("code", "200");
                resultMap.put("massage", "권한이 없습니다.");
            }
        }else{
            resultMap.put("status", "fail");
            resultMap.put("code", "200");
            resultMap.put("massage", "그룹에 속한 유저가 아닙니다.");
        }

        return ResponseEntity.ok(resultMap);
    }

}
