# CS 290 Final Project Plan

## Introduction

In our final project, our goal is to build an application that will allow users to compete against each other and see who can pick the best investment ideas. The model will be based on the many extremely popular fantasy sports applications. There are dozens of fantasy football, basketball, baseball, and other sports websites. While these websites are widely popular, there are none that go outside the world of sports into finance. We feel that this is an area of interest for Duke students, many of whom go into finance after graduating. The application will allow users to make a profile and select stocks in different categories. They will be competing against other users, to achieve the best returns over the week or over the month. Unlike online trading websites, we will not provide users the option to buy or sell stocks, the “purchases” will be fake, but still recorded to as stats for the user.

## Features Overview
1. Welcome screen. Create an account with a picture, email, and username, or login to existing account using a username and email.  Email accounts must end with @duke.edu
2. Change account information, once already logged in the user can change their user name or picture, must keep their email account the same.
3. Upon logging in, the user will see a list of weeks of play (like trello). These will display summary information about each week's competition, but not all of the information. They will be arranged in chronological order, with the current week's competition first, and the completed weeks' competitions coming after. There will be multiple competitions for each week in different categories (large cap / short cap stocks for example)
4. The user will be allowed to filter the list competitions to join or view based on category.
5. By clicking on a competition, the user will be able to access additional data
6. By clicking on The current competition will show the current status of all of the users who have joined. This current status will be the most updated finacial stats for each user next to their name.
7. The current competition will allow the user to join by selecting the stocks they want to buy. This will add them to the list of users who have joined.
8. The list of stocks that the user can select, might be a randomized or a somehow predetermined subset of all stocks that fall within the category of that compeition. The data will be updated using the APIs described in the "Actual Data" section.
9. Below the list of stocks, the user will see the top financial news headlines. 
10. Once that weeks competition has ended, if the user entered, then they will be notified by email how they placed.
11. By clicking on a previous competition the user will see the top 10 finshers, with stats on how they did. They will also be able to see the portfolio of that week's winner
12. A seperate overall leaderboard for the registered users that displays their stats of all competitions. Users will be able to see which users have the most wins, best average finsih position etc.
13. Each competition will have a different category rangining from different types of stocks, to different types of investment opportunites like bonds, or commodities, or cryptocurrencies.
14. Any number of users will be allowed to join an active compeititon.
15. A user will have no limit on the number of competitons they can join
16. Users will have their own profile where their information will be displayed. They will be able to view other users profiles, and be able to message them through email to discuss.
17. Invitations to join competitions can be sent over email.
18. Possible implementation of friend requests, mutual friends, and other features of typical social networks.
19. Options to share status/performance via Twitter and Facebook.
20. Customize the UI of your profile and competition views.
## Technologies We Will Use

To store user data, we will utilize Firebase's database. Pictures will be stored via Firebase storage. We plan to use Vue components to manage competitions and leaderboards, as well as for filtering competitions by category. Bootstrap will be used for styling our site, and we will use the official Facebook and Twitter APIs for our social features. Additionally, we will take advantage of the Alpha Vantage API for financial data, and the Google News API for news headlines (see 'Actual Data' section below for more details). Finally, by using NPM we will ensure that all of our required dependencies are installed properly.

## Team Responsibilities
* Kelley : View all competions screen, view current compeitions, profile view, leaderboard
* Peter : login, view current/previous, social integration (Email, Facebook, Twitter)

## Actual Data
#### Quantitative Data
The data below is the daily adjusted time series data for the microsoft stock. For display purposes, we have requested the compact output size of 100 data points, but it is possible to obtain the full data from the last 20 years. The data comes from URL: [`https://www.alphavantage.co/query?**function**=TIME_SERIES_DAILY_ADJUSTED&**symbol**=MSFT&**apikey**=demo`](https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=demo)
and is the taken from the Alpha Vantage API. Alpha Vantage is free online API in JSON and CSV formats that provides realtime and histroical equity data, as well as over 50 technical indicators. 

