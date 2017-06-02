<template>
  <div>
    <wordcloud :words="words"></wordcloud>
  </div>
</template>

<script>

import wordcloud from './WordCloud.vue'

import words from '../data/words.json'

export default {
  name: 'hello',
  components: {
    wordcloud
  },
  data () {
    return {
      msg: 'Hello',
      words: words
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
