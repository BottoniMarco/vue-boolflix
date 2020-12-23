var app = new Vue({
  el: "#app",
  data: {
    movies:[],
    keywordMovieTitle: "",
    flags:['en','it','es'],
  },
  methods: {
    apiSearch:function () {
      const self = this;
      function getMovies(){
        return axios.get('https://api.themoviedb.org/3/search/movie',{
          params:{
            api_key:'1a9e369e17c6561e8db673b4313eb4c1',
            query:self.keywordMovieTitle,
            language:'it-IT',
          }
        })
      }

      function getTv(){
        return axios.get('https://api.themoviedb.org/3/search/tv',{
          params:{
            api_key:'1a9e369e17c6561e8db673b4313eb4c1',
            query:self.keywordMovieTitle,
            language:'it-IT',
          }
        })

      }
      Promise.all([getMovies(), getTv()])
        .then(function (result) {
          self.movies = [];
          self.movies.push(...result[0].data.results);
          self.movies.push(...result[1].data.results);
          console.log(self.movies);
          self.starsConversion(self.movies);
          console.log(self.keywordMovieTitle);
          self.keywordMovieTitle = "";
        });
    },
    starsConversion: function (movies){
      for(let i =0; i < this.movies.length; i++) {
        const fullStars = Math.ceil(this.movies[i].vote_average /2);
        this.movies[i].fullStars = fullStars;
      }
    },
  },
  created: function (){
  }
})
