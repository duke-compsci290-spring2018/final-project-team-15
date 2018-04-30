<template>
<div v-if="!hidden" id="app" v-bind:style="projectStyle">
  <header>
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <authentication class="nav navbar-nav navbar-right" :getUser="getUser" :setUser="setUser">
        </authentication>
        <div class="nav navbar-nav navbar-left" id="project-styling">
          <h4> Customize your Experience </h4>

          <input type="color" id="bg-select" value="#00ccff" v-on:change="updateBackground($event)" />
          <label type="text" for="bg-select">Customize background color</label>

          <input type="color" id="text-select" value="#000000" v-on:change="updateText($event)" />
          <label type="text" for="text-select">Customize text color</label>
        </div>
      </div>
    </nav>
    <hr>
  </header>
  <FAQ></FAQ>
  <main>
    <div id="filter-bar">
      <!--button @click="testfn">Click me</button-->
      <p>Select from the below categories to filter by the associated competition type:
        <p>
          <div class="toFilter">
            <!--div class="color-box" :style="{ 'background-color': category[1] }"></div-->
            <input type="checkbox" id="largeCapFilter" value="Large Cap" v-model="filtered">
            <label for="largeCapFilter">Large Cap</label>

            <input type="checkbox" id="techFilter" value="Tech" v-model="filtered">
            <label for="techFilter">Tech</label>

            <input type="checkbox" id="finFilter" value="Financials" v-model="filtered">
            <label for="finFilter">Financials</label>

            <input type="checkbox" id="consFilter" value="Consumer Discretionary" v-model="filtered">
            <label for="consFilter">Consumer Discretionary</label>
          </div>
    </div>
    <section class="container">
      <!--MENUBAR-->
      <div class="menuBar" v-cloak>
        <div class="menuButtons">
          <button @click="viewLeaders()">View Leader Board</button>
          <label> Choose a Category</label>
          <select v-model="catToAdd">
                        <option disabled value =""> Please select one</option>
                        <option> Large Cap</option>
                        <option> Tech</option>
                        <option> Financials</option>
                        <option> Consumer Discretionary</option>
                    </select>

          <label> Choose a Timeframe</label>
          <select v-model="timeToAdd">
                        <option disabled value =""> Please select one</option>
                        <option> One Day</option>
                        <option> One Week</option>
                        <option> Two Weeks</option>
                        <option> One Month</option>
                    </select>
          <button v-on:click="addComp">Add competition</button>

        </div>
      </div>
      <!--MAIN SCREEN-->
      <div class="main" v-cloak>
        <div class="competitionsBackground">
          <ul class="compsList">
            <li v-for="comp in reverseComps" v-if="filtered.indexOf(comp.title)!=-1">
              <div class="compView">
                <!--this text comes from the todo item's text-->

                <h2 class="compTitle">{{ comp.title }}</h2>

                <p v-if="!(comp.isComplete)">Leader: {{ comp.leader }}</p>
                <p v-if="(comp.isComplete)">Winner: {{ comp.leader }}</p>

                <p>Created: {{ comp.created | formatDate}}</p>

                <P v-if="!(comp.isComplete)">Expires: {{ comp.deadline | formatDate}}</P>
                <P v-if="(comp.isComplete)">Expired: {{ comp.deadline | formatDate}}</P>
                <div class="userButtons">
                  <button @click="viewComp(comp)">View
                                    </button>
                </div>
                <div v-if="isAdmin" class="adminButtons">
                  <button @click="deleteComp(comp)">Delete</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--MODALS-->
      <div class="modal" v-if="viewLeaderBool">
        <h3>Most Comps Won</h3>
        <ol class="leaderList">
          <li v-for="leader in sortedLeaders">{{leader.name}}: {{leader.num}}</li>
        </ol>
        <button @click="exitLeaders()">Go Back</button>
      </div>
      <div v-for="comp in competitions" v-if=" comp['.key'] === viewKey">
        <div class="modal">
          <h2 class="modalTitle">{{ comp.title}}</h2>
          <span class="closeModal exit" @click="closeModal(comp)">&times;</span>
          <div class="modalBox">
            <h3> Available Stocks</h3>
            <ul class="availStocks">
              <li v-for="ticker in comp.availStocks">{{ticker}}</li>
            </ul>
          </div>
          <div class="modalBox">

            <h3> Leader Board</h3>
            <ul>
              <li v-for="leaderboardUser in comp.users">
                <div class="clickable" @click="viewOtherProfile(leaderboardUser)">{{leaderboardUser.username}}</div> {{leaderboardUser.currentValue | formatCurr}} {{((leaderboardUser.currentValue - 1000000)/1000000)*100 | formatPer}}</li>
            </ul>
            <button @click="updateAllComps()" v-if="!(comp.isComplete)">Refresh</button>
          </div>
          <button @click="joinComp(comp)" v-if="!(comp.isComplete)">Join</button>
        </div>
        <div class="modal" v-if="userJoining">
          <div class="joinContainer">
            <h3> Available Stocks</h3>
            <p>Every user starts out with $1,000,000 dollars. It's up to you to decide the best allocation. For each stock you wish to purchase below, enter the percent of your profile you wish to allocate towards it. </p>
            <ul class="availStocks">
              <li v-for="(ticker,index) in comp.availStocks">{{ticker}}
                <button @click="googleSearch(ticker)">Get Info</button>
                <input v-model="selectedStocks[index]" placeholder="add % up to 100">
              </li>
            </ul>
            <button @click="submitPicks(comp)"> Select Stocks</button>
            <button @click="cancelJoin(comp)">Go Back</button>
          </div>
        </div>
      </div>
    </section>
  </main>
  <div id="business-news">
    <h3>Top Business News Articles</h3>
    <ul class="articles">
      <li class="newsLink" v-for="headline in newsHeadlines"><a :href="headline.url" target="_blank">{{ headline.title }}</a></li>
    </ul>
    <span>News powered by <a href="https://newsapi.org/">NewsAPI.org</a></span>
  </div>
