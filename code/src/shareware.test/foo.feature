@3d06958a-2676-42a4-b240-57eeaaeb0dbd
Feature: test easy class

	Scenario: Test the method of getName.
	
		Given Prepare the Foo class.
		When Exectute the method of getName.
		Then The result equal "Bibby_Foo".
		
	Scenario: Test the async method of getNameAsync.
		Given Prepare the Foo class.
		When Exectute the method of getNameAsync.
		Then The result equal "Bibby_Foo".
		
	Scenario: Use the proxyquire to test the method of getInt.
		Given Prepare the proxy of foo to fake the Bar.getNumber.
		When Execute the method of foo.getInt.
		Then the result equal 456 and the count of Bar.getNumber is one.
		
	Scenario: Use the sinon to test the method of getInt.
		Given Prepare the proxy of sinon to fake the Bar.getNumber.
		When Execute the method of foo.getInt.
		Then the result equal 456 and the count of Bar.getNumber is one.
	