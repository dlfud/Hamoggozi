하모꼬지
-- 개인 블로그 게시판 프로젝트 --

사용 언어
- mysql 8.0.37
- java 17
- react
- nodejs

springboot 세팅
- Spring Boot Dev Tools
- Lombok
- Spring Web
- Spring Data JPA
- Spring Security
- MySQL Driver
- Mybatis
- JWT 사용


- react login, logout 구현


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
