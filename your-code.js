angular.module('jsCodingTest', [
    'cpLib'
]);

angular.module('jsCodingTest').controller('GiveTheGovernmentABurrito', function($scope, PackagesFactory) {

    var onBurritoSuccess,
        onBurritoFailure;

    $scope.getBurritos = function () {
        PackagesFactory.searchPackages('Burrito', 'SW1A%200AA')
            .then(onBurritoSuccess, onBurritoFailure);
    }

    onBurritoSuccess = function (response) {
        $scope.results = response.data.packages;
        $scope.noResults = ($scope.results.length === 0) ? true : false;
    }

    onBurritoFailure = function (response) {
        $scope.responseError = true;
    }
});
