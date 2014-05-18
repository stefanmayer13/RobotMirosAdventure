RobotMirosAdventure
===================

## INSTALL

1. Install [NodeJS](http://nodejs.org "http://nodejs.org")
⋅⋅* Restart terminal or reload new PATH
3. Run `npm install` to install node modules
4. Install bower `npm install bower -g`
5. Install grunt-cli `npm install grunt-cli -g`
⋅⋅* Restart terminal or reload new PATH
7. Install bower dependencies `bower install`

## RUN

1. Run `grunt serve` to start server
2. If not opened automatically, enter [http://localhost:4320](http://localhost:4320/) into the browser

## RULES

In the *game* and the *test/spec* folders are everything that is needed to program the robot.
The robot can only move 1 step (up, left, down or right. Diagonal movements are not allowed).
The files are reloaded automatically. There is no need to restart the server.

### Interface

* **nextStep** is called for every move the robot is doing.
* The **extensions** object allows to access special features like the robots sensors.
* See *test\spec\robot.spec.js* on how to access the sensors.
* **solve** is used to solve problems (see fronted for more information about the problem to solve)
* **getState** and **setState** is used to store and restore the robots last state. Change it if you need more state variables.

## FRONTEND

Press the start button on the top left corner to start the robots movement. The speed can be changed at all time. To reset the robot, reload the page.

## SOLUTION

An implementation which solves all problems can be found in the solution directory.
