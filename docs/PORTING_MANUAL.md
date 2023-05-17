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

UCC : movavi

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
    BASE_URL="http://www.shinemustget.com"
    NEXT_PUBLIC_LOGIN_REDIRECTURI="/api/oauth2/authorization/kakao"
    NEXT_PUBLIC_LOGOUT_REDIRECTURI="https://kauth.kakao.com/oauth/logout?client_id=2e076ec2c494a09a9d214c3658d64dcf&logout_redirect_uri=https://shinemustget.com"
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

- 초기설정

  - Docker 설치

    ```bash
    # 1.최신 패키지 리스트 업데이트
    $ sudo apt update

    # 2.docker 다운로드를 위해 필요한 https 관련 패키지 설치
    $ sudo apt install apt-transport-https ca-certificates curl softwareproperties-common

    # 3.docker repository 접근을 위한 GPG key 설정
    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

    # 4.docker repository 등록
    $ sudo add-apt-repository "deb [arch=amd64]https://download.docker.com/linux/ubuntu focal stable"

    # 5.등록한 docker repository 까지 포함한 최신 패키지 리스트 업데이트
    $ sudo apt update

    # 6.docker 설치
    $ sudo apt install docker-ce

    # 7.서버 재부팅 할 때 도커를 자동으로 실행할 수 있는 설정
    $ sudo systemctl enable docker.service
    $ sudo systemctl enable containerd.service

    # 8.현 사용자(ubuntu)ID를 docker group 에 포함
    $ sudo usermod -aG docker ${USER}

    # 9.터미널 끊고 다시 ssh로 접속 후 현 ID가 docker group에 포함되어 있는지를 확인
    $ id -nG

    # 10.docker-compose 설치
    $ sudo curl -L "https://github.com/docker/compose/releases/download/1.28.2/dockercompose-$(uname -s)-$(uname -m)" -o /usr/local/bin/dock

    # 11.실행 권한 주기
    $ sudo chmod +x /usr/local/bin/docker-compose
    ```

  - 필요한 폴더 및 파일 생성
    - init.zip 폴더 압축 풀어서 내용물 home/ubuntu/ 아래로 이동

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
  $ cd /home/ubuntu/Dockerfiles/be && mkdir -p /home/ubuntu/jenkins/workspace/client/be/smg && sudo cp Dockerfile /home/ubuntu/jenkins/workspace/client/be/smg/Dockerfile
  $ cd /home/ubuntu/Dockerfiles/fe && mkdir -p /home/ubuntu/jenkins/workspace/client/fe && sudo cp Dockerfile /home/ubuntu/jenkins/workspace/client/fe/Dockerfile
  ```

- sonarqube 설치

  ```bash
  $ cd /home/ubuntu/Dockerfiles/sonarqube
  $ docker build -t sonarqube -f Dockerfile-sonarqube .
  $ docker run --name sonarqube --network ubuntu_default -d -p 9000:9000 -it -e TZ=Asia/Seoul -v /home/ubuntu/sonarqube/data:/opt/sonarqube/data -v /home/ubuntu/sonarqube/logs:/opt/sonarqube/logs -v /home/ubuntu/sonarqube/extensions:/opt/sonarqube/extensions sonarqube
  ```

- elastic

  ```bash
  $ cd /home/ubuntu/elastic/docker-elk
  $ docker-compose up -d
  ```

- proxy server 생성

  ```bash
  $ cd /home/ubuntu
  $ docker-compose up -d
  ```

- image server 생성

  ```bash
  $ docker run -d --name image --restart always --network ubuntu_default -e TZ=Asia/Seoul -p 8082:80 -v /home/ubuntu/images:/usr/share/nginx/html/images nginx:latest
  ```

- jenkins script

  ```groovy
  pipeline {
      agent any

      environment {
          GIT_URL = "https://lab.ssafy.com/s08-final/S08P31B109.git"
      }

      tools {
          nodejs "nodejs"
          gradle "gradle"
      }

      stages {
          stage('Pull') {
              steps {
                  git url: "${GIT_URL}", branch: "master", poll: true, changelog: true, credentialsId: 'jenkinsidpwd'
              }
          }

          stage('FE') {
              when {
                  expression {
                      sh(
                          script: "git log -n 1 --name-only -p --pretty=format:\"%h\" --first-parent | grep '^fe/'",
                          returnStatus: true
                        ) == 0
                  }
              }
              steps {
                  dir('fe') {
                      sh 'docker build -t fe ./'
                  }
                  sh "if [ \"\$(docker ps -q --filter name=fe)\" != \"\" ]; then docker stop fe && docker rm fe; fi"
                  sh "docker run -d --name fe --restart=always -e TZ=Asia/Seoul -p 3000:3000 -u root fe"
                  sh "docker network connect ubuntu_default fe"
              }
          }

          stage('BE') {
              when {
                  expression {
                      sh(
                          script: "git log -n 1 --name-only -p --pretty=format:\"%h\" --first-parent | grep '^be/'",
                          returnStatus: true
                        ) == 0
                  }
              }
              steps {
                  dir('be/smg') {
                      sh "gradle clean build"
                      sh 'docker build -t be ./'
                  }
                  sh "if [ \"\$(docker ps -q --filter name=be)\" != \"\" ]; then docker stop be && docker rm be; fi"
                  sh "docker run -d --name be --restart=always -e TZ=Asia/Seoul -p 8080:8080 -p 5005:5005 be"
                  sh "docker network connect ubuntu_default be"


                  withSonarQubeEnv('Devops') {
                          sh "cd be/smg && chmod -R 777 gradlew && ./gradlew sonarqube"
                      }
              }
          }

          // SonarQube analysis stage
        stage('SonarQube analysis be') {
            when {
                  expression {
                      sh(
                          script: "git log -n 1 --name-only -p --pretty=format:\"%h\" --first-parent | grep '^be/'",
                          returnStatus: true
                        ) == 0
                  }
              }
            steps {
                withSonarQubeEnv('Devops') {
                    sh "cd be/smg && chmod -R 777 gradlew && ./gradlew sonarqube"
                  }
            }
        }

        stage('SonarQube analysis fe') {
            when {
                  expression {
                      sh(
                          script: "git log -n 1 --name-only -p --pretty=format:\"%h\" --first-parent | grep '^fe/'",
                          returnStatus: true
                        ) == 0
                  }
              }
            steps {
              withSonarQubeEnv('Devops') {
                  sh "cd fe && npx sonarqube-scanner -Dsonar.projectKey='fe'"
              }
            }
        }

        stage('Finish') {
              steps{
                  sh 'docker container prune -f'
                  sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
              }
          }


      }

      post {
          success {
              script {
                  def gitLogOutput = sh(script: 'git log -n 1 --name-only -p --pretty=format:\"%h\" --first-parent', returnStdout: true).trim()
                  if (gitLogOutput.contains('fe/')) {
                      sh """
                          curl -i -X POST -H 'Content-Type: application/json' -d '{
                                  "channel": "B109_Jenkins",
                                  "attachments": [{
                                      "fallback": "FE build succeeded",
                                      "color": "#36a64f",
                                      "author_name": "Jenkins",
                                      "title": "FE build succeeded",
                                      "fields": [
                                          {
                                              "title": "Git URL",
                                              "value": "${GIT_URL}",
                                              "short": false
                                          }
                                      ]
                                  }]
                              }' https://meeting.ssafy.com/hooks/1x366qpgubd9mdqrridnjkzqrw
                      """
                  } else if (gitLogOutput.contains('be/')) {
                      sh """
                          curl -i -X POST -H 'Content-Type: application/json' -d '{
                                  "channel": "B109_Jenkins",
                                  "attachments": [{
                                      "fallback": "BE build succeeded",
                                      "color": "#36a64f",
                                      "author_name": "Jenkins",
                                      "title": "BE build succeeded",
                                      "fields": [
                                          {
                                              "title": "Git URL",
                                              "value": "${GIT_URL}",
                                              "short": false
                                          }
                                      ]
                                  }]
                              }' https://meeting.ssafy.com/hooks/1x366qpgubd9mdqrridnjkzqrw
                      """
                  }
              }
          }

          failure {
            script {
                  def gitLogOutput = sh(script: 'git log -n 1 --name-only -p --pretty=format:\"%h\" --first-parent', returnStdout: true).trim()
                  if (gitLogOutput.contains('fe/')) {
                      sh """
                          curl -i -X POST -H 'Content-Type: application/json' -d '{
                                  "channel": "B109_Jenkins",
                                  "attachments": [{
                                      "fallback": "FE build faild",
                                      "color": "#36a64f",
                                      "author_name": "Jenkins",
                                      "title": "FE build faild",
                                      "fields": [
                                          {
                                              "title": "Git URL",
                                              "value": "${GIT_URL}",
                                              "short": false
                                          }
                                      ]
                                  }]
                              }' https://meeting.ssafy.com/hooks/1x366qpgubd9mdqrridnjkzqrw
                      """
                  } else if (gitLogOutput.contains('be/')) {
                      sh """
                          curl -i -X POST -H 'Content-Type: application/json' -d '{
                                  "channel": "B109_Jenkins",
                                  "attachments": [{
                                      "fallback": "BE build faild",
                                      "color": "#36a64f",
                                      "author_name": "Jenkins",
                                      "title": "BE build faild",
                                      "fields": [
                                          {
                                              "title": "Git URL",
                                              "value": "${GIT_URL}",
                                              "short": false
                                          }
                                      ]
                                  }]
                              }' https://meeting.ssafy.com/hooks/1x366qpgubd9mdqrridnjkzqrw
                      """
                  }
              }
          }
      }

      options {
          disableConcurrentBuilds()
      }
  }
  ```

## 6. 빌드

1. Front-end
   ```bash
   $ cd /home/ubuntu/jenkins/workspace/client/fe
   $ docker build -t fe ./
   $ docker run -d --name fe --restart=always -e TZ=Asia/Seoul -p 3000:3000 -u root fe
   $ docker network connect ubuntu_default fe
   ```
2. Back-end

   Business-Server, Auth-Server

   ```bash
    $ cd /home/ubuntu/jenkins/workspace/client/be/smg
    $ gradle clean build
    $ docker build -t be ./
    $ docker run -d --name be --restart=always -e TZ=Asia/Seoul -p 8080:8080 -p 5005:5005 be
    $ docker network connect ubuntu_default be
   ```
