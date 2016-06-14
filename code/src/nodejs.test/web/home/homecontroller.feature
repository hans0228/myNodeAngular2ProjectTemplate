@11468db6-e307-4cd6-8fdb-6812285d596d
Feature: Homecontroller is the first backend controller.
	Scenario: test the api.
		Given Prepare the fake request.
		When Exectue the fake request.
		Then The result of title and asyncContent are "myApp Title" and "Bibby_Foo".
	Scenario: test supertest
		Given Prepare the supertest fake request.
		When Exectue the super fake request.
		Then The result of name is "tobi"
		
		

	
