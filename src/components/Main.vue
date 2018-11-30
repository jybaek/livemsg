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
        <div class="line"></div>
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
  import Card from './Card';
  import moment from 'moment';
  import Gnb from './Gnb';

  export default {
    name: 'HelloWorld',
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

<style lang="scss" scoped>
  @import 'main.scss';
</style>
