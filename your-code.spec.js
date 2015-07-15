describe('MyController', function() {
    var $httpBackend, $rootScope, createController,
        apiUrl = 'https://api.citypantry.com/packages/search?name=Burrito&postcode=SW1A%200AA&maxBudget=&headCount=&time=&date=&packagingType=';


    beforeEach(module('jsCodingTest'));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');

        $rootScope = $injector.get('$rootScope');

        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller('GiveTheGovernmentABurrito', {
                '$scope': $rootScope
            });
        };
    }));


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('When getBurritos returns successfully', function() {
        describe('and the search returns 1 or more items', function() {
            beforeEach(function() {
                $httpBackend.when('GET', apiUrl)
                    .respond({
                        packages: [{
                            someProductId: '1'
                        }, {
                            someProductId: '2'
                        }]
                    });
            });

            it('results.length should be greater than 0', function() {
                $httpBackend.expectGET(apiUrl);
                var controller = createController();
                $rootScope.getBurritos();
                $httpBackend.flush();
                expect($rootScope.results.length).toBeGreaterThan(0);
            });

            it('should set noResults to false', function() {
                $httpBackend.expectGET(apiUrl);
                var controller = createController();
                $rootScope.getBurritos();
                $httpBackend.flush();
                expect($rootScope.noResults).toBe(false);
            });
        })

        describe('and the search returns 0 items', function() {
            beforeEach(function() {
                $httpBackend.when('GET', apiUrl)
                    .respond({
                        packages: []
                    });
            });

            it('results.length should be greater than 0', function() {
                $httpBackend.expectGET(apiUrl);
                var controller = createController();
                $rootScope.getBurritos();
                $httpBackend.flush();
                expect($rootScope.results.length).toBe(0);
            });

            it('should set noResults to true', function() {
                $httpBackend.expectGET(apiUrl);
                var controller = createController();
                $rootScope.getBurritos();
                $httpBackend.flush();
                expect($rootScope.noResults).toBe(true);
            });
        })
    });

    describe('When getBurritos fails', function() {
        beforeEach(function() {
            $httpBackend.when('GET', apiUrl)
                .respond(500, '');
        });

        it('should set responseError to true', function() {
            $httpBackend.expectGET(apiUrl);
            var controller = createController();
            $rootScope.getBurritos();
            $httpBackend.flush();
            expect($rootScope.responseError).toBe(true);
        });

    });

});