We will use this data to figure out the price at which a user buys and sells their fantasy stocks. We will also use the same API to request technical indicators for stocks to assist users in their buying and selling decisions.
```json
{
    "Meta Data": {
        "1\. Information": "Intraday (1min) prices and volumes",
        "2\. Symbol": "MSFT",
        "3\. Last Refreshed": "2018-04-09 16:00:00",
        "4\. Interval": "1min",
        "5\. Output Size": "Compact",
        "6\. Time Zone": "US/Eastern"
    },
    "Time Series (1min)": {
        "2018-04-09 16:00:00": {
            "1\. open": "90.7400",
            "2\. high": "90.8000",
            "3\. low": "90.6200",
            "4\. close": "90.7700",
            "5\. volume": "4436459"
        },
        "2018-04-09 15:59:00": {
            "1\. open": "90.8000",
            "2\. high": "90.8100",
            "3\. low": "90.6200",
            "4\. close": "90.7300",
            "5\. volume": "267962"
        },
        "2018-04-09 15:58:00": {
            "1\. open": "90.8500",
            "2\. high": "90.9600",
            "3\. low": "90.7500",
            "4\. close": "90.8000",
            "5\. volume": "212079"
        },
        "2018-04-09 15:57:00": {
            "1\. open": "91.0100",
            "2\. high": "91.0300",
            "3\. low": "90.8500",
            "4\. close": "90.8500",
            "5\. volume": "159188"
        },
        "2018-04-09 15:56:00": {
            "1\. open": "91.1200",
            "2\. high": "91.1700",
            "3\. low": "90.9700",
            "4\. close": "91.0100",
            "5\. volume": "215083"
        },
        "2018-04-09 15:55:00": {
            "1\. open": "91.0950",
            "2\. high": "91.1700",
            "3\. low": "91.0950",
            "4\. close": "91.1250",
            "5\. volume": "128199"
        },
        "2018-04-09 15:54:00": {
            "1\. open": "91.1100",
            "2\. high": "91.1100",
            "3\. low": "91.0200",
            "4\. close": "91.0950",
            "5\. volume": "149983"
        },
        "2018-04-09 15:53:00": {
            "1\. open": "91.1400",
            "2\. high": "91.1700",
            "3\. low": "91.0300",
            "4\. close": "91.1100",
            "5\. volume": "149010"
        },
        "2018-04-09 15:52:00": {
            "1\. open": "91.0550",
            "2\. high": "91.1800",
            "3\. low": "91.0300",
            "4\. close": "91.1450",
            "5\. volume": "147307"
        },
        "2018-04-09 15:51:00": {
            "1\. open": "90.9600",
            "2\. high": "91.1200",
            "3\. low": "90.9400",
            "4\. close": "91.0500",
            "5\. volume": "210948"
        },
        "2018-04-09 15:50:00": {
            "1\. open": "91.0750",
            "2\. high": "91.0850",
            "3\. low": "90.8000",
            "4\. close": "90.9550",
            "5\. volume": "233919"
        },
        "2018-04-09 15:49:00": {
            "1\. open": "91.0600",
            "2\. high": "91.1200",
            "3\. low": "91.0600",
            "4\. close": "91.0700",
            "5\. volume": "88974"
        },
        "2018-04-09 15:48:00": {
            "1\. open": "91.2050",
            "2\. high": "91.2050",
            "3\. low": "91.0400",
            "4\. close": "91.0600",
            "5\. volume": "147316"
        },
        "2018-04-09 15:47:00": {
            "1\. open": "91.2700",
            "2\. high": "91.2900",
            "3\. low": "91.1750",
            "4\. close": "91.2050",
            "5\. volume": "112421"
        },
        "2018-04-09 15:46:00": {
            "1\. open": "91.1700",
            "2\. high": "91.2700",
            "3\. low": "91.1000",
            "4\. close": "91.2700",
            "5\. volume": "129683"
        },
        "2018-04-09 15:45:00": {
            "1\. open": "91.2200",
            "2\. high": "91.2200",
            "3\. low": "91.1100",
            "4\. close": "91.1650",
            "5\. volume": "68074"
        },
        "2018-04-09 15:44:00": {
            "1\. open": "91.0400",
            "2\. high": "91.2500",
            "3\. low": "91.0100",
            "4\. close": "91.2200",
            "5\. volume": "120082"
        },
        "2018-04-09 15:43:00": {
            "1\. open": "91.1600",
            "2\. high": "91.1900",
            "3\. low": "91.0300",
            "4\. close": "91.0400",
            "5\. volume": "89592"
        },
        "2018-04-09 15:42:00": {
            "1\. open": "91.1500",
            "2\. high": "91.2200",
            "3\. low": "91.1000",
            "4\. close": "91.1650",
            "5\. volume": "119810"
        },
        "2018-04-09 15:41:00": {
            "1\. open": "91.2200",
            "2\. high": "91.2400",
            "3\. low": "91.1300",
            "4\. close": "91.1400",
            "5\. volume": "110740"
        },
        "2018-04-09 15:40:00": {
            "1\. open": "91.3100",
            "2\. high": "91.3350",
            "3\. low": "91.2000",
            "4\. close": "91.2100",
            "5\. volume": "90222"
        },
        "2018-04-09 15:39:00": {
            "1\. open": "91.2500",
            "2\. high": "91.3900",
            "3\. low": "91.2500",
            "4\. close": "91.3200",
            "5\. volume": "92906"
        },
        "2018-04-09 15:38:00": {
            "1\. open": "91.2750",
            "2\. high": "91.2800",
            "3\. low": "91.1900",
            "4\. close": "91.2500",
            "5\. volume": "59382"
        },
        "2018-04-09 15:37:00": {
            "1\. open": "91.1610",
            "2\. high": "91.3000",
            "3\. low": "91.1400",
            "4\. close": "91.2700",
            "5\. volume": "96848"
        },
        "2018-04-09 15:36:00": {
            "1\. open": "91.1800",
            "2\. high": "91.2800",
            "3\. low": "91.1600",
            "4\. close": "91.1600",
            "5\. volume": "107313"
        },
        "2018-04-09 15:35:00": {
            "1\. open": "91.3200",
            "2\. high": "91.3400",
            "3\. low": "91.1700",
            "4\. close": "91.1700",
            "5\. volume": "218811"
        },
        "2018-04-09 15:34:00": {
            "1\. open": "91.4600",
            "2\. high": "91.4800",
            "3\. low": "91.3100",
            "4\. close": "91.3200",
            "5\. volume": "88418"
        },
        "2018-04-09 15:33:00": {
            "1\. open": "91.4399",
            "2\. high": "91.5300",
            "3\. low": "91.3950",
            "4\. close": "91.4600",
            "5\. volume": "130565"
        },
        "2018-04-09 15:32:00": {
            "1\. open": "91.4400",
            "2\. high": "91.4799",
            "3\. low": "91.4250",
            "4\. close": "91.4450",
            "5\. volume": "69799"
        },
        "2018-04-09 15:31:00": {
            "1\. open": "91.4300",
            "2\. high": "91.4800",
            "3\. low": "91.3700",
            "4\. close": "91.4400",
            "5\. volume": "96725"
        },
        "2018-04-09 15:30:00": {
            "1\. open": "91.3100",
            "2\. high": "91.4550",
            "3\. low": "91.3100",
            "4\. close": "91.4290",
            "5\. volume": "79317"
        },
        "2018-04-09 15:29:00": {
            "1\. open": "91.3300",
            "2\. high": "91.3556",
            "3\. low": "91.2300",
            "4\. close": "91.3200",
            "5\. volume": "116682"
        },
        "2018-04-09 15:28:00": {
            "1\. open": "91.3100",
            "2\. high": "91.4400",
            "3\. low": "91.2900",
            "4\. close": "91.3300",
            "5\. volume": "90874"
        },
        "2018-04-09 15:27:00": {
            "1\. open": "91.2900",
            "2\. high": "91.3650",
            "3\. low": "91.2700",
            "4\. close": "91.3000",
            "5\. volume": "107052"
        },
        "2018-04-09 15:26:00": {
            "1\. open": "91.3550",
            "2\. high": "91.3600",
            "3\. low": "91.2600",
            "4\. close": "91.2900",
            "5\. volume": "92977"
        },
        "2018-04-09 15:25:00": {
            "1\. open": "91.3700",
            "2\. high": "91.4100",
            "3\. low": "91.2900",
            "4\. close": "91.3500",
            "5\. volume": "112453"
        },
        "2018-04-09 15:24:00": {
            "1\. open": "91.3600",
            "2\. high": "91.4600",
            "3\. low": "91.3000",
            "4\. close": "91.3700",
            "5\. volume": "149166"
        },
        "2018-04-09 15:23:00": {
            "1\. open": "91.4800",
            "2\. high": "91.5000",
            "3\. low": "91.3400",
            "4\. close": "91.3600",
            "5\. volume": "154217"
        },
        "2018-04-09 15:22:00": {
            "1\. open": "91.4900",
            "2\. high": "91.5300",
            "3\. low": "91.4700",
            "4\. close": "91.4900",
            "5\. volume": "112414"
        },
        "2018-04-09 15:21:00": {
            "1\. open": "91.6100",
            "2\. high": "91.6100",
            "3\. low": "91.4800",
            "4\. close": "91.4800",
            "5\. volume": "119934"
        },
        "2018-04-09 15:20:00": {
            "1\. open": "91.6550",
            "2\. high": "91.6800",
            "3\. low": "91.5900",
            "4\. close": "91.5900",
            "5\. volume": "85505"
        },
        "2018-04-09 15:19:00": {
            "1\. open": "91.7600",
            "2\. high": "91.7600",
            "3\. low": "91.6500",
            "4\. close": "91.6600",
            "5\. volume": "79472"
        },
        "2018-04-09 15:18:00": {
            "1\. open": "91.7400",
            "2\. high": "91.8300",
            "3\. low": "91.7000",
            "4\. close": "91.7650",
            "5\. volume": "71492"
        },
        "2018-04-09 15:17:00": {
            "1\. open": "91.8050",
            "2\. high": "91.8200",
            "3\. low": "91.7200",
            "4\. close": "91.7300",
            "5\. volume": "55931"
        },
        "2018-04-09 15:16:00": {
            "1\. open": "91.9050",
            "2\. high": "91.9074",
            "3\. low": "91.7900",
            "4\. close": "91.8100",
            "5\. volume": "50649"
        },
        "2018-04-09 15:15:00": {
            "1\. open": "91.9700",
            "2\. high": "91.9900",
            "3\. low": "91.8800",
            "4\. close": "91.8800",
            "5\. volume": "149666"
        },
        "2018-04-09 15:14:00": {
            "1\. open": "92.1100",
            "2\. high": "92.1100",
            "3\. low": "91.9700",
            "4\. close": "91.9700",
            "5\. volume": "65850"
        },
        "2018-04-09 15:13:00": {
            "1\. open": "92.1000",
            "2\. high": "92.1100",
            "3\. low": "92.0600",
            "4\. close": "92.1000",
            "5\. volume": "27905"
        },
        "2018-04-09 15:12:00": {
            "1\. open": "92.1900",
            "2\. high": "92.2150",
            "3\. low": "92.0600",
            "4\. close": "92.0900",
            "5\. volume": "46392"
        },
        "2018-04-09 15:11:00": {
            "1\. open": "92.1549",
            "2\. high": "92.2100",
            "3\. low": "92.1527",
            "4\. close": "92.2000",
            "5\. volume": "18824"
        },
        "2018-04-09 15:10:00": {
            "1\. open": "92.1900",
            "2\. high": "92.1900",
            "3\. low": "92.1100",
            "4\. close": "92.1500",
            "5\. volume": "25180"
        },
        "2018-04-09 15:09:00": {
            "1\. open": "92.1900",
            "2\. high": "92.2000",
            "3\. low": "92.1510",
            "4\. close": "92.1850",
            "5\. volume": "25571"
        },
        "2018-04-09 15:08:00": {
            "1\. open": "92.1500",
            "2\. high": "92.2000",
            "3\. low": "92.1500",
            "4\. close": "92.1900",
            "5\. volume": "21525"
        },
        "2018-04-09 15:07:00": {
            "1\. open": "92.1300",
            "2\. high": "92.1700",
            "3\. low": "92.1000",
            "4\. close": "92.1500",
            "5\. volume": "25486"
        },
        "2018-04-09 15:06:00": {
            "1\. open": "92.1800",
            "2\. high": "92.1900",
            "3\. low": "92.1000",
            "4\. close": "92.1200",
            "5\. volume": "31862"
        },
        "2018-04-09 15:05:00": {
            "1\. open": "92.1954",
            "2\. high": "92.2200",
            "3\. low": "92.1600",
            "4\. close": "92.1800",
            "5\. volume": "25592"
        },
        "2018-04-09 15:04:00": {
            "1\. open": "92.1199",
            "2\. high": "92.2100",
            "3\. low": "92.1100",
            "4\. close": "92.1900",
            "5\. volume": "35705"
        },
        "2018-04-09 15:03:00": {
            "1\. open": "92.1200",
            "2\. high": "92.1200",
            "3\. low": "92.0500",
            "4\. close": "92.1200",
            "5\. volume": "44651"
        },
        "2018-04-09 15:02:00": {
            "1\. open": "92.1900",
            "2\. high": "92.1967",
            "3\. low": "92.1200",
            "4\. close": "92.1250",
            "5\. volume": "47835"
        },
        "2018-04-09 15:01:00": {
            "1\. open": "92.2810",
            "2\. high": "92.2850",
            "3\. low": "92.1900",
            "4\. close": "92.1901",
            "5\. volume": "40326"
        },
        "2018-04-09 15:00:00": {
            "1\. open": "92.2649",
            "2\. high": "92.2950",
            "3\. low": "92.2500",
            "4\. close": "92.2850",
            "5\. volume": "32030"
        },
        "2018-04-09 14:59:00": {
            "1\. open": "92.2200",
            "2\. high": "92.2700",
            "3\. low": "92.1940",
            "4\. close": "92.2700",
            "5\. volume": "23658"
        },
        "2018-04-09 14:58:00": {
            "1\. open": "92.2461",
            "2\. high": "92.2500",
            "3\. low": "92.1900",
            "4\. close": "92.2200",
            "5\. volume": "34459"
        },
        "2018-04-09 14:57:00": {
            "1\. open": "92.1838",
            "2\. high": "92.2600",
            "3\. low": "92.1838",
            "4\. close": "92.2400",
            "5\. volume": "49776"
        },
        "2018-04-09 14:56:00": {
            "1\. open": "92.1368",
            "2\. high": "92.2000",
            "3\. low": "92.1350",
            "4\. close": "92.1800",
            "5\. volume": "27924"
        },
        "2018-04-09 14:55:00": {
            "1\. open": "92.1400",
            "2\. high": "92.1600",
            "3\. low": "92.1100",
            "4\. close": "92.1400",
            "5\. volume": "17076"
        },
        "2018-04-09 14:54:00": {
            "1\. open": "92.1100",
            "2\. high": "92.1850",
            "3\. low": "92.0950",
            "4\. close": "92.1400",
            "5\. volume": "49276"
        },
        "2018-04-09 14:53:00": {
            "1\. open": "92.0900",
            "2\. high": "92.1300",
            "3\. low": "92.0500",
            "4\. close": "92.1100",
            "5\. volume": "38066"
        },
        "2018-04-09 14:52:00": {
            "1\. open": "92.0600",
            "2\. high": "92.0900",
            "3\. low": "92.0600",
            "4\. close": "92.0900",
            "5\. volume": "20080"
        },
        "2018-04-09 14:51:00": {
            "1\. open": "92.0300",
            "2\. high": "92.0700",
            "3\. low": "92.0100",
            "4\. close": "92.0540",
            "5\. volume": "34806"
        },
        "2018-04-09 14:50:00": {
            "1\. open": "92.0500",
            "2\. high": "92.0700",
            "3\. low": "91.9900",
            "4\. close": "92.0400",
            "5\. volume": "33748"
        },
        "2018-04-09 14:49:00": {
            "1\. open": "91.9900",
            "2\. high": "92.1100",
            "3\. low": "91.9850",
            "4\. close": "92.0550",
            "5\. volume": "68872"
        },
        "2018-04-09 14:48:00": {
            "1\. open": "91.9800",
            "2\. high": "92.0700",
            "3\. low": "91.9500",
            "4\. close": "91.9900",
            "5\. volume": "74706"
        },
        "2018-04-09 14:47:00": {
            "1\. open": "91.9700",
            "2\. high": "92.0100",
            "3\. low": "91.9300",
            "4\. close": "91.9800",
            "5\. volume": "146794"
        },
        "2018-04-09 14:46:00": {
            "1\. open": "91.9300",
            "2\. high": "92.0200",
            "3\. low": "91.9115",
            "4\. close": "91.9700",
            "5\. volume": "69445"
        },
        "2018-04-09 14:45:00": {
            "1\. open": "91.9150",
            "2\. high": "91.9450",
            "3\. low": "91.8900",
            "4\. close": "91.9350",
            "5\. volume": "73209"
        },
        "2018-04-09 14:44:00": {
            "1\. open": "91.8950",
            "2\. high": "91.9450",
            "3\. low": "91.8888",
            "4\. close": "91.9200",
            "5\. volume": "42449"
        },
        "2018-04-09 14:43:00": {
            "1\. open": "91.9300",
            "2\. high": "91.9610",
            "3\. low": "91.8900",
            "4\. close": "91.8900",
            "5\. volume": "53663"
        },
        "2018-04-09 14:42:00": {
            "1\. open": "91.9700",
            "2\. high": "91.9800",
            "3\. low": "91.8800",
            "4\. close": "91.9400",
            "5\. volume": "66523"
        },
        "2018-04-09 14:41:00": {
            "1\. open": "92.0500",
            "2\. high": "92.0900",
            "3\. low": "91.9700",
            "4\. close": "91.9800",
            "5\. volume": "33897"
        },
        "2018-04-09 14:40:00": {
            "1\. open": "92.0400",
            "2\. high": "92.0570",
            "3\. low": "92.0240",
            "4\. close": "92.0410",
            "5\. volume": "25941"
        },
        "2018-04-09 14:39:00": {
            "1\. open": "91.9900",
            "2\. high": "92.0800",
            "3\. low": "91.9700",
            "4\. close": "92.0450",
            "5\. volume": "47050"
        },
        "2018-04-09 14:38:00": {
            "1\. open": "92.0300",
            "2\. high": "92.0600",
            "3\. low": "91.9900",
            "4\. close": "91.9950",
            "5\. volume": "46450"
        },
        "2018-04-09 14:37:00": {
            "1\. open": "92.0200",
            "2\. high": "92.0550",
            "3\. low": "92.0100",
            "4\. close": "92.0200",
            "5\. volume": "38935"
        },
        "2018-04-09 14:36:00": {
            "1\. open": "92.1050",
            "2\. high": "92.1150",
            "3\. low": "92.0099",
            "4\. close": "92.0200",
            "5\. volume": "49056"
        },
        "2018-04-09 14:35:00": {
            "1\. open": "92.1200",
            "2\. high": "92.1560",
            "3\. low": "92.1050",
            "4\. close": "92.1050",
            "5\. volume": "45088"
        },
        "2018-04-09 14:34:00": {
            "1\. open": "92.1600",
            "2\. high": "92.1700",
            "3\. low": "92.0800",
            "4\. close": "92.1100",
            "5\. volume": "92195"
        },
        "2018-04-09 14:33:00": {
            "1\. open": "92.1500",
            "2\. high": "92.1850",
            "3\. low": "92.1300",
            "4\. close": "92.1600",
            "5\. volume": "68560"
        },
        "2018-04-09 14:32:00": {
            "1\. open": "92.1600",
            "2\. high": "92.2100",
            "3\. low": "92.1400",
            "4\. close": "92.1550",
            "5\. volume": "88408"
        },
        "2018-04-09 14:31:00": {
            "1\. open": "92.2100",
            "2\. high": "92.2100",
            "3\. low": "92.1200",
            "4\. close": "92.1650",
            "5\. volume": "76528"
        },
        "2018-04-09 14:30:00": {
            "1\. open": "92.1300",
            "2\. high": "92.2350",
            "3\. low": "92.1250",
            "4\. close": "92.2200",
            "5\. volume": "42659"
        },
        "2018-04-09 14:29:00": {
            "1\. open": "92.1600",
            "2\. high": "92.2000",
            "3\. low": "92.1300",
            "4\. close": "92.1300",
            "5\. volume": "47078"
        },
        "2018-04-09 14:28:00": {
            "1\. open": "92.1340",
            "2\. high": "92.1800",
            "3\. low": "92.1200",
            "4\. close": "92.1500",
            "5\. volume": "31218"
        },
        "2018-04-09 14:27:00": {
            "1\. open": "92.1300",
            "2\. high": "92.1550",
            "3\. low": "92.1000",
            "4\. close": "92.1300",
            "5\. volume": "37744"
        },
        "2018-04-09 14:26:00": {
            "1\. open": "92.1640",
            "2\. high": "92.1700",
            "3\. low": "92.1000",
            "4\. close": "92.1300",
            "5\. volume": "39351"
        },
        "2018-04-09 14:25:00": {
            "1\. open": "92.1550",
            "2\. high": "92.1900",
            "3\. low": "92.1300",
            "4\. close": "92.1600",
            "5\. volume": "24607"
        },
        "2018-04-09 14:24:00": {
            "1\. open": "92.1600",
            "2\. high": "92.1600",
            "3\. low": "92.1100",
            "4\. close": "92.1510",
            "5\. volume": "40812"
        },
        "2018-04-09 14:23:00": {
            "1\. open": "92.1800",
            "2\. high": "92.2300",
            "3\. low": "92.1500",
            "4\. close": "92.1700",
            "5\. volume": "35657"
        },
        "2018-04-09 14:22:00": {
            "1\. open": "92.2700",
            "2\. high": "92.2850",
            "3\. low": "92.1500",
            "4\. close": "92.1750",
            "5\. volume": "62838"
        },
        "2018-04-09 14:21:00": {
            "1\. open": "92.4400",
            "2\. high": "92.4500",
            "3\. low": "92.2501",
            "4\. close": "92.2800",
            "5\. volume": "38864"
        }
    }
}

```

