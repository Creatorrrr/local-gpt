### 로컬 실행

- yarn backend start
- yarn frontend start

### 도커 실행
- 윈도우
  - ./run.bat start
- 맥
  - ./run.sh start

* 파라미터 종류: start, reload_web, reload_db, restart_web, restart_db, stop

### API 문서
- 로컬
  - http://localhost:3000/swagger
- 도커
  - http://localhost/swagger

### API KEY
- OpenAI 에서 API KEY 발급받아서 /config (POST)로 추가