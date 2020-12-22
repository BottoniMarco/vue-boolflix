var app = new Vue({
  el: "#app",
  data: {
    movies:[],
    keywordMovieTitle: "",
    flags:
      {
        es:"https://external-preview.redd.it/sgupg2QyvwFm7eLaH0isYTSx1IAYT2cnG9EG2qaK7dc.png?auto=webp&s=c2fe73665a3b109d9a040fb4f70fcba4e2875149",
        it:"https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png",
        en:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
    },
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
          this.movies = [...result[0].data.results,...result[1].data.results];
          console.log(this.movies);
          self.starsConversion(self.movies);
        });
        self.keywordMovieTitle = "";
    },
    starsConversion: function (movies){
      console.log("test", self.movies.length);
      for(let i =0; i < self.movies.length; i++) {
        const fullStars = Math.ceil(self.movies[i].vote_average /2);
        self.movies[i].fullStars = fullStars;
      }
    },
  },
  created: function (){
  }
})