</div>
<div v-else id="userProfile" v-bind:style="projectStyle">
  <Profile :currentUser="userProfileToView" :isLoggedIn="sameUser"></Profile>
</div>
</template>

<script>
import {
  storageRef,
  compsRef,
  choicesRef,
  winsRef,
  adminsRef,
  leaderRef
} from './database'
import Authentication from './components/Authentication'
import FAQ from './components/FAQ'
import Profile from './Profile'
const NewsAPI = require('newsapi');
export const newsapi = new NewsAPI("ffd0c03639294db3a9cc46b7d03a0fd3");

//cache latest version for synchronist calls
var latestStocksSnapshot = null;
var techStocks = [];
var largeCapStocks = [];
var finStocks = [];
var consStocks = [];
choicesRef.on('value', function(snap) {
  latestStocksSnapshot = snap;
  snap.forEach(function(child) {
    child.forEach(function(childchild) {
      if (child.key === 'tech') {
        techStocks.push(childchild.val());
      } else if (child.key === 'largeCap') {
        largeCapStocks.push(childchild.val());
      } else if (child.key === 'Financials') {
        finStocks.push(childchild.val());
      } else if (child.key === 'Consumer Discretionary') {
        consStocks.push(childchild.val());
      }
    });
  });
});
var compKeys = [];