#### Qualitative Data

We will also use data from the google news API from: ['https://newsapi.org/s/google-news-api'](https://newsapi.org/s/google-news-api)
This API allows us to get and serach live headlines, articles, images, and other article metadata directly from Google. We can obtain this information from google news or from a variety of other newswebites. We will be particularly interested in those news sites that focus on business and finance, like the wall street journal. The example below is the top headlines form the wall street journal from this API. We will use this information to

```JSON
{

-   "status": "ok",
-   "totalResults": 10,
-   -
    
    "articles": \[
    -   -
        
        {
        -   -
            
            "source": {
            -   "id": "the-wall-street-journal",
            -   "name": "The Wall Street Journal"},
        -   "author": "Erica Orden",
        -   "title": "FBI Raids Trump Lawyer’s Office",
        -   "description": "Federal investigators on Monday searched the office of President Donald Trump’s longtime lawyer, Michael Cohen, seizing communications between the lawyer and his clients that cover topics including payments to the former porn actress known as Stormy Daniels, …",
        -   "url": ["https://www.wsj.com/articles/fbi-raids-trump-lawyers-office-1523306297"](https://www.wsj.com/articles/fbi-raids-trump-lawyers-office-1523306297),
        -   "urlToImage": ["https://images.wsj.net/im-6422/social"](https://images.wsj.net/im-6422/social),
        -   "publishedAt": "2018-04-09T20:38:00Z"},
    -   -
        
        {
        -   -
            
            "source": {
            -   "id": "the-wall-street-journal",
            -   "name": "The Wall Street Journal"},
        -   "author": "Jason Gay",
        -   "title": "Tragedy and a Team",
        -   "description": "A horrific collision in Canada involving a hockey bus shakes a country—and all of sports.",
        -   "url": ["https://www.wsj.com/articles/tragedy-and-a-team-1523302335"](https://www.wsj.com/articles/tragedy-and-a-team-1523302335),
        -   "urlToImage": ["https://images.wsj.net/im-6415/social"](https://images.wsj.net/im-6415/social),
        -   "publishedAt": "2018-04-09T19:32:00Z"},
    -   -
        
        {
        -   -
            
            "source": {
            -   "id": "the-wall-street-journal",
            -   "name": "The Wall Street Journal"},
        -   "author": "Ben Leubsdorf",
        -   "title": "CBO: Fiscal Stimulus Will Widen Budget Deficits, Boost Growth in Coming Years",
        -   "description": "Congress’s nonpartisan scorekeeper is predicting wider budget deficits and somewhat stronger economic growth over the coming years due to recent legislation to cut taxes and boost government spending.",
        -   "url": ["https://www.wsj.com/articles/cbo-fiscal-stimulus-will-widen-budget-deficits-boost-growth-in-coming-years-1523297293"](https://www.wsj.com/articles/cbo-fiscal-stimulus-will-widen-budget-deficits-boost-growth-in-coming-years-1523297293),
        -   "urlToImage": ["https://images.wsj.net/im-6404/social"](https://images.wsj.net/im-6404/social),
        -   "publishedAt": "2018-04-09T18:08:00Z"},
    -   -
        
        {
        -   -
            
            "source": {
            -   "id": "the-wall-street-journal",
            -   "name": "The Wall Street Journal"},
        -   "author": "Brent Kendall",
        -   "title": "Justice Department to Allow Bayer’s Acquisition of Monsanto After Company Concessions",
        -   "description": "The Justice Department has decided to allow Bayer AG’s megadeal to acquire Monsanto Co. after the companies pledged to sell off additional assets to secure government antitrust approval, according to people familiar with the matter.",
        -   "url": ["https://www.wsj.com/articles/justice-department-to-allow-bayers-acquisition-of-monsanto-after-company-concessions-1523297010"](https://www.wsj.com/articles/justice-department-to-allow-bayers-acquisition-of-monsanto-after-company-concessions-1523297010),
        -   "urlToImage": ["https://images.wsj.net/im-6395/social"](https://images.wsj.net/im-6395/social),
        -   "publishedAt": "2018-04-09T18:03:00Z"},
    -   -
        
        {
        -   -
            
            "source": {
            -   "id": "the-wall-street-journal",
            -   "name": "The Wall Street Journal"},
        -   "author": "Dion Nissenbaum",
        -   "title": "Trump Weighs Response to Suspected Syria Chemical Attack",
        -   "description": "President Donald Trump’s top advisers gathered in the White House on Monday to discuss a possible U.S. military strike against Syria in response to a suspected chemical weapons attack that killed dozens of civilians, according to administration officials.",
        -   "url": ["https://www.wsj.com/articles/trump-weighs-response-to-suspected-syria-chemical-attack-1523290566"](https://www.wsj.com/articles/trump-weighs-response-to-suspected-syria-chemical-attack-1523290566),
        -   "urlToImage": ["https://images.wsj.net/im-6382/social"](https://images.wsj.net/im-6382/social),
        -   "publishedAt": "2018-04-09T16:16:00Z"},
    -   -
        
        {
        -   -
            
            "source": {
            -   "id": "the-wall-street-journal",
            -   "name": "The Wall Street Journal"},
        -   "author": "Siobhan Hughes",
        -   "title": "Mark Zuckerberg: Facebook Made Mistakes on ‘Fake News,’ Privacy",
        -   "description": "In testimony to Congress, the Facebook chief is set to say the social-media giant didn’t do enough to prevent its tools from being used for harm.",
        -   "url": ["https://www.wsj.com/articles/mark-zuckerberg-facebook-made-mistakes-on-fake-news-privacy-1523289089"](https://www.wsj.com/articles/mark-zuckerberg-facebook-made-mistakes-on-fake-news-privacy-1523289089),
        -   "urlToImage": ["https://si.wsj.net/public/resources/images/BN-XS086\_0301FA\_SOC_20180301175155.jpg"](https://si.wsj.net/public/resources/images/BN-XS086_0301FA_SOC_20180301175155.jpg),
        -   "publishedAt": "2018-04-09T15:51:00Z"},
    -   -
        
        {
        -   -
            
            "source": {
            -   "id": "the-wall-street-journal",
            -   "name": "The Wall Street Journal"},
        -   "author": "Douglas Belkin",
        -   "title": "One Year of ‘College’ With No Degree, But No Debt And a Job at the End",
        -   "description": "New schools tout themselves as alternatives to college in the digital age, but they lack the traditional benefits of a postsecondary education.",
        -   "url": ["https://www.wsj.com/articles/one-year-of-college-with-no-degree-but-no-debt-and-a-job-at-the-end-1523288219"](https://www.wsj.com/articles/one-year-of-college-with-no-degree-but-no-debt-and-a-job-at-the-end-1523288219),
        -   "urlToImage": ["https://images.wsj.net/im-6238/social"](https://images.wsj.net/im-6238/social),
        -   "publishedAt": "2018-04-09T15:37:00Z"},
    -   -
        
        {
        -   -
            
            "source": {
            -   "id": "the-wall-street-journal",
            -   "name": "The Wall Street Journal"},
        -   "author": "Erich Schwartzel",
        -   "title": "Comfiest Seat in the House: Struggling Movie Theaters Go Upscale to Survive",
        -   "description": "Ticket sales were the worst last year since 1995, prompting a nationwide theater revamp that echoes the multiplex boom. Cinemas today are offering fancy dining, high-tech screens and giant recliners to lure consumers away from Netflix and the couch.",
        -   "url": ["https://www.wsj.com/articles/comfiest-seat-in-the-house-struggling-movie-theaters-go-upscale-to-survive-1523285886"](https://www.wsj.com/articles/comfiest-seat-in-the-house-struggling-movie-theaters-go-upscale-to-survive-1523285886),
        -   "urlToImage": ["https://si.wsj.net/public/resources/images/BN-YB062\_0329th\_SOC_20180329114859.jpg"](https://si.wsj.net/public/resources/images/BN-YB062_0329th_SOC_20180329114859.jpg),
        -   "publishedAt": "2018-04-09T14:58:00Z"},
    -   -
        
        {
        -   -
            
            "source": {
            -   "id": "the-wall-street-journal",
            -   "name": "The Wall Street Journal"},
        -   "author": "Laura Stevens",
        -   "title": "Slammed by Trump, Amazon’s Jeff Bezos Chooses Silence",
        -   "description": "Over the past week, Amazon Chief Executive Jeff Bezos has been cast into the limelight thanks to a string of attacks by President Trump. Mr. Bezos’s response? The silent treatment.",
        -   "url": ["https://www.wsj.com/articles/slammed-by-trump-amazons-jeff-bezos-chooses-the-silent-treatment-1523282400"](https://www.wsj.com/articles/slammed-by-trump-amazons-jeff-bezos-chooses-the-silent-treatment-1523282400),
        -   "urlToImage": ["https://images.wsj.net/im-6218/social"](https://images.wsj.net/im-6218/social),
        -   "publishedAt": "2018-04-09T14:00:00Z"},
    -   -
        
        {
        -   -
            
            "source": {
            -   "id": "the-wall-street-journal",
            -   "name": "The Wall Street Journal"},
        -   "author": "Michael R. Gordon",
        -   "title": "China Installed Military Jamming Equipment on Spratly Islands, U.S. Says",
        -   "description": "Beijing’s installation of equipment capable of jamming communications and radar systems on two of its fortified outposts is a significant step in China’s creeping militarization of the South China Sea, U.S. officials say.",
        -   "url": ["https://www.wsj.com/articles/china-installed-military-jamming-equipment-on-spratly-islands-u-s-says-1523266320"](https://www.wsj.com/articles/china-installed-military-jamming-equipment-on-spratly-islands-u-s-says-1523266320),
        -   "urlToImage": ["https://si.wsj.net/public/resources/images/BN-YD846\_USCHIN\_SOC_20180408220335.jpg"](https://si.wsj.net/public/resources/images/BN-YD846_USCHIN_SOC_20180408220335.jpg),
        -   "publishedAt": "2018-04-09T09:32:00Z"}\]

}
```


## Site Mockup
![](https://i.imgur.com/yWqKhHq.jpg)
![](https://i.imgur.com/zN3Lns3.jpg)
![](https://i.imgur.com/Le8q6DH.jpg)
![](https://i.imgur.com/wYkQdYT.jpg)
![](https://i.imgur.com/I0fIdC1.jpg)
![](https://i.imgur.com/MydNI1S.jpg)

