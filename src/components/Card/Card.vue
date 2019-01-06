<template>
  <transition name="cardIn" appear>
    <div class="card">
      <div class="card-header">
        <div class="card-num">
          No. {{ item.postNum }}
        </div>
        <div class="card-date">
          {{ item.timestamp| moment("YYYY MM DD, HH:mm:ss") }}
        </div>
      </div>
      <p class="card-content" :class="{'large-text' : isShort}">{{ item.postMsg }}</p>
      <div class="card-footer">
        <span class="card-score" :class="{active:voteStatus}">{{ item.score }}</span>
        <button class="card-up" @click="upvote(item.id, item.score)" :class="{active:voteStatus}">
          <img src="@/assets/up_active.svg" v-if="voteStatus" alt="">
          <img src="@/assets/up_inactive.svg" v-if="!voteStatus" alt="">
        </button>
      </div>
    </div>
  </transition>
</template>
<script>
  import db from '../../firebaseStore/firebase.store';
  db.settings({ timestampsInSnapshots: true });

  export default {
    props: ['item', 'trackName'],
    data() {
      return {
        voteStatus: false,
      }
    },
    computed: {
      isShort() {
        if (this.item.postMsg.length < 18) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      upvote(docId, upvote) {
        var postRef = db.collection(this.trackName).doc(docId);

        this.voteStatus == true ? upvote-- : upvote++;
        this.voteStatus = !this.voteStatus;

        postRef.update({
          score: upvote
        }).then(ref => {
          console.log(ref);
          console.log('upvote')
        });
      },
    }
  }
</script>
<style lang="scss" scoped>
  .card {
    width: calc(100% - 32px);
    padding: 12px 16px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
    margin: 12px 16px;
    transition: all 0.3s;
  }

  .card:hover {
    transform: scale(1.05);
    transform: translateY(-2px);
    box-shadow: 1px 6px 8px 0px rgba(0, 0, 0, 0.10);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-date {
    font-size: 12px;
    color: #aaa;
  }

  .card-num {
    color: #aaa;
    font-size: 13px;
  }

  .card-content {
    margin: 13px 0px 4px;
    font-size: 15px;
    color: #666;
    line-height: 22px;
  }

  .card-content.large-text {
    font-size: 22px;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 8px;
  }

  .card-score {
    font-size: 13px;
    color: #aaa;
    margin-right: 8px;
  }

  .card-score.active {
    color: #5C9CFF;
  }

  .card-up {
    width: 44px;
    height: 44px;
    background-color: #fff;
    border: none;
    border-radius: 44px;
    box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.5s;
  }

  .card-up:hover {
    position: relative;
    transform: scale(1.1);
    transform: translateY(-2px);
    box-shadow: 1px 6px 8px 0px rgba(0, 0, 0, 0.12);

  }

  .card-up.active {
    background-color: #5C9CFF;
  }

  @media ( min-width: 768px ) {
    .card {
      padding: 16px 24px;
    }
  }
</style>

