FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json 복사 후 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 복사
COPY . .

# 포트 열기 (React 개발서버)
EXPOSE 3000

# 개발 서버 실행
CMD ["npm", "start"]