@bfa80860-bad5-4778-9015-8f31e8310071
Feature: HomeComponent is the first component in the client side.

	Scenario: Show greet wording.
		Given I am in the HomeComponent.
		When I call the showGreetLog method and put the "Bibby".
		Then I should see The wording of homeComponent is "Hello, Bibby"
	
	Scenario: Show greet wording async.
		Given I am in the HomeComponent.
		When I call the showGreetLogAsync method.
		Then I should see the asyncWording of homeComponent is "Hello, Bibby async"	
	
	Scenario: Get data from server side.
		Given I get the HomeService.
		| tt  |  
		| abc |  
		When I call the getServerDataAsync.
		Then The result is the data.
		| tt  |  
		| abc |  	
	
