<template>
  <transition name="cardIn" appear>
    <div class="card">
      <div class="card-header">
        <div class="card-num">
          No. {{ item.postNum }}
        </div>
        <div class="card-date">
          {{ item.timestamp| moment("MMMM DD, YYYY HH:mm:ss") }}
        </div>
      </div>
      <p class="card-content" :class="{'large-text' : isShort}">{{ item.postMsg }}</p>
      <div class="card-footer">
        <span class="card-score" :class="{active:voteStatus}">{{ item.score }}</span>
        <button class="card-up" @click="upvote(item.id, item.score)" :class="{active:voteStatus}">
          <img src="../assets/up_active.svg" v-if="voteStatus" alt="">
          <img src="../assets/up_inactive.svg" v-if="!voteStatus" alt="">
        </button>
      </div>
    </div>
  </transition>
</template>
<script>
  import db from '../firebaseStore/firebase.store';

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
  @import './card';
</style>

