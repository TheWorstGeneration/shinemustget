# Porting Manual

## 목차

1. 프로젝트 사용 도구
2. 개발환경
3. 외부 서비스
4. .gitignore 처리한 파일
5. 배포관련 설정
6. 빌드

## 1. 프로젝트 사용 도구

이슈 관리 : JIRA

형상 관리 : Gitlab

커뮤니케이션 : Notion, Kakaotalk, Mattermost

디자인 : Figma

UCC :

CI/CD : Jenkins, Docker

## 2. 개발환경

1. Back-end
   - Spring Boot : 2.7.9
   - Java : 11.0.17
2. Front-end
   - Node.js : 18.16.0
   - Next.js : 13.2.3
   - Typescript : 4.9.5
3. 그 외
   - MySQL : 8.0.32
   - AWS : EC2 Ubuntu 20.04 LTS

## 3. 외부 서비스

- Redis
- S3
  - CORS 정책
  ```
  [
      {
          "AllowedHeaders": [
              "*"
          ],
          "AllowedMethods": [
              "PUT",
              "POST",
              "GET",
              "HEAD"
          ],
          "AllowedOrigins": [
              "*"
          ],
          "ExposeHeaders": [
              "x-amz-server-side-encryption",
              "x-amz-request-id",
              "x-amz-id-2"
          ],
          "MaxAgeSeconds": 3000
      }
  ]
  ```
- Cloud Front
  - 배포 도메인 이름 :

## 4. .gitignore 처리한 파일

- Next
  - .env (/ 에 위치)
  ```
  NEXT_PUBLIC_OPEN_AI_API_KEY= [API 키]
  NEXT_PUBLIC_KAKAO_SDK_KEY= [SDK 키]
  NEXT_PUBLIC_KAKAO_REDIRECTURI="https://shinemustget.com/login/oauth2/code/kakao"
  NEXT_PUBLIC_LOGIN_REDIRECTURI="https://shinemustget.com/oauth2/authorization/kakao"
  ```
- Spring

  - application-auth.yml (/src/main/resources 에 위치)

  ```
  spring:
    security:
      oauth2:
        client:
          registration:
            kakao:
              client-id: [API 키]
              client-secret: [SECRET 키]
              redirect-uri: https://shinemustget.com/login/oauth2/code/kakao
              authorization-grant-type: authorization_code
              client-authentication-method: POST
              client-name: Kakao
              scope:
                - profile_image
          provider:
            kakao:
              authorization-uri: https://kauth.kakao.com/oauth/authorize
              token-uri: https://kauth.kakao.com/oauth/token
              user-info-uri: https://kapi.kakao.com/v2/user/me
              user-name-attribute: id

  # JWT
  jwt:
    header: Authorization
    secret: [JWT SECRET 키]
    token-validity-in-seconds: 3600
  ```

  - application-s3.yml (/src/main/resources 에 위치)

  ```
  # s3
  cloud:
    aws:
      credentials:
        accessKey: [ACCESS 키]
        secretKey: [SECRET 키]
      s3:
        bucket: haru-palette
      region:
        static: ap-northeast-2
      stack:
        auto: false

    # multipartFile 용량 늘려주는 설정
    servlet:
      multipart:
        max-file-size: 100MB
        max-request-size: 100MB
  ```

## 5. 배포관련 설정

- Nginx 설정

  ```bash
  server {
      # 서버가 Listen할 포트를 지정합니다.
      listen 443 ssl;
      # IPv6 및 IPv4 모두에서 해당 포트를 수신 대기하도록 설정합니다.
      listen [::]:443 ssl;

      # 서버의 도메인 이름을 지정합니다.
      server_name shinemustget.com;

      ssl_certificate /etc/letsencrypt/live/shinemustget.com/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/shinemustget.com/privkey.pem;

      # 프론트엔드
      location / {
          proxy_pass http://localhost:3000;

          # "Host" 요청 헤더를 설정합니다. 이는 프록시 서버가 클라이언트로부터 요청이 온 것처럼 보이도록 합니다.
          proxy_set_header Host $host;

          # "X-Real-IP" 요청 헤더를 설정합니다. 이는 프록시 서버에 실제 IP 주소를 전달합니다.
          proxy_set_header X-Real-IP $remote_addr;

          # "X-Forwarded-For" 요청 헤더를 설정합니다. 이는 클라이언트 IP 주소 와 프록시 서버 IP 주소를 포함하여 전달합니다.
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      }

      # 백엔드 비즈니스 서버
      location /api {
          proxy_pass http://localhost:8080;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

          # proxy를 통해서 데이터를 읽을 때 타임아웃
          proxy_read_timeout 120s;
      }

      # 백엔드 인증 서버
      location ~ ^/(login|oauth2) {
          proxy_pass http://localhost:8090;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      }
  }
  ```

## 6. 빌드

1. Front-end
   ```bash
   $ npm i
   $ npm run build
   ```
2. Back-end

   Business-Server, Auth-Server

   ```bash
   $ ./gradlew build
   $ java -jar app.jar
   ```
