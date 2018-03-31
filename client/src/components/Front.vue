<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <b-container fluid>
      <!--
      <b-form-textarea id="textarea" style="width:400px; margin-left: auto; margin-right: auto;"
    -->
    <b-card title="Ask the speaker"
    img-src="https://placekitten.com/1000/300"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 40rem;"
    class="mb-2">
    <b-form-textarea no-resize id="textarea" style="width:30rem; margin-left: auto; margin-right: auto;"
    v-model="postMsg"
    placeholder="Type your question"
    :rows="4"
    :max-rows="4">
  </b-form-textarea><br>
  <b-button variant="success" @click="submit()">ASK</b-button>
</b-card>

<hr>

<h2>{{ Object.keys(history).length }} question</h2>
<br>

<div v-for="key in Object.keys(history)">
  <div class="card">
    <div class="container">
      <b-row>
        <b-col style="flex: 0 0 90%;max-width: 90%;">{{ key }}</b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col style="flex: 0 0 80%;max-width: 80%;">{{ history[key] }}</b-col>
        <b-button @click="upvote(key)">upvote</b-button>
      </b-row>
    </div>
  </div>
  <br>
</div>

</b-container>

</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data ()
  {
    return {
      msg		: 'Welcome to Q&A',
      postMsg	: '',
      history	: [ ]
    }
  },
  mounted()
  {
    this.getTimeline();
    this.todo();
  },
  methods:
  {
	upvote(post)
	{
      axios.post('http://localhost:7005/upvote', {
        key : post,
      })
      .then(response => {
        this.getTimeline();
      })
      .catch(function (error) {
        console.log(error);
      });
	},
    todo()
    {
      setInterval(() => {
        this.getTimeline();
      }, 3000);
    },
    submit()
    {
      let timestamp = new Date();
      axios.post('http://localhost:7005/writePost', {
        key : timestamp,
        msg : this.postMsg
      })
      .then(response => {
        console.log(response);
        this.postMsg = '';
        this.getTimeline();
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getTimeline()
    {
      axios.get('http://localhost:7005/timeline')
      .then(response => {
        this.history = [];
        for (var i = 0; i < response.data.length; i+=2)
        {
          this.history[response.data[i]] = response.data[i+1];
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

img {
  border-radius: 5px 5px 0 0;
}

.container {
  padding: 20px 16px;
}
</style>
