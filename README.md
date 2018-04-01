# livemsg
세미나 장소에서 발표자에게 실시간으로 질문을 할 수 있습니다.

## usage
`Vue-cli` 웹 클라이언트와 `RestAPI` 서버를 실행해야 합니다. 데이터는 `Redis` 에 저장됩니다.
모두 동일한 서버에서 실행된다는 전제가 있습니다. (서버 IP 가 `localhost` 로 고정되어 있습니다)

우선 Vue 를 실행시킵니다. (아직 개발버전 밖에 없음)
```bash
$ cd livemsg/client
$ npm run dev
```

RestAPI 서버를 실행합니다.
```bash
$ cd livemsg/server
$ node serv.js
```

이제 `localhost:8080` 으로 접속해서 사용하시면 됩니다!

## contribute
아직 기능이 많이 미흡하고 수정되어야 하는 부분이 많이 있습니다. 
여러분의 기여를 환영합니다!

## license
[MIT](LICENSE)
