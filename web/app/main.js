angular
    .module("ohm-delivery", [])
    .controller("tracking", function($scope, $http) {
        $scope.sendData = function() {
            $http.get(`/ohms/${this.trackingId}`)
            .then((result) => {
                console.log(result.data)
                $scope.ohmData = result.data;
            }, (error) => {
                this.errorMessage = "Unable to retrieve data for provided tracking ID"
            });
        };

        $scope.confirmDelivery = function (status, comment) {
            if (status) {
                $http.post(`/ohms/${this.trackingId}`, { status: status, comment: comment })
                .then((result) => {
                    $scope.ohmData = {}
                }, (error) => {
                    this.errorMessage = "Something went wrong. Please try again."
                })
            }
        }
    });