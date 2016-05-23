@trytocatchtheexceptions
Feature: try to catch the exceptions.

  Scenario: Use "try catch" syntax to catch the excetpion.
     When Throw exception "xxx".
     Then The result is "xxx".
  
  Scenario: Use "try catch" syntax to catch the async excetpion.
    Given Prepare the promise "xxxxx1" to throws the exception.
     When Throw asyce the exception.
     Then The result is "xxxxx1".
