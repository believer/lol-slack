## League of Legends stats in Slack

At work we use [Slack](https://slack.com/) for day-to-day business and shenanigans. We are also a bunch of avid League of Legends players. My idea was to combine the two and add LoL-stats straight in to our #gaming-channel!

### Tech
* [Koa.js](koajs.com) - Node API
* [Highland.js](highlandjs.org) - Data manipulation
* [Docker](docker.io) - Running the service

### Installation
Three environment variables need to be setup before starting.
```
LOL_GLOBAL=https://global.api.pvp.net/api/lol/static-data/{region}
LOL_BASE=https://eune.api.pvp.net/api/lol/{region}
RIOT_API_KEY=[YOUR-API-KEY]
```

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
Slack have provided a great way for testing the message formatting [right here](https://api.slack.com/docs/formatting/builder). Each command also have a direct *TRY IT* link with a typical message and the response has a URL directly to the Slack formatting. This is how the message will look in the chat, instead of just looking at the JSON that the API reponds with ;)

### Slash commands
The service responds to slash commands, i.e. `/lol` as a message. The available commands are listed below.

* region = eune, euw, na and so on `default: eune`
* platform = eun1, euw1, na1 and so on `default: eun1`

#### `/lol freeToPlay <region>`
#### [TRY IT!](https://api.slack.com/docs/formatting/builder?msg=%7B%22mrkdwn%22:true,%22text%22:%22*League%20of%20Legends%20-%20Free%20to%20play%20champions*%22,%22attachments%22:%5B%7B%22fields%22:%5B%7B%22title%22:%22Blitzcrank%22,%22value%22:%22the%20Great%20Steam%20Golem%22,%22short%22:true%7D,%7B%22title%22:%22Gragas%22,%22value%22:%22the%20Rabble%20Rouser%22,%22short%22:true%7D,%7B%22title%22:%22Kalista%22,%22value%22:%22the%20Spear%20of%20Vengeance%22,%22short%22:true%7D,%7B%22title%22:%22Kassadin%22,%22value%22:%22the%20Void%20Walker%22,%22short%22:true%7D,%7B%22title%22:%22Lulu%22,%22value%22:%22the%20Fae%20Sorceress%22,%22short%22:true%7D,%7B%22title%22:%22Orianna%22,%22value%22:%22the%20Lady%20of%20Clockwork%22,%22short%22:true%7D,%7B%22title%22:%22Sion%22,%22value%22:%22The%20Undead%20Juggernaut%22,%22short%22:true%7D,%7B%22title%22:%22Sivir%22,%22value%22:%22the%20Battle%20Mistress%22,%22short%22:true%7D,%7B%22title%22:%22Skarner%22,%22value%22:%22the%20Crystal%20Vanguard%22,%22short%22:true%7D,%7B%22title%22:%22Tahm%20Kench%22,%22value%22:%22the%20River%20King%22,%22short%22:true%7D%5D%7D%5D%7D)

Displays the current champions who are free to play.

![freeToPlay command](/assets/freeToPlay.png)

#### `/lol help`
#### [TRY IT!](https://api.slack.com/docs/formatting/builder?msg=%7B%22text%22%3A%22*League%20of%20Legends*%5Cn%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%5Cn*Commands%3A*%5Cn%5Cn%60%2Flol%20freeToPlay%20%3CsummonerName%3E%60%5CnDisplays%20the%20current%20champions%20that%20are%20free%20to%20play%5Cn%60%2Flol%20latest%20%3CsummonerName%3E%60%5CnDisplays%20the%20latest%20match%5Cn%60%2Flol%20status%20%3CregionSlug%3E%60%5CnDisplays%20the%20status%20of%20the%20servers.%5CnRegion%20slug%20is%20EUNE%2C%20EUW%2C%20NA%20and%20so%20on.%5Cn%60%2Flol%20team%20%3CsummonerName%3E%60%5CnDisplays%20the%20teams%20of%20a%20summoner%5Cn%60%2Flol%20topThreeChamps%20%3CsummonerName%3E%60%5CnDisplays%20the%20top%20three%20champions%20played%5Cn%60%2Flol%20wins%20%3CsummonerName%3E%60%5CnDisplays%20wins%20for%20all%20categories%5Cn%5Cn%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%5Cn%60%2Flol%20help%60%5CnDisplays%20this%20information%5Cn%22%2C%22mrkdwn%22%3Atrue%7D)

Display the help message only to the user who requested the help. (Also responds if provided command does not exist)

![help command](/assets/help.png)

#### `/lol latest <summonerName> <region>`
#### [TRY IT!](https://api.slack.com/docs/formatting/builder?msg=%7B%22mrkdwn%22%3Atrue%2C%22text%22%3A%22*League%20of%20Legends%20-%20Latest%20game%20for%20believer%20*%5CnThe%20game%20ended%20in%20_victory_%20after%2022%3A51%22%2C%22attachments%22%3A%5B%7B%22mrkdwn_in%22%3A%5B%22text%22%5D%2C%22title%22%3A%22Sivir%20-%20the%20Battle%20Mistress%22%2C%22thumb_url%22%3A%22http%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2F5.2.1%2Fimg%2Fchampion%2FSivir.png%22%2C%22fields%22%3A%5B%7B%22title%22%3A%22Score%22%2C%22value%22%3A%225%20%2F%201%20%2F%208%22%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22KDA%22%2C%22value%22%3A13%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22CS%22%2C%22value%22%3A148%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Gold%22%2C%22value%22%3A10217%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Multikill%22%2C%22value%22%3A%22Single%20kill%22%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Level%22%2C%22value%22%3A12%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Wards%20(placed%2Fkilled)%22%2C%22value%22%3A%228%20%2F%201%22%2C%22short%22%3Atrue%7D%5D%7D%5D%7D)

Displays statistics from a summoner's latest game.

![latest command](/assets/latest.png)

#### `/lol league <summonerName> <region>`
#### [TRY IT!](https://api.slack.com/docs/formatting/builder?msg=%7B%22mrkdwn%22:true,%22text%22:%22*League%20of%20Legends%20-%20Wins%20for%20believer%20(EUNE)*%22,%22attachments%22:%5B%7B%22title%22:%22Malphite's%20Sorcerers%22,%22fields%22:%5B%7B%22title%22:%22Division%22,%22value%22:%22GOLD%20IV%22,%22short%22:true%7D,%7B%22title%22:%22Wins%20/%20Losses%20(ratio)%22,%22value%22:%22157%20/%20145%20(51.99%25)%22,%22short%22:true%7D,%7B%22title%22:%22League%20points%22,%22value%22:48,%22short%22:true%7D,%7B%22title%22:%22Hot%20streak%22,%22value%22:%22No%22,%22short%22:true%7D,%7B%22title%22:%22Veteran%22,%22value%22:%22No%22,%22short%22:true%7D,%7B%22title%22:%22New%20in%20league%22,%22value%22:%22No%22,%22short%22:true%7D,%7B%22title%22:%22Inactive%22,%22value%22:%22No%22,%22short%22:true%7D%5D%7D%5D%7D)

Displays division and stats for a summoner.

![league command](/assets/league.PNG)

#### `/lol masteryScore <summonerName> <region>`
#### [TRY IT!](https://api.slack.com/docs/formatting/builder?msg=%7B%22mrkdwn%22:true,%22text%22:%22*League%20of%20Legends%20-%20Mastery%20score%20for%20believer%20is%20_184_%20(EUNE)*%22%7D)

Displays total mastery score of a summoner.

![masteryScore command](/assets/masteryScore.png)

#### `/lol rankedMatches <summonerName> <region>`
#### [TRY IT!](https://api.slack.com/docs/formatting/builder?msg=%7B%22mrkdwn%22:true,%22text%22:%22*League%20of%20Legends%20-%20Ranked%20matches%20last%2024%20hours%20for%20believer%20(EUNE)*%22,%22attachments%22:%5B%7B%22mrkdwn_in%22:%5B%22text%22%5D,%22thumb_url%22:%22http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/Sivir.png%22,%22title%22:%22Match%20played%20on%202016-04-28%2021:01%22,%22fields%22:%5B%7B%22title%22:%22Lane%22,%22value%22:%22BOTTOM%22,%22short%22:true%7D,%7B%22title%22:%22Role%22,%22value%22:%22DUO_CARRY%22,%22short%22:true%7D,%7B%22title%22:%22Champion%22,%22value%22:%22Sivir%22,%22short%22:true%7D,%7B%22title%22:%22Duration%22,%22value%22:%2222:51%22,%22short%22:true%7D%5D%7D,%7B%22mrkdwn_in%22:%5B%22text%22%5D,%22thumb_url%22:%22http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/Ekko.png%22,%22title%22:%22Match%20played%20on%202016-04-28%2020:20%22,%22fields%22:%5B%7B%22title%22:%22Lane%22,%22value%22:%22TOP%22,%22short%22:true%7D,%7B%22title%22:%22Role%22,%22value%22:%22SOLO%22,%22short%22:true%7D,%7B%22title%22:%22Champion%22,%22value%22:%22Ekko%22,%22short%22:true%7D,%7B%22title%22:%22Duration%22,%22value%22:%2230:30%22,%22short%22:true%7D%5D%7D%5D%7D)

Displays ranked matches from the last 24 hours.

![rankedMatches command](/assets/rankedMatches.png)

#### `/lol status <region>`
#### [TRY IT!](https://api.slack.com/docs/formatting/builder?msg=%7B%22mrkdwn%22:true,%22text%22:%22*League%20of%20Legends%20-%20Status%20for%20EU%20Nordic%20&%20East*%22,%22attachments%22:%5B%7B%22fields%22:%5B%7B%22title%22:%22Game%22,%22value%22:%22online%22,%22short%22:true%7D,%7B%22title%22:%22Store%22,%22value%22:%22online%22,%22short%22:true%7D,%7B%22title%22:%22Website%22,%22value%22:%22online%22,%22short%22:true%7D,%7B%22title%22:%22Client%22,%22value%22:%22online%22,%22short%22:true%7D%5D%7D%5D%7D)

Displays the current status of the servers in a region.

![status command](/assets/status.png)

#### `/lol team <summonerName> <region>`
#### [TRY IT!](https://api.slack.com/docs/formatting/builder?msg=%7B%22mrkdwn%22%3Atrue%2C%22text%22%3A%22*League%20of%20Legends%20-%20Team%20for%20believer*%22%2C%22attachments%22%3A%5B%7B%22mrkdwn_in%22%3A%5B%22text%22%5D%2C%22title%22%3A%22%5BIteamS%5D%20-%20Iteam%20Solutions%22%2C%22fields%22%3A%5B%7B%22title%22%3A%22Ranked%205v5%20(wins%2Flosses)%22%2C%22value%22%3A%220%20%2F%200%22%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Ranked%203v3%20(wins%2Flosses)%22%2C%22value%22%3A%220%20%2F%200%22%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Created%20on%22%2C%22value%22%3A%222016-02-27%2010%3A23%22%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Roster%22%2C%22value%22%3A%22Megardt%20(lvl%2030)%5Cnbeliever%20(lvl%2030)%20(Owner)%5CnWarWereDeclared%20(lvl%2030)%5Cn%22%2C%22short%22%3Atrue%7D%5D%7D%5D%7D)

Displays the teams of a summoner.

![team command](/assets/team.png)

#### `/lol topThreeChamps <summonerName> <region> <platform>`
#### [TRY IT!](https://api.slack.com/docs/formatting/builder?msg=%7B%22mrkdwn%22%3Atrue%2C%22text%22%3A%22*League%20of%20Legends%20-%20Top%20three%20champions%20for%20believer*%22%2C%22attachments%22%3A%5B%7B%22title%22%3A%22Sivir%20-%20the%20Battle%20Mistress%20(lvl%205)%22%2C%22thumb_url%22%3A%22http%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2F5.2.1%2Fimg%2Fchampion%2FSivir.png%22%2C%22fields%22%3A%5B%7B%22value%22%3A%22Known%20as%20the%20Battle%20Mistress%2C%20Sivir%20is%20a%20mercenary%20with%20a%20ruthless%20reputation.%20Combining%20unflinching%20bravery%20with%20endless%20ambition%2C%20she%20has%20garnered%20great%20fame%20and%20fortune.%20Faced%20with%20the%20revelation%20of%20her%20mysterious%20heritage%2C%20Sivir%20must%20weigh%20her%20...%22%7D%2C%7B%22title%22%3A%22Highest%20grade%22%2C%22value%22%3A%22S%20%22%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Champion%20points%22%2C%22value%22%3A106602%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Latest%20playtime%22%2C%22value%22%3A%222016-04-28%2021%3A26%22%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Chest%20granted%22%2C%22value%22%3A%22Yes%22%2C%22short%22%3Atrue%7D%5D%7D%2C%7B%22title%22%3A%22Viktor%20-%20the%20Machine%20Herald%20(lvl%205)%22%2C%22thumb_url%22%3A%22http%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2F5.2.1%2Fimg%2Fchampion%2FViktor.png%22%2C%22fields%22%3A%5B%7B%22value%22%3A%22Early%20in%20life%2C%20Viktor%20discovered%20his%20passion%20for%20science%20and%20invention%2C%20particularly%20in%20the%20field%20of%20mechanical%20automation.%20He%20attended%20Zaun%27s%20prestigious%20College%20of%20Techmaturgy%20and%20led%20the%20team%20that%20constructed%20Blitzcrank%20-%20a%20scientific%20breakthrough%20...%22%7D%2C%7B%22title%22%3A%22Highest%20grade%22%2C%22value%22%3A%22A%20%22%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Champion%20points%22%2C%22value%22%3A68216%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Latest%20playtime%22%2C%22value%22%3A%222016-04-11%2020%3A46%22%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Chest%20granted%22%2C%22value%22%3A%22No%22%2C%22short%22%3Atrue%7D%5D%7D%2C%7B%22title%22%3A%22Lux%20-%20the%20Lady%20of%20Luminosity%20(lvl%205)%22%2C%22thumb_url%22%3A%22http%3A%2F%2Fddragon.leagueoflegends.com%2Fcdn%2F5.2.1%2Fimg%2Fchampion%2FLux.png%22%2C%22fields%22%3A%5B%7B%22value%22%3A%22Born%20to%20the%20prestigious%20Crownguards%2C%20the%20paragon%20family%20of%20Demacian%20service%2C%20Luxanna%20was%20destined%20for%20greatness.%20She%20grew%20up%20as%20the%20family%27s%20only%20daughter%2C%20and%20she%20immediately%20took%20to%20the%20advanced%20education%20and%20lavish%20parties%20required%20of%20families%20as%20...%22%7D%2C%7B%22title%22%3A%22Highest%20grade%22%2C%22value%22%3A%22S%22%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Champion%20points%22%2C%22value%22%3A60567%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Latest%20playtime%22%2C%22value%22%3A%222016-04-15%2020%3A03%22%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Chest%20granted%22%2C%22value%22%3A%22Yes%22%2C%22short%22%3Atrue%7D%5D%7D%5D%7D)

Displays the top three champions for a given summoner name.

![topThreeChamps command](/assets/topThreeChamps.png)

#### `/lol wins <summonerName> <region>`
#### [TRY IT!](https://api.slack.com/docs/formatting/builder?msg=%7B%22mrkdwn%22%3Atrue%2C%22text%22%3A%22*League%20of%20Legends%20-%20Wins%20for%20believer%20(lvl%2030)*%22%2C%22attachments%22%3A%5B%7B%22title%22%3A%22Total%20wins%3A%20416%22%2C%22fields%22%3A%5B%7B%22title%22%3A%22AramUnranked5x5%22%2C%22value%22%3A36%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22CAP5x5%22%2C%22value%22%3A11%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22CoopVsAI%22%2C%22value%22%3A18%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Ascension%22%2C%22value%22%3A2%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Unranked%22%2C%22value%22%3A186%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22URF%22%2C%22value%22%3A8%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22RankedSolo5x5%22%2C%22value%22%3A155%2C%22short%22%3Atrue%7D%5D%7D%5D%7D)

Display the number of wins of a summoner.

![wins command](/assets/wins.png)
