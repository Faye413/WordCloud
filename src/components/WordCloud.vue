<template>

  <div style="margin: auto;" >
    <h1>{{ msg }}</h1>

      <div id="keywordCloud">
        <h2>keywords</h2>

        <template v-for="chunk in sortedWordsByChunk">
          <template v-for="w in chunk">
          <span class="cloud">      
              <div class="word"
              v-bind:style="{color: getColor(w.rating), fontSize: getFontSize(w.count) + 'px', fontFamily: 'Impact'}">
                {{w.text}}
              </div> 
          </span>                   
          </template>
          <br>
        </template>
      </div>

      <div id="benchmarkCloud">   
        <h2>benchmark</h2>

        <template v-for="chunk in sortedWordsByChunk">
          <template v-for="w in chunk">
          <span class="cloud">      
              <div class="word"
              v-bind:style="{color: getColor(w.benchmark_rating), fontSize: getBMFontSize(w.benchmark_count) + 'px', fontFamily: 'Impact'}">
                {{w.text}}
              </div>        
          </span>          
          </template>
          <br>
        </template>

      </div>          
  </div>
</template>

<script>
import * as d3 from 'd3-3.5.17';

export default {
  props: ['words'],
  name: 'wordcloud',
  data () {
    return {
      msg: 'Word Cloud',
      maxFontSize: 150,
      maxWordsPerRow: 7
    }
  },
  methods: {
    //Color Picker: https://www.w3schools.com/colors/colors_picker.asp
    getColor: function rating_color(rating) { 
      if ((0 <= rating) && (rating <= 0.5)){ //red
        return '#660000'
      }
      if ((0.5 < rating) && (rating <= 1)){
        return '#b30000'
      }
      if ((1 < rating) && (rating <= 1.5)){
        return '#ff0000'
      }
      if ((1.5 < rating) && (rating <= 2)){ //orange
        return '#ff6600'
      }
      if ((2 < rating) && (rating <= 2.5)){
        return '#ff944d'
      }
      if ((2.5 < rating) && (rating <= 3)){ //yellow
        return '#FFD700'
      }
      if ((3 < rating) && (rating <= 3.5)){ //yellow green
        return '#ace600'
      }
      if ((3.5 < rating) && (rating <= 4)){ //green 
        return '#99cc00'
      }
      if ((4 < rating) && (rating<= 4.5)){ 
        return '#008000'
      }
      if ((4.5 < rating) && (rating<= 5)){
        return '#004d00'
      }
    },
    getFontSize: function count_fontsize(count) {
      var fontScale = d3.scale.linear().range([16,60]);
      fontScale.domain([
        d3.min(this.words, function(d) {return d.count;}),
        d3.max(this.words, function(d) {return d.count;})
      ]); 
      return fontScale(count)
    },
    getBMFontSize: function bmcount_fontsize(bmcount) {
      var fontScale = d3.scale.linear().range([16,60]);
      fontScale.domain([
        d3.min(this.words, function(d) {return d.benchmark_count;}),
        d3.max(this.words, function(d) {return d.benchmark_count;})
      ]); 
      return fontScale(bmcount)
    }

  },
  computed: {
    sortedWords: function () {
      this.words.sort(function (a, b) {
        if (a.text < b.text) return -1
        if (a.text > b.text) return 1
        return 0
      })
      return this.words
    },
    sortedWordsByChunk: function() {
      var ret = []
      var start = 0
      while (start < this.sortedWords.length) {
        ret.push(this.sortedWords.slice(start, start + this.maxWordsPerRow))
        start += this.maxWordsPerRow

      }
      return ret
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#keywordCloud, #benchmarkCloud
{
    display:inline-block;
    height: 780px;
    padding: 80px;

}
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

.cloud {
  // width: 700px;
  // background: lightyellow;
}

.word {
  margin-right: 2.5px;
  padding: 0px;
  display: inline-block;
  border: 2px;
  // background: lightgray;
  // height: 200px;
  // vertical-align: text-bottom;
  
}

.flipped {
  padding: 5px;
  // display: inline-block;
  border: 2px;
  background: lightblack;
  vertical-align: text-bottom;   
  min-height: 200px;
}

text:hover { opacity: .7 !important; }
</style>
