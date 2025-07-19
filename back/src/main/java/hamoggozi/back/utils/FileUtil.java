package hamoggozi.back.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Component
public class FileUtil {
    private final String POST_IMG_TEMP_DIRECTORY = "C:/hamo/post/tmp/images/";
    private final String POST_IMG_TEMP_URL_DIRECTORY = "http://localhost:8080/temp-images/";
    private final String POST_IMG_DIRECTORY = "C:/hamo/post/images/";
    private final String POST_IMG_URL_DIRECTORY = "http://localhost:8080/images/";

    // 폴더 없을 경우 생성
    public void createDirectory(String directory) throws Exception {
        Path path = Paths.get(directory);
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
    }

    //uuid + 파일이름
    public String extractFileUrl(String url) {
        if (url == null) return null;
        int idx = url.indexOf("/images/");
        if (idx < 0) return null;
        return url.substring(idx);
    }

    //파일 업로드
    public String uploadFile(String type, MultipartFile file, String fileName) throws Exception {

        if("temp".equals(type)){
            createDirectory(POST_IMG_TEMP_DIRECTORY);

            Path path = Paths.get(POST_IMG_TEMP_DIRECTORY + fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        }

        return POST_IMG_TEMP_URL_DIRECTORY + fileName;
    }

    //파일 이동
    public String moveFile(String fileUrl) throws Exception {
        createDirectory(POST_IMG_DIRECTORY);

        String fileName = Paths.get(new URI(fileUrl).getPath()).getFileName().toString();

        Path tempPath = Paths.get(POST_IMG_TEMP_DIRECTORY + fileName);
        Path permPath = Paths.get(POST_IMG_DIRECTORY + fileName);

        if (Files.exists(tempPath)) {
            Files.move(tempPath, permPath, StandardCopyOption.REPLACE_EXISTING);
        }
        return POST_IMG_URL_DIRECTORY + fileName;
    }

    //임시 폴더 파일 삭제
    public void deleteTempFile(String fileUrl) throws Exception {
        String fileName = Paths.get(new URI(fileUrl).getPath()).getFileName().toString();
        Path tempPath = Paths.get(POST_IMG_TEMP_DIRECTORY + fileName);

        Files.deleteIfExists(tempPath);
    }

    //영구 폴더 파일 삭제
    public void deleteFile(String fileUrl) throws Exception {
        String fileName = Paths.get(new URI(fileUrl).getPath()).getFileName().toString();
        Path path = Paths.get(POST_IMG_DIRECTORY + fileName);

        Files.deleteIfExists(path);
    }

}
