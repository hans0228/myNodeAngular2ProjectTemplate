@bfa80860-bad5-4778-9015-8f31e8310071
Feature: HomeComponent is the first component in the client side.

	Scenario: how greet wording.
		Given I am in the HomeComponent.
		When I call the showGreetLog method and put the "Bibby".
		Then I should see the homeComponent. The wording is "Hello, Bibby"
	
	Scenario: show greet wording async.
		Given I am in the HomeComponent.
		When I call the showGreetLogAsync method.
		Then I should see the homeComponent. The asyncWording is "Hello, Bibby async"	
	
	
	

	