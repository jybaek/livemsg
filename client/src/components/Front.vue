<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
	<hr>

	<b-container fluid>
	  <b-form-textarea id="textarea" style="width:400px; margin-left: auto; margin-right: auto;"
						 v-model="postMsg"
						 placeholder="Enter something"
						 :rows="3"
						 :max-rows="6">
	  </b-form-textarea><br>
	  <b-button variant="success" @click="submit()">SEND</b-button>

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
      msg		: 'Welcome to Your Vue.js App',
	  postMsg	: ''
    }
  },
  mounted()
  {
	this.todo();
  },
  methods:
  {
	todo()
{  
	const self = this;
    setInterval(function(){
		self.getTimeline();
    }, 30000); // FIXME. 3000 (3s) 정도로 수정?
},
	submit()
{
	let timestamp = new Date();
	axios.post('http://localhost:7005/writePost', {
		key : timestamp,
		msg : this.postMsg
	  })
	  .then(function (response) {
		console.log(response);
	  })
	  .catch(function (error) {
		console.log(error);
	  });
},
	  getTimeline()
	  {
			axios.get('http://localhost:7005/timeline')
			  .then(function (response) {
				console.log(response);
			  })
			  .catch(function (error) {
				console.log(error);
			  });
		  this.postMsg = '';
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
</style>
