var app = new Vue({
  el: "#app",
  data: {
    movies:[],
    series:[],
    keywordMovieTitle: "",
    // positiveVote:"",
    negativeVote:"",
    flags:
      {
        es:"https://external-preview.redd.it/sgupg2QyvwFm7eLaH0isYTSx1IAYT2cnG9EG2qaK7dc.png?auto=webp&s=c2fe73665a3b109d9a040fb4f70fcba4e2875149",
        it:"https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png",
        en:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
    }

  },
  methods: {
    apiSearch:function () {
      const self = this;
      promise.all([
        axios.get('https://api.themoviedb.org/3/search/movie',{
          params:{
            api_key:'1a9e369e17c6561e8db673b4313eb4c1',
            query:self.keywordMovieTitle,
            language:'it-IT',
          }
        }),

        axios.get('https://api.themoviedb.org/3/search/tv',{
          params:{
            api_key:'e99307154c6dfb0b4750f6603256716d',
            query:self.keywordMovieTitle,
            language:'it-IT',
          }
        })

      ])

        .then(function (result) {
          let movieSpecs = result.data.results;
          self.movies = movieSpecs;
          console.log(self.movies);
          self.starsConversion(self.movies);

          let tvSpecs = result.data.results;
          self.series = tvSpecs;
          console.log(self.series);
          self.starsConversion(self.series)

        });
        self.keywordMovieTitle = "";

        // .then(function (result) {
        //   let tvSpecs = result.data.results;
        //   self.series = tvSpecs;
        //   console.log(self.series);
        //   self.starsConversion(self.series)
        // });

    },
    starsConversion: function (movies){
      for(let i =0; i<movies.length; i++) {
        const fullStars = Math.ceil(movies[i].vote_average /2);
        movies[i].fullStars = fullStars;
      }
    },
  },
  created: function (index){
  }
})
