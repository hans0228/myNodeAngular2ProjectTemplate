@ec5b5b98-e48e-494f-b2b6-7219f66b74a4
Feature: try to catch the exceptions.

  Scenario: Use "try catch" syntax to catch the excetpion.
     When Throw exception "xxx".
     Then The result is "xxx".
  
  Scenario: Use "try catch" syntax to catch the async excetpion.
    Given Prepare the promise "xxxxx1" to throws the exception.
     When Throw asyce the exception.
     Then The result is "xxxxx1".
