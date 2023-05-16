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
   - Spring Boot : 2.7.10
   - Java : 11.0.17
   - Gradle : 7.6.1
2. Front-end
   - Node.js : 18.15.0
   - Next.js : 13.3.0
   - Typescript : 5.0.4
3. 그 외
   - DB : MySQL 8.0.32
   - Server : AWS EC2 Ubuntu 20.04 LTS

## 3. 외부 서비스

- Kakao OAuth2
- Redis LTS
- Sonarqube

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

## 5. 배포관련 설정

- mySQL 설치

  ```bash
  $ cd /home/ubuntu/Dockerfiles/db
  $ docker build -t mysql -f Dockerfile-mysql .
  $ docker run -d -p 3300:3306 -v /home/ubuntu/db:/var/lib/mysql --name mysql --restart=always mysql
  ```

- Redis 설치

  ```bash
  $ cd /home/ubuntu/Dockerfiles/redis
  $ docker build -t redis -f Dockerfile-redis .
  $ docker run -d -p 3301:6379 --name redis --restart=always redis
  ```

- Jenkins 설치

  ```bash
  $ cd /home/ubuntu/Dockerfiles/jenkins
  $ docker build -t jenkins -f Dockerfile-jenkins .
  $ docker run -d --name jenkins --restart=always -p 9090:8080 -v /home/ubuntu/jenkins:/var/jenkins_home -v /usr/bin/docker:/usr/bin/docker -v /var/run/docker.sock:/var/run/docker.sock -u root jenkins
  ```

- image server 생성

  ```bash
  $ docker run -d --name image --restart always --network ubuntu_default -e TZ=Asia/Seoul -p 8082:80 -v /home/ubuntu/images:/usr/share/nginx/html/images nginx:latest
  ```

- sonarqube 설치

  ```bash
    $ cd /home/ubuntu/Dockerfiles/sonarqube
    $ docker build -t sonarqube -f Dockerfile-sonarqube .
    $ docker run --name sonarqube --network ubuntu_default -d -p 9000:9000 -it -e TZ=Asia/Seoul -v /home/ubuntu/sonarqube/data:/opt/sonarqube/data -v /home/ubuntu/sonarqube/logs:/opt/sonarqube/logs -v /home/ubuntu/sonarqube/extensions:/opt/sonarqube/extensions sonarqube
  ```

- elastic
  ```
  $ cd /home/ubuntu/elastic/docker-elk
  $ docker-compose up -d
  ```

## 6. 빌드

1. Front-end
   ```bash
   $ npm i
   $ npx next build
   $ npx next start
   ```
2. Back-end

   Business-Server, Auth-Server

   ```bash
   $ ./gradlew build
   $ java -jar app.jar
   ```
