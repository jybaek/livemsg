  <template>
  <div class="container">
    <Gnb/>
    <div class="main-view">
      <div>
        <div class="list-header">
          <div class="question-count">
            {{ history.length }} questions
          </div>
          <div>
            <span class="sort-select"
                  :class="{ selected : option == selected }"
                  v-for="option in options"
                  :key="option.key"
                  @click="sortFunc(option)">
            {{ option }}
            </span>
          </div>
        </div>
        <div>
          <Card v-for="(item) in history" :key="item.milliTimestamp" :item="item" :trackName="trackName"/>
        </div>
      </div>
    </div>
    <div class="float-modal">
      <textarea class="input-question" id="textarea" v-model="postMsg" placeholder="질문을 남겨주세요" :rows="12"
                :max-rows="12"></textarea>
      <div class="btn-wrapper">
        <button class="btn-ask" @click="submit()" :disabled="!checkEmptyPost" :class="{active:checkEmptyPost}">ASK
        </button>
      </div>
    </div>
    <transition name="toggle-input" appear>
      <div class="float-bar" v-if="!mobileInputState">
        <div class="toggle-input" @click="openInput">
          질문을 남겨주세요
        </div>
      </div>
    </transition>
    <transition name="toggle-input" appear>
      <div class="float-bar" v-if="mobileInputState" >
        <div class="input-wrapper">
          <span class="btn-close" @click="toggleInput">close</span>
          <textarea v-autoToggle class="input-question" id="mobile-textarea" v-model="postMsg" placeholder="질문을 남겨주세요" :rows="6"
                    :max-rows="6"></textarea>
        </div>
        <div class="btn-wrapper">
          <button class="btn-ask" @click="submit()" :disabled="!checkEmptyPost" :class="{active:checkEmptyPost}">ASK
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
  import db from '../firebaseStore/firebase.store';
  import Card from './Card/Card';
  import moment from 'moment';
  import Gnb from './Gnb/Gnb';
  db.settings({ timestampsInSnapshots: true });

  export default {
    name: 'Main',
    data() {
      return {
        msg: 'LIVE Q&A',
        postMsg: '',
        history: [],
        selected: 'Recent',
        options: ['Popular', 'Recent'],
        mobileInputState: false,
        trackName: '',
      }
    },
    computed: {
      checkEmptyPost() {
        if (this.postMsg == '') {
          return false;
        } else {
          return true;
        }
      }
    },
    created() {
      this.trackName = moment(Date()).format('YYYYMMDD');
    },
    mounted() {
      this.getTimeline();
    },
    methods: {
      openInput() {
        this.mobileInputState = true
      },
      toggleInput() {
        this.mobileInputState = !this.mobileInputState
      },
      sortFunc(option) {
        this.selected = option
        this.$nextTick(() => {
          if (this.selected == "Recent") {
            this.history.sort((a, b) => {
              var aTime = a.milliTimestamp
              var bTime = b.milliTimestamp
              aTime = Number(aTime)
              bTime = Number(bTime)
              if (aTime > bTime) {
                return -1;
              }
              if (aTime < bTime) {
                return 1;
              }
              return 0;
            });
          }
          else if (this.selected == "Popular") {
            this.history.sort((a, b) => {
              if (a.score > b.score) {
                return -1;
              }
              if (a.score < b.score) {
                return 1;
              }
              if (a.score == b.score) {
                var aTime = a.milliTimestamp
                var bTime = b.milliTimestamp
                aTime = Number(aTime)
                bTime = Number(bTime)
                if (aTime > bTime) {
                  return -1;
                }
                if (aTime < bTime) {
                  return 1;
                }
                return 0;
              }
              return 0;
            });
          }
        });
      },
      submit() {
        var date = new Date();
        var millisecond = moment().millisecond()
        var timestamp = date
        var milliTimestamp = `${moment(date).format('YYYYMMDDHHmmss')}.${millisecond}`
        var postNum = this.history.length + 1
        var postRef = db.collection(this.trackName).doc();
        // 에러가 날 경우 .catch()에서 메세지 다시 복원
        var tempMsg = this.postMsg
        this.postMsg = '';
        postRef.set({
          score: 0,
          timestamp: timestamp,
          milliTimestamp : milliTimestamp,
          msg: tempMsg,
          postNum: postNum
        }).then(ref => {

        }).catch(err => {
          this.postMsg = tempMsg
          alert(err)
        });
      },
      getTimeline() {
        var postRef = db.collection(this.trackName);
        postRef.onSnapshot((snapshot) => {
          this.history = [];
          snapshot.forEach((doc) => {
            this.history.push({
                'id'		: doc.id,
                'timestamp'	: moment(doc.data().timestamp).calendar(),
                'postMsg'	: doc.data().msg,
                'postNum'	: doc.data().postNum,
                'score'		: doc.data().score,
                'milliTimestamp': doc.data().milliTimestamp
            })
          })
          this.sortFunc(this.selected);
        }, (error) => {
          console.log('Error getting documents', err);
        });
      }
    },
    components: {
      Card: Card,
      Gnb: Gnb,
    },
    directives: {
      autoToggle (el) {
        setTimeout(()=> {
          el.focus();
        }, 300)

      }
    }
  }