export default {
  name: 'App',
  data() {
    return {
      user: null,
      catToAdd: null,
      timeToAdd: null,
      isShown: false,
      currentUid: null,
      userJoining: false,
      selectedStocks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hidden: false,
      priceMap: {},
      viewKey: null,
      filtered: ["Large Cap", "Tech", "Financials", "Consumer Discretionary"],
      newsHeadlines: [],
      projectStyle: {
        backgroundColor: '#00ccff',
        color: '#000000',
      },
      localPrices: {},
      userProfileToView: null,
      sameUser: false,
      isAdmin: false,
      viewLeaderBool: false,
      unSortedLeaders: []
    }
  },
  firebase: {
    competitions: {
      source: compsRef,
      readyCallback: function() {
        this.updateAllComps();
      }
    },
    admins: {
      source: adminsRef,
      readyCallback: function() {
        this.checkAdmin();
      }
    },
    choices: choicesRef,
    wins:  {
      source: winsRef,
      readyCallback: function() {
        this.updateLeaderBoard();
      }
    },
    leaders: {
      source: leaderRef,
      readyCallback: function() {
        this.sortLeaders();
      }
    }
  },
  components: {
    Authentication,
    Profile,
    FAQ
  },
  filters: {
    formatDate(value) {
      if (value) {
        return new Date(value).toDateString();
      }
    },
    formatCurr(value) {
      if (value) {
        return "$" + value.toFixed(2).toLocaleString();
      }
    },
    formatPer(value) {
      if (value) {
        return value.toFixed(2).toLocaleString() + "%";
      }
    },
  },
  computed: {
    reverseComps() {
      return this.competitions.slice().reverse();
    },
    // https://stackoverflow.com/questions/42883835/sort-an-array-in-vue-js
    sortedLeaders: function() {
      function compare(a, b) {
        if (a.num < b.num)
          return 1;
        if (a.num > b.num)
          return -1;
        return 0;
      }
      return this.unSortedLeaders.sort(compare);
    }
  },
  mounted() {
    console.log("mounted");
    this.getNewsData();
  },
  methods: {

    sortLeaders(){
      console.log("Sorting leaders");
      for(var i in this.leaders){
        this.unSortedLeaders.push({
          name: this.leaders[i]["displayName"],
          num: this.leaders[i]["compsWon"]
        });
      }
      console.log(this.unSortedLeaders);
    },

    exitLeaders(){
      this.viewLeaderBool = false;
    },

    viewLeaders(){
      this.viewLeaderBool = true;
    },

    updateLeaderBoard(){
      console.log("updating leaderbaord");
      console.log(this.wins);

      for(var i in this.wins){
        var userID = this.wins[i]['.key'];
        var numWon = 0;
        for(var compWon in this.wins[i]["compsWon"]){
          numWon++;
        }
        var displayName = this.wins[i]["displayName"];
        leaderRef.child(userID).child("compsWon").set(numWon);
        leaderRef.child(userID).child("displayName").set(displayName);
      }
    },

    checkAdmin() {
      //console.log(this.admins);
      for (var admin in this.admins) {
        //onsole.log("admin is ", this.admins[admin]['.value']);
        if (this.admins[admin]['.value'] === this.user.uid) {
          this.isAdmin = true;
        }
      }
    },

    viewOtherProfile(user) {
      this.hidden = true;
      this.userProfileToView = user;
      if (user.userid === this.user.uid) {
        this.sameUser = true;
        this.userProfileToView = this.user;
      }
      console.log(this.userProfileToView);
    },

    // launches google search so user can find info
    googleSearch(ticker) {
      window.open('http://google.com/search?q=' + ticker + " Stock Price");
    },


    /// updates all comps
    updateAllComps() {
      console.log("update all comps");
      for (var i in this.competitions) {
        var compKey = this.competitions[i]['.key'];
        this.getAllPrices(this.competitions[i]);
        var maxVal = 0.0;
        for (var j in this.competitions[i]["users"]) {
          var currUser = this.competitions[i]["users"][j]["userid"];
          var currUserName = this.competitions[i]["users"][j]["username"];
          var newVal = 0.0;
          //for each "ticker numShares" of a user
          for (var k in this.competitions[i]["users"][j]["shares"]) {
            var shares = parseFloat((this.competitions[i]["users"][j]["shares"][k]).split(" ")[1]);
            var ticker = (this.competitions[i]["users"][j]["shares"][k]).split(" ")[0];
            var lastPrice = parseFloat(this.competitions[i]["newestPrices"][ticker]);
            newVal += shares * lastPrice;
          }
          console.log("compKey: " + compKey);
          console.log("newVal: " + newVal);
          compsRef.child(compKey).child("users").child(currUser).update({
            currentValue: newVal
          });
          if (newVal > maxVal) {
            maxVal = newVal;
            compsRef.child(compKey).update({
              leader: currUserName
            });
            compsRef.child(compKey).update({
              leaderID: currUser
            });
          }
        }
      }
      this.closeCompetitions();
    },

    // close all of the competitions that have expired
    testfn() {
      console.log(this.filtered);
      console.log(this.competitions);
    },

    getNewsData() {
      newsapi.v2.topHeadlines({
        category: 'business',
        language: 'en',
        country: 'us'
      }).then(response => {
        console.log(response.articles);
        this.newsHeadlines = response.articles;
      });
    },

    closeCompetitions() {
      console.log("closing competitions");
      compsRef.once('value')
        .then(function(snapshot) {
          snapshot.forEach(function(child) {
            if (child.child("deadline").val() <= new Date().getTime() /*&& child.child("isComplete") === false*/ ) {
              console.log("COMPEITION EXPIRED");
              compsRef.child(child.key).update({
                isComplete: true
              });
              // add the compKey as the key under cmpsWon, add the comps deadline as the value
              winsRef.child(child.child("leaderID").val()).child("compsWon").child(child.key).set(child.child("deadline").val());
              winsRef.child(child.child("leaderID").val()).child("displayName").set(child.child("leader").val());
            }
          })

        })
    },

    //gets the data from a url
    getAllPrices(comp) {
      console.log("getAllPrices");
      var allStocks = techStocks.toString() + "," + largeCapStocks.toString() + "," + finStocks.toString() + "," + consStocks.toString();
      var key = "LSL4TQ54M83DX4NV";
      var url = "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=" + allStocks + "&apikey=" + key;

      fetch(url).then(response => response.json())
        .then(data => {
          if (data) {
            var newPriceMap = {};
            for (var j = 0; j < data["Stock Quotes"].length; j++) {
              var symbol = data["Stock Quotes"][j]["1. symbol"];
              var price = data["Stock Quotes"][j]["2. price"];
              newPriceMap[symbol] = parseFloat(price);
              if (j === data["Stock Quotes"].length - 1) {
                compsRef.child(comp['.key']).child("newestPrices").set(newPriceMap);
              }
            }
          }
        })
        .catch(error => console.log(error));
    },

    //Buys the correct number of shares for a user joining a competition at the current market prices
    getStockData(url, comp, ticker, percent) {
      var initVal = 1000000.0;
      fetch(url).then(response => response.json())
        .then(data => {
          var u = compsRef.child(comp['.key']).child("users").child(this.user.uid);
          console.log(data);
          var lastTime = data["Meta Data"]["3. Last Refreshed"];
          lastTime = lastTime.slice(0, -2) + "00";
          var price = parseFloat(data["Time Series (1min)"][lastTime]["4. close"]);
          var shares = (initVal * (percent / 100.0)) / price;
          u.child("shares").child(ticker).set(ticker + " " + shares);
        })
        .catch(error => {
          console.log(error);
          alert("Your purchase for " + ticker + " was not completed, please try again or buy a different stock");
          compsRef.child(comp['.key']).child("users").child(this.user.uid).remove();
        });
    },

    // allow child component to change user value
    getUser() {
      return this.user
    },

    setUser(user) {
      this.user = user
    },

    //Helper method to add the available stocks to the comp
    addStocksToComp() {
      var stocksList = [];
      if (this.catToAdd === 'Tech') {
        return techStocks;
      } else if (this.catToAdd === 'Large Cap') {
        return largeCapStocks;
      } else if (this.catToAdd === 'Financials') {
        return finStocks;
      } else if (this.catToAdd === 'Consumer Discretionary') {
        return consStocks;
      }
      return [];
    },

    //Helper function used to set deadline
    addTime() {
      var dayVal = 1000 * 60 * 60 * 24;
      if (this.timeToAdd === "One Day") {
        return dayVal;
      } else if (this.timeToAdd === "One Week") {
        return dayVal * 7;
      } else if (this.timeToAdd === "Two Weeks") {
        return dayVal * 14;
      } else {
        return dayVal * 31;
      }
    },

    // Adds a competition to the website
    addComp() {
      if (this.user === null) {
        alert("You must sign in to perform this action.")
        return;
      }
      console.log("adding competition");
      if (this.catToAdd !== null && this.timeToAdd !== null) {
        var currDate = new Date().getTime();
        var computedDeadline = currDate + this.addTime();
        var stockArray = this.addStocksToComp();
        compsRef.push({
          isComplete: false,
          title: this.catToAdd,
          leader: "No Users Joined",
          leaderID: "N/A",
          created: currDate,
          deadline: computedDeadline,
          availStocks: stockArray
          //isFilteredOut: false
        }).then((data, err) => {
          if (err) {
            console.log(err)
          }
        });
        //reset options to allow user a blank slate for next competition
        this.catToAdd = null;
        this.timeToAdd = null;
        this.updateAllComps();
      }
    },

    // Allows admin to delete a competition
    deleteComp(comp) {
      compsRef.child(comp['.key']).remove();
    },

    // allows user to view an ongoing competition
    viewComp(comp) {
      for (var i in this.competitions) {
        if (this.competitions[i]['.key'] === comp['.key']) {
          this.viewKey = comp['.key'];
          break;
        }
      }
      this.updateAllComps();
    },

    //closes teh modal view
    closeModal(comp) {
      this.viewKey = null;
    },

    //allows user to join a competition
    joinComp(comp) {
      if (this.user) {
        var userAlreadyJoined = false;
        for (var i in comp.users) {
          if (comp.users[i].userid === this.user.uid) {
            userAlreadyJoined = true;
            alert("You have already joined this competition");
          }
        }
        if (!userAlreadyJoined) {
          console.log("user is joining competition")
          this.userJoining = true;
        }
      } else {
        alert("You must be logged in to join");
      }
    },

    //cancels a user userJoining
    cancelJoin(comp) {
      this.userJoining = false;
    },

    //submits the stocks the user wants to enter in the competition
    submitPicks(comp) {
      var sum = 0;
      for (var i = 0; i < this.selectedStocks.length; i++) {
        if (this.selectedStocks[i] !== null) {
          sum += parseFloat(this.selectedStocks[i]);
        }
      }
      var map = {};
      if (sum === 100.0) {


        for (var j = 0; j < this.selectedStocks.length; j++) {
          map[comp.availStocks[j]] = parseFloat(this.selectedStocks[j]);
        }
        var userObject = {
          username: this.user.name,
          userid: this.user.uid,
          useremail: this.user.email,
          currentValue: 1000000,
          stocksMap: map
        };
        //compsRef.child(comp['.key']).child("users").push(userObject);
        compsRef.child(comp['.key']).child("users").child(this.user.uid).set(userObject);

        for (var j = 0; j < this.selectedStocks.length; j++) {
          if (parseFloat(this.selectedStocks[j]) !== 0) {
            this.calcShares(comp.availStocks[j], parseFloat(this.selectedStocks[j]),
              comp,
              userObject
            );
          }
        }
        this.onSuccessfulJoin();

      } else {
        alert("Make sure selections add up to 100%");
      }
    },

    onSuccessfulJoin() {
      //close the joining modal
      this.userJoining = false;
      //reset selected stocks ammounts
      this.selectedStocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.updateAllComps();
    },

    //calculate how many shares of a stock that a user can buy at the current price
    calcShares(ticker, percent, comp, userObject) {
      var key = "LSL4TQ54M83DX4NV";
      var requestURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + ticker + "&interval=1min&apikey=" + key;
      //var requestURL = "https://marketdata.websol.barchart.com/getQuote.jsonp?apikey=9fbc4b4699da90edd8f7a0f35e9ee971&symbols="+ticker;
      var responseJSON = this.getStockData(requestURL, comp, ticker, percent);

    },

    updateBackground(event) {
      //console.log(event.target.value);
      var bg = event.target.value;

      console.log(bg);

      //set background color
      this.projectStyle.backgroundColor = bg;
    },

    updateText(event) {
      this.projectStyle.color = event.target.value + " !important";
    }
  }
}
</script>

<style>
.clickable {
  text-decoration: underline;
  color: blue;
}

.exit,
.clickable:hover {
  cursor: pointer;
}

.closeModal {
  font-size: 300%;
}

ul {
  list-style-type: none;
}

.newsLink {
  padding: 10px;
  font-weight: bold;
  font-size: 150%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h2 {
  color: firebrick;
  text-align: center;
}

section {
  margin-top: 40px;
}

.toFilter {
  display: inline-block;
}
</style>
