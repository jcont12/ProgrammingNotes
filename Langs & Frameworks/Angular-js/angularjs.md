ANGULARJS
Angular is a framework to communicate/insert/manipulate javascript in html. In order to first establish a connection, you must add (require) angular at the top of your html. Then, at the top of your element, insert 'ng-app' text to one of your top elements (for example: <head ng-app> (In order to let it know it is an angular app).

Once that has been added, you can start creating controllers by adding ng-controller to elements. The ng-controller must have a name that will match with a variable name in your javascript file, and in that javascript file you can start adding properties to that variable (controller) in order to be used in html through binding (double braces). 

Example ->
html: 
<div ng-controller ="MainController">
First Name: {{person.firstName}}
{{message}}
</div>

js file:
var MainController = function($scope){
$scope.message = "Hello world!"

var person = {
firstName: "Jorge"
}

$scope.person = person
}

That will render what you are looking for.

HTTP REQUESTS IN ANGULAR
Angular, like the $scope param, also gives us an $http service (param) that we can use to run REST methods. Since these methods are asynchronous, this methods are a promise, so .then method can be used to handle response (first param) or errors (second  param). For example:

var MainController = funciton($scope, $http){

var responseHandler = function(response){$scope.user = response.data;}
 var errorHandler = function(){$cope.error = "there was an error")

$http.get("url").then(responseHandler, errorHandler);

}

DIRECTIVES (NG MODEL)
By adding ng-model to an html element with a text input option (textarea, form, etc), you can actually create a property of the $scope service within html. In other words, if you add to the input of a form: ng-model: "username", and you use binding on html {{ username }}, whatever you type in the form will display in the binding area automatically without the need to add it into the $scope in the js file.

NG-CLICK, NG-SUBMIT
Button and form specific directives, usually take in functions to be called whenever a button is clicked or a form is submitted

NG-REPEAT
this directive acts as a for loop.  If you have a scope property that contains an array (lets call it $scope.usersArray), we can use ng-repeat on html to loop over each users in usersArray: <tr ng-repeat="user in usersArray"><td>{{user.name}}</td>

ROUTING
First, add angular-route.js, then configure $routeProvider:

$routeProvider.when("/main", { templateUrl: "main.html", controller: "MainController:})

for URL with params:
$routeProvider.when("/main/:userId", { templateUrl: "user.html", controller: "UserController"})

and on the controller add $routeParams service, and now $routeParams.userId will exist!! You can access the link by doing $location.path("/user/ " + $routeParams.userId)

I AM PASSING A SERVICE INTO A CONTROLLER BUT IT IS NOT READING IT (CANT USE METHODS INSIDE THE SERVICE).... WHY??
Make sure you are passing the paramters inside the controller function in the same order as the directive variable.
