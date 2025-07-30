하모꼬지
-- 개인 블로그 게시판 프로젝트 --

친구와 함께 소통하고 노는 블로그 공간

※ 계획

권한
- 주최자(매니저)
- 멤버(user)

그룹(서버)
- 누구든 그룹 생성 가능
- 로그인 하면 해당 사용자가 포함된 그룹(서버) 선택 가능
- 메인 페이지에서 사용자가 포함된 그룹(서버)로 이동 가능

공지
- 주최자 (매니저) 만 작성 / 수정 가능
- 메인 페이지 상단에 노출
- 메인 페이지 상단에서 작성 / 수정 가능


게시글
- 모든 권한이 본인글에 관해 작성 / 수정 / 삭제 가능
- 작성 시 카테고리 선택 가능 -> 주최자(매니저)가 설정 창에서 관리

- 메인 페이지
    메인 페이지 중단에 위치
    카테고리 상관없이 최신순으로 10개 노출
- 전체 글 리스트 페이지
    게시글 작성 / 수정 / 삭제 가능
    카테고리 상관없이 최신순으로 노출 개수 따라 노출
    게시글 카테고리 이동 가능
- 카테고리 별 글 리스트 페이지
    게시글 작성 / 수정 / 삭제 가능
    카테고리에 맞는 게시글 최신순으로 노출 개수 따라 노출
    게시글 카테고리 이동 가능

- 검색
    카테고리 별 검색
    글, 내용 입력값 검색

일정
- 상시 달력에 일정 컬러로 표시
- 달력 설정
    원하는 색상 지정 가능
    일정 추가 / 수정 / 삭제 가능
    표시할 사용자 일정 지정 가능

설정
- 프로필 설정
    프로필 사진 및 배경 사진 수정 / 기본 이미지 선택 가능
    별명 및 비밀번호 수정 가능
- 카테고리 설정 (주최자(매니저)만 가능)
    카테고리 생성 / 수정 / 삭제 가능
    2depth 메뉴 까지 설정 
    카테고리 삭제 시 해당 게시글 전체 DB삭제
- 사용자 관리 (주최자(매니저)만 가능)
    사용자 권한 관리 -> 초대권한 등등
    사용자 삭제 가능


사용
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
- 리프레시 토큰 로직 추가
- 로그인 시 틀려서 에러날 경우 팝업 처리
- 로그인 아이디 이메일 형식 유효성 확인 로직 추가
- 회원가입 시 아이디 겹칠 경우 회원가입 막기
- post category 도메인 추가
- 달력 할일 insert, update, delete
- 설정에서 post category 도메인 수정 페이지
- 사용자 프로필 편집 및 설정 페이지
- 사용자 프로필 이미지, 별명, 비밀번호 등등 수정 
- 배경 이미지 편집

- 추후 AWS S3에 이미지 올릴경우 CDN처리
- 개인, 비공개 게시글 일 경우 이미지 publickey 권한 제한 및 signed URL 등으로 보안 유지

- 그룹 리스트 페이지 사용자 프로필 설정 페이지 추가
- Main에서 사용자 권한 따라서 막을 거 막기
- Main에서 그룹 따라서 게시글 가져오기

- 사용자 정보 수정 페이지 추가

- Category관련 설정 및 검색 추가

- post 화면들 디자인
- 왼쪽 메뉴 디자인
- domain DB 테이블 추가
- category 수정 로직 추가
- category 설정 화면 추가

2025-07-30(수)
- 페이지 새로고침 하면 데이터 다시 가져오도록 수정
- post 페이징 처리 추가


2025-07-29(화)
- post 이동 경로 변경
- 일단 사용자가 그룹에 속하는지, 게시글이 그룹에 속하는지, 게시글이 사용자에 속하는지 체크 후 업데이트


2025-07-28(월)
- post 제목 및 내용 검색 추가
- post category 검색 추가
- post 개수 검색 추가
- 중복으로 함수 불러오는 오류 수정중 -> post detail 화면 들어갔을 때 데이터 안나옴


2025-07-24(목)
- 그룹 리스트 페이지 로그아웃 추가
- 레이아웃 상단에 user정보 넣음
- 레이아웃 상단에 해당 사용자가 포함된 그룹들 표시 및 이동 가능
- 공지 MANAGER 권한일 경우에만 수정 보이도록 버그 수정
- 공지 저장 및 수정 기능 추가


2025-07-23(수)
- 그룹 권한 DB테이블 추가
- oneDiary DB삭제 및 코드 삭제
- 로그인 시 해당 사용자가 포함 된 그룹 리스트 보임
- 그룹에 포함되지 않는 사용자가 접근할 시 인증되지 않은 사용자로 막음


2025-07-22(화)
- 공지 위치 잡음


2025-07-21(월)
- oneDiary 리스트 불러옴
- oneDiary 저장 추가
- 디자인 수정


2025-07-20(일)
- 회원가입 디자인
- 메인 페이지 디자인
- 로그아웃 버튼 상단으로 이동


2025-07-19(토)
- file DB 테이블 생성 및 글 저장 시 파일 정보 저장
- 글 수정 시 기존 이미지 삭제 시 폴더에서 삭제 및 DB정보 삭제
- 글 수정 시 한글 인코딩 서버단에서 디코딩 처리 추가
- 글 수정 시 이미지 추가 시 폴더 이동, 추가한 이미지 삭제 시 임시 폴더에서 삭제처리
- 글 삭제 시 폴더 내 이미지 및 DB삭제 처리
- 로그인 화면 디자인


2025-07-17(목)
- 글 작성 시 이미지 로컬 임시 폴더에 저장 후 미리보기로 가져오기 추가
- 글 작성 취소 시 임시폴더 이미지 삭제 후 변수 초기화
- 글 저장 시 임시폴더 이미지 영구폴더로 이동
- 글 저장 시 url 임시폴더에서 영구폴더로 치환
- 글 상세정보 볼 때 이미지 나옴


2025-07-15(화)
- CKEditor 5 react 라이브러리 추가
- react markdown 라이브러리 추가
- react turndown 라이브러리 추가
- react marked 라이브러리 추가
- jsoup 의존성 추가
- flexmark-java 의존성 추가
- html 저장 및 마크다운변환 후 데이터 불러와서 뿌림
- post 입력 및 수정 기능 추가


2025-07-14(월)
- 로그인 화면에 회원가입 버튼 추가
- jstl의존성 추가
- post DB테이블 추가
- post테이블에서 useruid에 해당하는 값 가져옴
- /으로 진입 시 토큰과 유효한지 확인 후 /main으로 보냄
- category별로 가져오도록 쿼리문 if문 추가
- 상단, left레이아웃 임의로 추가
- post 상세페이지 이동 추가
- post 상세 페이지 삭제 기능 추가


2025-07-12(토)
- /main 함수 생성
- 로그인 및 로그아웃 확인


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
