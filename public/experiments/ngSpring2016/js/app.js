(function(){
    angular
        .module("MovieDBApp", [])
        .controller("MovieListController", MovieListController);
    function MovieListController($scope){
        console.log("Hello from MovieListController");
        var movies = [
            {id:123, title: "Avatar", year: 2007},
            {id:132, title: "Star Wars", year: 1977},
        ]
        $scope.movies = movies;

        //event handlers declarations
        $scope.addMovie = addMovie;
        $scope.removeMovie = removeMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;

        //event handler delarations
        function addMovie(movie){
            console.log(movie);
            var newMovie = {
                id: movie.id,
                title: movie.title,
                year: movie.year

            }
            $scope.movie={};
            $scope.movies.push(newMovie);
        }
        function removeMovie(movie){
            var index = $scope.movies.indexOf(movie);
            //console.log(index);

            $scope.movies.splice(index, 1);
        }
        function selectMovie(movie){
            //var index = $scope.movies.indexOf(movie);
            //console.log(index);

            $scope.movie = movie;
            //$scope.selectedMovie = movie;
            //$scope.movie = {
            //    id: movie.id,
            //    title: movie.title,
            //    year: movie.year
            //};
        }
        function updateMovie(movie){
            //var index = $scope.movies.indexOf(movie);
            //console.log(index);

            //$scope.movie = movie;
            $scope.selectedMovie = movie;
            $scope.movie = {
                id: movie.id,
                title: movie.title,
                year: movie.year
            };
        }
    }
})();