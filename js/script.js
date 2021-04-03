var app = new Vue({
  el: "#app",
  data: {
    movies:[],
    keywordMovieTitle: "",
    flags:['en','it','es'],
    onTheAir:[],
    airingToday:[],
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
          // self.keywordMovieTitle = "";
          // self.displayCast();
        });
        // /merge (movies + series)

    },
    tvOnTheAir: function(){
      const self = this;
      self.movies = [];
      self.keywordMovieTitle = '';
      self.airingToday = [];
      axios
      .get('https://api.themoviedb.org/3/tv/on_the_air',  {
        params: {
          api_key: 'e99307154c6dfb0b4750f6603256716d',
          language: 'it-IT'
          }
        }
      )
      .then(function(response) {
          self.onTheAir = response.data.results;
          self.starsConversion(self.onTheAir);
  
          console.log(self.onTheAir)
  
        }
      ); // On the air
      
    },
    airing: function() {
      const self = this;
      self.movies = [];
      self.keywordMovieTitle = '';
      self.onTheAir = [];
      

      axios
        .get('https://api.themoviedb.org/3/tv/airing_today',  {
          params: {
            api_key: 'd631125b3120a33333b536f9aa3c36e9',
            language: 'it-IT'
            }
          }
        )
        .then(function(response) {
            self.airingToday = response.data.results;
            self.starsConversion(self.airingToday);

            // console.log(self.onTheAir)
            console.log(self.airingToday);
            console.log(self.airingToday.length);
          }
        )
    }, 
    // vote (stars)
    starsConversion: function (movies, onTheAir, airingToday ){
      if(this.movies.length > 0){
        for(let i =0; i < this.movies.length; i++) {
          const fullStars = Math.ceil(this.movies[i].vote_average /2);
          this.movies[i].fullStars = fullStars;
        }
      }else if (this.onTheAir.length > 0){
        for(let i =0; i < this.onTheAir.length; i++) {
          const fullStars = Math.ceil(this.onTheAir[i].vote_average /2);
          this.onTheAir[i].fullStars = fullStars;
        }
      }else if(this.airingToday.length > 0){
        for(let i =0; i < this.airingToday.length; i++) {
          const fullStars = Math.ceil(this.airingToday[i].vote_average /2);
          this.airingToday[i].fullStars = fullStars;
        }
      }
      // /vote (stars)
    },

  },
  mounted: function (){
    var self = this;
    axios
    .get('https://api.themoviedb.org/3/tv/on_the_air',  {
      params: {
        api_key: 'e99307154c6dfb0b4750f6603256716d',
        language: 'it-IT'
        }
      }
    )
    .then(function(response) {
        self.onTheAir = response.data.results;
        self.starsConversion(self.onTheAir);

        console.log(self.onTheAir)

      }
    ) // On the air

    
  }
})
