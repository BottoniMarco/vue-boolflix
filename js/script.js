var app = new Vue({
  el: "#app",
  data: {
    movies:[],
    keywordMovieTitle: ""
  },
  methods: {
    apiSearch:function () {
      console.log("test");
      const self = this;

      axios.get('https://api.themoviedb.org/3/search/movie',{
        params:{
          api_key:'1a9e369e17c6561e8db673b4313eb4c1',
          query:self.keywordMovieTitle,
          language:'it-IT',
        }
      })
        .then(function (result) {
          let movieSpecs = result.data.results;
          self.movies = movieSpecs;
          console.log(self.movies);
        });
        self.keywordMovieTitle = "";

    }
  },
  created: function (){

  }
})
