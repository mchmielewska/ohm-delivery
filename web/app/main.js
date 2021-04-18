angular
    .module("ohm-delivery", [])
    .controller("tracking", function($scope, $http) {
        $scope.sendData = function() {
            $http.get(`/ohms/${this.trackingId}`)
            .then((result) => {
                $scope.commentInput = false;
                if (result.data) {
                    this.errorMessage = ""
                    $scope.ohmData = result.data;
                } else {
                    $scope.ohmData = null;
                    this.errorMessage = "Unable to find delivery matching provided tracking ID"
                }
            }, (error) => {
                this.errorMessage = "Unable to find delivery matching provided tracking ID"
            });
        };

        $scope.showComment = function(status) {
           if (status === "REFUSED") $scope.commentInput = true;
           else $scope.commentInput = false;
         }

        $scope.confirmDelivery = function (status, comment) {
            $scope.commentInput = false;
            if (status) {
                $http.post(`/ohms/${this.trackingId}`, { status: status, comment: comment })
                .then((result) => {
                    $scope.ohmData = null;
                }, (error) => {
                    this.errorMessage = "Something went wrong. Please try again."
                })
            }
        }
    });