</script>

<style lang="scss">
    .container {
    width: 100%;
  }

  .main-view {
    margin-top: 72px;
    width: 100%;
    padding-bottom: 160px;
  }

  .sort-select {
    color: #aaa;
    font-size: 13px;
    padding: 0px 6px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .sort-select.selected {
    color: #000;
    font-weight: 700;
  }

  .question-count {
    font-size: 14px;
    color: #aaa;
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
  }

  .line {
    margin: 0px 0px 4px 0px;
    background-color: #eee;
    height: 1px;
  }

  .float-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px -4px 24px 0px rgba(0, 0, 0, 0.08);
  }

  .float-bar .input-question {
    margin: 32px 16px 4px;
    border: none;
    width: calc(100% - 32px);
    font-size: 14px;
    resize: none;
    line-height: 22px;
  }

  .float-bar .btn-close {
    position: absolute;
    right: 16px;
    top: 16px;
    color: #999;
  }

  .float-modal {
    display: none;
  }

  .btn-ask {
    width: 100%;
    height: 44px;
    background-color: #aaa;
    color: #fff;
    font-size: 15px;
    font-weight: 800;
    transition: all 0.3s;
  }

  .btn-ask.active {
    background-color: #5C9CFF;
  }

  .btn-ask.active:hover {
    background-color: #5c88ff;
  }

  .input-wrapper {
    max-width: 768px;
    margin: 0 auto;
  }

  .toggle-input {
    padding: 16px;
    font-weight: 300;
    color: #bbb;
  }

  .pos-abs {
    /* position: absolute; */
  }

  @media (min-width: 902px) {
    .container {
      max-width: 902px;
      width: 82vw;
      display: flex;
      align-items: flex-start;
      margin: 0px 0px 0px 15vw;
    }

    .main-view {
      box-sizing: content-box;
      display: inline-block;
      max-width: 35vw;
      padding: 0px 10vw 100px 0px;
    }

    .title-msg {
      font-size: 48px;
      font-weight: 100;
      padding: 32px 0px 12px;
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 0px 12px;
    }

    .float-bar {
      display: none;
    }

    .float-modal {
      display: inline-block;
      position: fixed;
      top: 114px;
      left: calc(50vw + 40px);
      width: 340px;
      background-color: #fff;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
    }

    .float-modal .input-question {
      width: 100%;
      font-size: 14px;
      margin: 16px 16px 4px;
      border: none;
      width: calc(100% - 32px);
      font-size: 14px;
      resize: none;
    }
  }

</style>
