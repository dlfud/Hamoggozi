package hamoggozi.back.oneDiary.controller;


import hamoggozi.back.dto.OneDiaryBean;
import hamoggozi.back.jwt.JwtUtil;
import hamoggozi.back.oneDiary.service.OneDiaryServiceI;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class OneDiaryController {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private OneDiaryServiceI oneDiaryService;

    @RequestMapping(value="/oneDiary/getOneDiaryList", method=RequestMethod.POST)
    public ResponseEntity<List<OneDiaryBean>> getOneDiaryList(@RequestBody OneDiaryBean oneDiaryBean) throws Exception {
        return ResponseEntity.ok().body(oneDiaryService.getOneDiaryList(oneDiaryBean));
    }

    @RequestMapping(value="/oneDiary/saveOneDiary", method= RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> saveOneDiary(@RequestHeader("Authorization") String authHeader, @RequestBody OneDiaryBean oneDiaryBean) throws Exception{
        Map<String, Object> resultMap = new HashMap<>();

        String token = authHeader.replace("Bearer ", "");
        Claims claims = jwtUtil.parseToken(token);
        int uid = claims.get("uid", Integer.class);
        oneDiaryBean.setUserUid(uid);
        oneDiaryBean.setInsertBy(uid);
        oneDiaryBean.setUpdateBy(uid);

        int result = oneDiaryService.saveOneDiary(oneDiaryBean);
        if(result > 0) {
            resultMap.put("code", "200");
            resultMap.put("status", "success");
        }
        return ResponseEntity.ok().body(resultMap);
    }
}
