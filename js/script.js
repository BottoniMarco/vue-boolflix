var app = new Vue({
  el: "#app",
  data: {
    movies:[],
    keywordMovieTitle: "",
    flags:['en','it','es'],
    fiveActors:[],
  },
  methods: {
    apiSearch:function () {
      const self = this;
      // movies
      function getMovies(){
        return axios.get('https://api.themoviedb.org/3/search/movie',{
          params:{
            api_key:'1a9e369e17c6561e8db673b4313eb4c1',
            query:self.keywordMovieTitle,
          }

        })
      }
      // /movies

      // series
      function getTv(){
        return axios.get('https://api.themoviedb.org/3/search/tv',{
          params:{
            api_key:'1a9e369e17c6561e8db673b4313eb4c1',
            query:self.keywordMovieTitle,
            language:'it-IT',
          }
        })
      }
      // /series

      // merge (movies + series)
      Promise.all([ getMovies(), getTv()])
        .then(function (result) {
          self.movies = [];
          self.movies.push(...result[0].data.results);
          self.movies.push(...result[1].data.results);
          console.log(self.movies);
          self.starsConversion(self.movies);
          console.log(self.keywordMovieTitle);
          self.keywordMovieTitle = "";
          self.displayCast();
        });
        // /merge (movies + series)

    },
    // vote (stars)
    starsConversion: function (movies){
      for(let i =0; i < this.movies.length; i++) {
        const fullStars = Math.ceil(this.movies[i].vote_average /2);
        this.movies[i].fullStars = fullStars;
      }
      // /vote (stars)
    },
    // first five actors/actress
    displayCast: function(){
      for (var i = 0; i < this.movies.length; i++) {
        const movieIds = this.movies[i].id;
        console.log(this.movies[i].id);

        axios.get("https://api.themoviedb.org/3/movie/" + movieIds + "/credits?api_key=1a9e369e17c6561e8db673b4313eb4c1&language=en-US")
        .then(function(response){
          const cast = response.data.cast;
          var actors = []
          for (var j = 0; j < 5; j++) {
            var actor = cast[j].name;
            actors.push(actor)
          }
          this.fiveActors = actors;
          console.log("test", this.fiveActors);
        })
      }
    }
    // /first five actors/actress

  },
  created: function (){
  }
})
