이 코드는 다른 [리포지토리](https://github.com/withinnovation/livemsg)에서 계속 진행하기로 결정되었습니다.
모든 문의는 caley.baek@gmail.com 으로 연락 주십시오.

# livemsg
세미나 장소에서 발표자에게 실시간으로 질문을 할 수 있습니다.


![npm](https://img.shields.io/npm/v/npm.svg?registry_uri=https%3A%2F%2Fregistry.npmjs.com)
[![node version](https://badge.fury.io/js/node.svg)](https://badge.fury.io/js/node)


## Installation
우선 client, server 디렉터리에서 각각 모듈을 설치해야 합니다.
```bash
$ cd livemsg/client
$ npm install
$ cd -
$ cd livemsg/server
$ npm install
```

## Usage
`Vue-cli` 웹 클라이언트와 `RestAPI` 서버를 실행해야 합니다. 데이터는 `Redis` 에 저장됩니다.
모두 동일한 서버에서 실행된다는 전제가 있습니다. (서버 IP 가 `localhost` 로 고정되어 있습니다)

Vue 를 실행시킵니다. (아직 개발버전 밖에 없음)
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

## Contribute
아직 기능이 많이 미흡하고 수정되어야 하는 부분이 많이 있습니다. 
여러분의 기여를 환영합니다!

## License
[MIT](LICENSE)
