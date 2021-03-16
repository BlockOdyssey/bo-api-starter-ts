# bo-api-starter-ts

블록오디세이를 위한 Express Api Starter이며 기존의 bo-api-starter 패키지를 TypeScript 기반으로 재작성한 것입니다.

## Table of Contents

-   [Getting Started](#getting-started)
    -   [Project Installation](#project-installation)
    -   [Install Dependencies](#install-dependencies)
    -   [Project Environment Setup](#project-environment-setup)
    -   [Project Structure](#project-structure)
    -   [Project Run](#project-run)
-   [Guidelines](#guidelines)
    -   [HTTP Status Codes](#http-status-codes)
    -   [Other Rules](#other-rules)

## Getting Started

### Project Installation

<pre>
  <code>$ npx bo-api-starter projectname</code>
</pre>

:fire: `npm i bo-api-starter` 명령어를 사용하면 프로젝트가 정상적으로 설치되지 않습니다. :fire:

### Install Dependencies

<pre>
  <code>$ cd projectname</code>
  <code>$ npm install</code>
</pre>

#### Project Dependencies

-   Server : [Express](https://expressjs.com)
-   Database : [MySQL](https://github.com/mysqljs/mysql#readme)
-   Authentication : [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
-   AWS S3 : [multer](https://github.com/expressjs/multer#readme), [multer-s3](https://github.com/badunk/multer-s3#readme)
-   Environment Variables : [dotenv](https://github.com/motdotla/dotenv#readme)
-   HTTP Request Logger : [morgan](https://github.com/expressjs/morgan#readme)
-   Development Only : [nodemon](https://nodemon.io/), [TypeScript](https://www.typescriptlang.org/), [ts-node](https://github.com/TypeStrong/ts-node)

### Project Environment Setup

1. .env.example 파일을 복사하여 .env 파일로 변경해줍니다.
2. example로 되어 있는 값들을 실제 환경에 맞게 수정해줍니다.
 <pre>
   <code>
     MYSQL_HOST=example.123123.ap-northeast-2.rds.amazonaws.com
     MYSQL_USER=example
     MYSQL_PASSPORT=example
     MYSQL_PORT=3306
     MYSQL_DATABASE=example
   </code>
 </pre>
3. (선택 사항) nodemon을 사용하고자 하는 경우 package.json을 다음과 같이 수정해줍니다.
 <pre>
   <code>
     "scripts": {
       "start": "nodemon --watch '**/*.ts' --ignore '**/*.spec.ts' --exec 'ts-node' index.ts"
     },
   </code>
 </pre>

### Project Structure

<pre>
  <code>
    .
    ├── certkey                   # SSL 인증서
        ├── cert.crt
        └── key.key
    ├── middleware                # 미들웨어 설정
        ├── app                     # APP
            └── index.ts
        ├── common                  # 공통
            ├── uploadFile.ts         # S3 파일 업로드
            └── verifyToken.ts        # jwt 토큰 검증
        └── web                     # WEB
            └── index.ts
    ├── query                     # SQL 쿼리
        └── users.ts
    ├── routes                    # 라우팅 설정
        ├── app                     # APP
            ├── index.ts
            ├── upload.ts
            └── users.ts
        └── web                     # WEB
            ├── index.ts
            ├── upload.ts
            └── users.ts
    ├── service                   # 서비스 로직
        ├── users
            └── findUser.ts
        └── index.ts
    ├── .env.example              # 환경변수 예시
    ├── config.ts                 # 공통 설정
    ├── index.ts                  # 서버 시작 파일
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
  </code>
</pre>

### Project Run

<pre>
  <code>$ npm start</code>
</pre>

## Guidelines

### HTTP Status Codes

#### 200 OK : 데이터 조회 성공 (GET)

<pre>
  <code>
    res.status(200).send({ result: "success" , dataSource: [data] });
  </code>
</pre>

#### 201 Created : 데이터 생성, 수정, 삭제 성공 (POST, PUT, DELETE)

<pre>
  <code>
    res.status(201).send({ result: "success", message: "데이터를 입력하였습니다." });
  </code>
</pre>

#### 400 Bad Request : 잘못된 요청일 경우

<pre>
  <code>
    res.status(400).send({ result: "fail", message: "잘못된 요청입니다." });
  </code>
</pre>

#### 401 Unauthorized : 인증이 필요하거나 권한이 없는 경우

<pre>
  <code>
    res.status(401).send({ result: "fail", message: "인증이 필요합니다." });
  </code>
</pre>

#### 404 Not Found : 요청한 데이터를 찾을 수 없는 경우

<pre>
  <code>
    res.status(404).send({ result: "fail", message: "요청한 데이터가 존재하지 않습니다." });
  </code>
</pre>

#### 409 Conflict : DB에 데이터가 이미 존재하는 경우 (데이터 중복)

<pre>
  <code>
    res.status(409).send({ result: "fail", message: "중복된 데이터입니다." });
  </code>
</pre>

#### 500 Internal Server Error : 내부 서버 에러

<pre>
  <code>
    res.status(500).send({ result: "fail", message: "서버 내부 오류입니다." });
  </code>
</pre>

### Other Rules

#### Files and Variables

1. 모든 파일명과 변수명은 camelCase를 따르는 것을 원칙으로 한다.
2. 모든 파일명과 변수명은 '동사+명사' 형태로 지어 어떠한 기능을 하는지 직관적으로 알 수 있도록 한다.

#### API URI 설계

<pre>
  참고 : https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html
</pre>

1. 동사보다는 명사를, 대문자보다는 소문자를 사용한다.
2. 자원에 대한 행위는 HTTP Method로 표현하며 URI에 HTTP Method가 들어가면 안된다. 또한 CRUD 기능을 나타내는 것 역시 URI에 들어가서는 안된다.
 <pre>
    POST /web/members/delete/1 (X)
    DELETE /web/members/1 (O)
 
    GET /web/members/show/1 (X)
    GET /web/members/1 (O)
 </pre>

3. URI 마지막 문자로 슬래시(/)를 포함하지 않는다.
 <pre>
  http://api.blockodyssey.com/web/members/123/ (X)
  http://api.blockodyssey.com/web/members/123 (O)
 </pre>

4. 밑줄(\_)은 URI에 사용하지 않으며 필요한 경우 하이픈(-)을 사용한다.
 <pre>
   GET /app/test_url (X)
   GET /app/test-url (O)
 </pre>

5. 앱에서 필요한 URI는 /app 밑에, 웹에서 필요한 URI는 /web 밑에 작성하도록 한다.
 <pre>
   GET /users/123 (X)
   GET /app/users/123 (O)
 </pre>
