@ce480339-62e5-4681-9cf4-8d4ec91ae14e
Feature: Store the data to the collection of user.

  Scenario: Create the user and store to database.
    Given Prepare the user data.
      | name  | age | sex  | birthday   | 
      | Bibby | 18  | true | 1988/01/04 | 
     When Add user data to database.
     Then There is a user in database.