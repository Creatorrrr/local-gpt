### 로컬 실행

- 윈도우
  - ./run-backend.bat start
  - ./run-frontend.bat start
- 맥
  - ./run-backend.sh start
  - ./run-frontend.sh start

* 파라미터 종류: start, install, build

### 도커 실행

- 윈도우
  - ./run.bat start
- 맥
  - ./run.sh start

* 파라미터 종류: start, reload_web, reload_db, restart_web, restart_db, stop

### API 문서

- 로컬
  - http://localhost:8099/swagger
- 도커
  - http://localhost/swagger

### API KEY

- OpenAI 에서 API KEY 발급받아서 /config (POST)로 추가
