## League of Legends stats in Slack

At work we use [Slack](https://slack.com/) for day-to-day business and shenanigans. We are also a bunch of avid League of Legends players. My idea was to combine the two and add LoL-stats straight in to our #gaming-channel!

### Tech
* [Koa.js](koajs.com) - Node API
* [Highland.js](highlandjs.org) - Data manipulation
* [Docker](docker.io) - Running the service

### Installation
```
$ git clone https://github.com/believer/lol-slack.git
$ cd lol-slack
$ npm install
$ npm start
```

This starts one `POST` route at [http://localhost:3000/lol](http://localhost:3000/lol). So to test it post a JSON object on the form of for example:

```
{
  "text": "wins <summonerName>"
}
```

## Testing
Slack have provided a great way for testing the formatting of the responses [right here](https://api.slack.com/docs/formatting/builder). Each command below also have a direct link with a typical response. This displays how the message will look in the chat, instead of just looking at the JSON that the API responds with!

### Slash commands
The service responds to slash commands, i.e. `/lol` as a message. The available commands are listed below.

#### `/lol freeToPlay`
Displays the current champions who are free to play.

#### `/lol help`
#### [TRY IT!](https://api.slack.com/docs/formatting/builder?msg=%7B%22text%22%3A%22*League%20of%20Legends*%5Cn%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%5Cn*Commands%3A*%5Cn%5Cn%60%2Flol%20freeToPlay%20%3CsummonerName%3E%60%5CnDisplays%20the%20current%20champions%20that%20are%20free%20to%20play%5Cn%60%2Flol%20latest%20%3CsummonerName%3E%60%5CnDisplays%20the%20latest%20match%5Cn%60%2Flol%20status%20%3CregionSlug%3E%60%5CnDisplays%20the%20status%20of%20the%20servers.%5CnRegion%20slug%20is%20EUNE%2C%20EUW%2C%20NA%20and%20so%20on.%5Cn%60%2Flol%20team%20%3CsummonerName%3E%60%5CnDisplays%20the%20teams%20of%20a%20summoner%5Cn%60%2Flol%20topThreeChamps%20%3CsummonerName%3E%60%5CnDisplays%20the%20top%20three%20champions%20played%5Cn%60%2Flol%20wins%20%3CsummonerName%3E%60%5CnDisplays%20wins%20for%20all%20categories%5Cn%5Cn%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%5Cn%60%2Flol%20help%60%5CnDisplays%20this%20information%5Cn%22%2C%22mrkdwn%22%3Atrue%7D)

Display the help message only to the user who requested the help.
(Also responds if provided command does not exist)

![help command](/assets/help.png)

#### `/lol latest <summonerName>`
Displays the latest game of a summoner.

#### `/lol status <region>`
Displays the current status of the servers in a region.

![status command](/assets/status.png)

#### `/lol team <summonerName>`
Displays the teams of a summoner.

![team command](/assets/team.png)

#### `/lol topThreeChamps <summonerName>`
Displays the top three champions for a given summoner name.

![topThreeChamps command](/assets/topThreeChamps.png)

#### `/lol wins <summonerName>`
Display the number of wins of a summoner.
