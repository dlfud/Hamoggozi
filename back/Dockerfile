# 1. Java 런타임이 포함된 베이스 이미지 사용
FROM openjdk:17-jdk-alpine

# 2. 애플리케이션 jar 파일을 컨테이너 내부에 복사
COPY out/back.main.jar app.jar

# 3. 컨테이너가 실행될 때 실행할 명령어
ENTRYPOINT ["java", "-jar", "/app.jar"]

# (선택) 기본 포트 노출 (보통 8080)
EXPOSE 8080