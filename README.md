## League of Legends stats in Slack

At work we use [Slack](https://slack.com/) for day-to-day business and shenanigans. We are also a bunch of avid League of Legends players. My idea was to combine the two and add LoL-stats straight in to our #gaming-channel!

### Tech
* [Koa.js](koajs.com) - Node API
* [Highland.js](highlandjs.org) - Data manipulation
* [Docker](docker.io) - Running the service

### Installation
// TODO

### Slash commands
The service responds to slash commands, i.e. `/lol` as a message. The available commands are listed below.

#### `/lol freeToPlay`
Displays the current champion who are free to play.

#### `/lol help`
Display the help message only to the user who requested the help.
(Also responds if provided command does not exist)

![help command](/assets/help.png)

#### `/lol latest <summonerName>`
Displays the latest game of a summoner.

#### `/lol status <region>`
Displays the current status of the servers in a region.

#### `/lol team <summonerName>`
Displays the teams of a summoner.

#### `/lol topThreeChamps <summonerName>`
Displays the top three champions for a given summoner name.

#### `/lol wins <summonerName>`
Display the number of wins of a summoner.
