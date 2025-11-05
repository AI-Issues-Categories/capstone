# 1단계: React 앱 빌드
FROM node:lts-alpine as builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install
COPY . .
# Vite: npm run build -> 'dist' 폴더 생성
RUN npm run build

# 2단계: Nginx 서버 설정
FROM nginx:stable-alpine
# 1단계에서 만든 'dist' 폴더를 Nginx의 웹 루트로 복사
COPY --from=builder /app/dist /usr/share/nginx/html
# 아래 4단계에서 만들 Nginx 설정 파일을 컨테이너 안으로 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
