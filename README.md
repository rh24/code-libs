# Code Libs

Code Libs is a full-stack web application that draws from both a mad libs API and user contributions to bring this phrasal template word game online for everyone's enjoyment. Users may share their game links with one another, save games for later, and contribute to each other's games.

Additional features include the ability to upvote finished games and browse top-voted games by template. If the owner of the game is dissatisfied with their result, they may delete the game from the database at the click of a button. User's can choose not to save their end result as well and start on a different template instead.

In the future, users will be able to query a word generating API to help them get unstuck on possible entries. Templates will be categorized by topic. Templates can have many keyword tags, and each keyword can have many templates.

This application does not have user authentication.

## Installation

For necessary dependencies, run</br>

```$ npm install```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/rh24/code-libs. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

## License

This project is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Team Members

* Danul DeLeon
* Dominic Cook
* Rebecca Hong
* Richard Jiminez

### Conflict Plan

> What will your group do when it encounters conflict? </br>
* Discuss the conflict amongst ourselves and work to resolve the issues with the parties concerned.

> How will you raise concerns to members who are not adequately contributing?</br>
* Discuss the idea of the inadequite contributions with that person and work to find out what that person can contribute to the pverall project.

> What is your process to resolve conflicts?</br>
* We will Discuss the initial problem/conflict. Look at the possible available solutions then vote to see what the best one would be.

> How and when will you escalate the conflict if your attempts are unsuccessful?</br>
* After the first attempt, the person can try to bring in another teammate to help defuse the situation. If it is unsuccessful, that person should esculate the issue to the instructor.

### Communication Plan

> How will you communicate after hours and on the weekend?
* We will primarily maintain communication after hours via slack.

> What is your strategy for ensuring everyone's voices are heard?
* Asking for input on every idea and presenting the opportunity for every member to share their idea.

> How will you ensure that you are creating a safe environment where everyone feels comfortable speaking up?
* Take everyones idea into consideration and not put them down when sharing. Also by offering constructive critizism when necessary.

### Problem Domain

Our goal is to make a simple word game that brings an on paper childhood favorite online to the web. We thought the knowledge, skills, and tech we'd need to bring this game to life would be a great way to demonstrate the skills we've picked up during 301. As a stretch goal, we will think about a fun external API to incorporate, but for now, we're going to nail down the CRUD actions with minimal consumption of external APIs. We're focusing on creating a seamless user experience that is, all at once, fun, inviting, and easy to share.

### User Stories

* As a developer, I want to create a game that will delight potential employers so that they might hire us.
* As a developer, I want to make a join table of data showing finished games for each template so that users can view games by template and see what other contributors came up with.
* As a mad libs player, I want to have a good laugh at my stories and have them presented to me in a fun way.
* As a lurker, I want to browse other people's finished games so that I can share ridiculous ones with my friends.
* As a full stack developer, I want to create a database to store and access user's created finished games so that they may access them later.
* As a full stack developer, I want to use server-side technologies to persist content from the client to our database so that users can retrieve unfinished work.
* As a full stack developer, I want to use EJS to efficiently render user input in modular, reusable templates that will serve as views to the user.
* As a web designer, I want to create a mobile-first approach to my design to allow all users from all devices to access and interact with my site.
* As a user, I want to be able to submit suggested templates so that users have more options to entertain themselves and each other.
* As a user, I want to be able to share a link to other people which takes them to the completed story I have created.
* As a user, I want to be able to have the option to type in a word, or press a button that will randomly generate one for me.
* As a user, I want a clean, simple UI so that I can easily navigate through the app.

### MVP

* 5 seeded templates in the database.
* Create a form page which will receive the user inputs for use in the templates.
* Users will POST the game to the database when complete or wish to save.
* Users will PUT/update games if incomplete.
* After completing the game, a new page will display the filled out template with the words selected by the user previously.
* There will be a button on the completed game display page to start a new game.
* If our app detects not all 10 spaces are filled out, upon submit, it will save the game, NOT show the template.
* Users can add their own templates. Each one must contain exactly 10 blanks. The two column form will be structured so that the left input is a part of the skeleton, and the right input will be a dropdown select menu with parts of speech.
* Each game is associated with a username.
* Each game has a shareable link.
* Users can save their answers mid-game and come back to it later.
* Game table has a title, user's name, shareable link, selected 10 words, date created, votes, foreign key for template. (Belongs to template)
* Template table has a title, game skeleton w/ 10 EJS <%= %> in one long string, a creator, votes. (has many games).
* Keyword has a name. (each keyword has many templates and templates have many keywords).
* template_keyword join table will have template id foriegn key & keyword id foreign key.
* game_template join table will allow us to see all data re: completed games in relation to each unique template.</br></br>

* Create an “About Us” page within the application that lists details about the developers.
* Use proper SMACSS file structure for styling the application with a clean theme styled mobile-first.
* Ensure that state is persisted between the pages used.
* The app is deployed on Heroku with full functionality.

### Stretch Goals

> Play a narration of the games in Morgan Freeman's voice.</br></br>
> Hit an external API for random word generation for all blanks/required parts of speech.</br></br>
> Tag templates with keyword assignments, so users can search templates by keyword.</br></br>
> All users can assign keywords to templates.</br></br>

