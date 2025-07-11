하모꼬지
-- 개인 블로그 게시판 프로젝트 --

사용 언어
- mysql 8.0.37
- java 17
- react
- nodejs

springboot 세팅 (3.5.3)
- react
- Spring Web
- Spring Security
- MySQL Driver
- HikariCP
- Mybatis (3.0.3)
- JWT 
- redis 
- lettuce
- docker (4.43.1)

해야 할 일
- 로그인 성공
- 로그인 시 틀려서 에러날 경우 팝업 처리

2025-07-11(금)
- secretKey 긴걸로 변경
- luttuce 의존성 추가
- redis, react, springboot docker사용으로 변경 중 (docker run -d -p 6379:6379 --name my-redis redis)
    -> react, springboot까지 docker에 넣어서 사용하려고 했으나 변경시 다시 빌드해야하는 번거로움이 있음. 일단 redis만 빌드해서 사용 시도
    -> springboot jar파일 배포 위치 프로젝트 안으로 변경 -> Dockerfile의 상대경로로 찾기 때문에 변경
    -> cd C:\project\hamoggozi   ->   docker-compose up --build


2025-07-10(목)
- 한참 binding에러 찾다가 못잡아서 새로 back springboot 생성 -> join 성공확인


2025-07-09(수)
- xml파일 읽는데 에러남 (org.apache.ibatis.binding.BindingException: Invalid bound statement (not found):) -> 아직 해결중


2025-07-08(화)
- 회원가입 페이지 추가
- controller -> serviceI -> service -> dao -> .xml mybatis 사용 방식으로 쿼리 작성
- JPA로 계속 인식되는 문제 -> dto bean설정시 어노테이션 제거, dao @Mapper 설정 및 상속 제거, application에 @MapperScan설정, xml 파일 내용 수정
implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.3'버전 3.0.2 -> 3.0.3으로 변경


2025-07-07(월)
- react 다시 설정
- CORS 허용 설정


2025-07-04(금)
- JWT, SpringSecurity, redis 사용 login, logout 구현 시도
- route, ejs 사용 x -> react로 변경


2025-02-16(일)
- JSESSIONID 사용 x JWT로만 login, logout구현 시도


2025-02-14(금)
- logout 구현 실패


2025-02-11(화)
- jwt 사용 로그인 토큰 받아오기 성공
- 공통 Bean 추가
- Cors 설정 ->  React (http://localhost:3000)와 Spring Boot (http://localhost:8080)가 다른 도메인이라 CORS 필요!
- JSESSIONID 사용 -> securityConfig 설정 추가, credentials: "include"로 react 쿠키 포함 추가


2025-02-10(월)
- JWT의존성 주입
- config 세팅 버전 오류 참고 https://jypark1111.tistory.com/192
- jwtUtil, jwtFilter, securityConfig추가


2025-02-09(일)
- 데이터 갖고 오는지 테스트 완료
- post로 데이터 보내기 완료


2025-02-07(금)
- mybatis의존성 추가 implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.2'
    (MyBatis는 SQL을 XML 파일로 따로 관리)
- service단 interface파일 추가
- resources폴더로 xml파일 옮기고 yml설정 추가 (https://aljjabaegi.tistory.com/697 참고)
- xml파일 resources폴더로 이동 및 yml설정 추가로 에러 해결
- spring security 초기 로그인 화면 넘어가도록 application 수정
- mybatis sql 설정 삭제 (git에는 올릴예정)


2025-02-04(화)
- user테이블, onelinediary테이블 생성 후 임시 데이터 추가
- 일단 에러가 안나도록 xml파일이랑 controller, service, dao, dto 추가


2025-02-02 (일)
- mysql user 생성 및 hamo DB생성
- spring boot 프로젝트 생성 및 세팅
- react 프로젝트 생성 및 세팅


2025-01-27 (월)
- mysql, java, react, nodejs, vscode, git설치
