<template>
<div v-if="!hidden" id="app">
     <header>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <authentication class="nav navbar-nav navbar-right"
                    :getUser="getUser"
                    :setUser="setUser">
                </authentication>
            </div>
        </nav>
        <hr>
    </header>
    <main>
        <section class="container">
            <!--MENUBAR-->
            <div class="menuBar" v-cloak>
                <div class="menuButtons">
                    <label> Choose a Category</label>
                    <select v-model="catToAdd">
                        <option disabled value =""> Please select one</option>
                        <option> Large Cap</option>
                        <option> Tech</option>
                        <option> Crypto</option>
                        <option> By Sector</option>
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
            <div class="main" v-cloak >
                <div class="competitionsBackground">
                    <ul class="compsList">
                        <li v-for="comp in competitions">
                            <div class="compView">
                                <!--this text comes from the todo item's text-->

                                <h2 class="compTitle">{{ comp.title }}</h2>

                                <p>Leader: {{ comp.leader }}</p>

                                <p>Created: {{ comp.created | formatDate}}</p>

                                <P>Expires: {{ comp.deadline | formatDate}}</P>

                                <div class="userButtons">
                                    <button @click="viewComp(comp)">View
                                    </button>
                                </div>
                                <div class="adminButtons">
                                    <button @click="deleteComp(comp)">Delete</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--MODALS-->
            <div v-for="comp in competitions" v-if="comp.viewModal">
                <div class="modal">
                    <h2 class="modalTitle">{{ comp.title}}</h2>
                    <span class="closeModal" @click="closeModal(comp)">&times;</span>
                    <div class="modalBox">
                        <h3> Available Stocks</h3>
                        <ul class="availStocks">
                            <li v-for="ticker in comp.availStocks">{{ticker}}</li>
                        </ul>
                    </div>
                    <div class="modalBox">

                        <h3> Leader Board</h3>
                        <ul>
                            <li v-for="user in comp.users"> {{user.username}}  {{user.currentValue | formatCurr}}  {{((user.currentValue - 1000000)/1000000)*100 | formatPer}}</li>
                        </ul>
                        <button @click="getPortVal(comp)">Update values</button>
                    </div>
                    <button @click="joinComp(comp)">Join</button>
                </div>
                <div class="modal" v-if="userJoining">
                    <div class="joinContainer">
                        <p> JOIN SCREEN TEMP</p>
                        <h3> Available Stocks</h3>
                        <ul class="availStocks">
                            <li v-for="(ticker,index) in comp.availStocks">{{ticker}}<input v-model="selectedStocks[index]" placeholder="add % up to 100"></li>
                        </ul>
                        <button @click="submitPicks(comp)"> Select Stocks</button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</div>
<div v-else id="userProfile">
  <Profile :currentUser="this.user"></Profile>
</div>
</template>

<script>
import { storageRef, compsRef, choicesRef} from './database'
import Authentication from './components/Authentication'
import Profile from './Profile'
//import AddImageForm from './components/AddImageForm'
//import VueImages from 'vue-images'

//cache latest version for synchronist calls
var latestStocksSnapshot = null;
var techStocks = [];
var largeCapStocks = [];
var cryptoStocks = [];
var bySectorStocks = [];
choicesRef.on('value', function(snap) {
    latestStocksSnapshot = snap;
    snap.forEach(function(child) {
        child.forEach(function(childchild){            
            if(child.key === 'tech'){
                techStocks.push(childchild.val());
            } else if(child.key === 'largeCap'){
                largeCapStocks.push(childchild.val());
            } else if (child.key === 'crypto'){
                cryptoStocks.push(childchild.val());
            } else if (child.key === 'bySector'){
                bySectorStocks.push(childchild.val());
            }
        });
    });
});
var compKeys = [];

    

export default {
    name: 'App',
    data () {
        return {
            user: null,
            catToAdd: null,
            timeToAdd: null,
            isShown: false,
            currentUid: null,
            userJoining: false,
            selectedStocks: [0,0,0,0,0,0,0,0,0,0],
            hidden: false,
            priceMap: {}
        }
    },
    firebase: {
        competitions: compsRef,
        choices: choicesRef
    },
    components: {
        Authentication,
        Profile
    },
    filters:{
        formatDate(value){
            if (value) {
                return new Date(value).toDateString();
            }
        },
        formatCurr(value){
            if (value){
                return "$" + value.toFixed(2).toLocaleString();
            }
        },
        formatPer(value){
            if (value){
                return value.toFixed(2).toLocaleString() + "%";
            }
        },
//        getLeader(value){
//            if (value){
//                var max = 0;
//                var maxUser = null;
//                for(var user in value){
//                    if(value[user].currentValue > max){
//                        maxUser = value[user].username;
//                    }
//                }
//                return maxUser;
//            }
//        }
//        
    },
    mounted (){
        console.log("mounted");
        this.closeCompetitions();
    },
    methods: {
        
        //close all of the competitions that have expired
        closeCompetitions(){
            for(var i in this.competitions){
                if(this.competitions[i]["deadline"] <= new Date().getTime()){
                    var myKey = this.competitions[i]['.key']; 
                    compsRef.child(myKey).update({isComplete: true});
                }
            }  
        },
        
        //gets the data from a url
        getAllPrices(comp){
            console.log("getAllPrices");
            var allStocks = techStocks.toString() +","+ largeCapStocks.toString() ;//+ cryptoStocks;
            var key = "LSL4TQ54M83DX4NV";
            var url = "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols="+allStocks+"&apikey="+key;

            fetch(url).then(response => response.json())
                      .then(data => {
                            if(data){
                                var newPriceMap = {};
                                for(var j = 0; j < data["Stock Quotes"].length; j++){
                                    var symbol = data["Stock Quotes"][j]["1. symbol"];
                                    var price = data["Stock Quotes"][j]["2. price"];
                                    newPriceMap[symbol] = parseFloat(price);
                                    if(j === data["Stock Quotes"].length - 1){
                                        this.getPortVal(comp,newPriceMap);
                                    }
                                }
                            }
                       })
                      .catch(error => console.log(error));           
        },

        //Buys the correct number of shares for a user joining a competition at the current market prices
        getStockData (url, comp,ticker, percent){
            var initVal = 1000000.0;
            fetch(url).then(response => response.json())
                      .then(data => {
                            if(data){
                                var u = compsRef.child(comp['.key']).child("users").child(this.user.uid);
                                var lastTime = data["Meta Data"]["3. Last Refreshed"];
                                lastTime = lastTime.slice(0, -2) + "00";
                                var price = parseFloat(data["Time Series (1min)"][lastTime]["4. close"]);
                                var shares = (initVal * (percent / 100.0) ) / price;
                                u.child("shares").child(ticker).set(ticker +" "+ shares);
                            }
                       })
                      .catch(error => console.log(error));
        },

        //calculates the user's current porfolio value.
        getPortVal(comp, pMap){  
            console.log("getPortVal");
            var maxVal = 0;
            for(var i in comp.users){
                var currentVal = 0;
                var userID = comp.users[i].userid;
                for(var j in comp.users[i].shares){
                    var ticker = comp.users[i].shares[j];
                    var shares = ticker.split(" ")[1];
                    ticker = ticker.split(" ")[0];
                    //for debugging purposes
//                    console.log("ticker: " + ticker);
//                    console.log("shares: " + shares);
//                    console.log(parseFloat(shares));
//                    console.log(pMap[ticker]);
                    currentVal += parseFloat(shares) * pMap[ticker];               
                }
                if(currentVal > maxVal){
                    maxVal = currentVal;
                    compsRef.child(comp['.key']).update({leader: comp.users[i].username});
                }
                console.log(currentVal); compsRef.child(comp['.key']).child("users").child(userID).child("currentValue").set(currentVal);
            }
        },

        // allow child component to change user value
        getUser () {
            return this.user
        },
        
        setUser (user) {
            this.user = user
        },
        
        //Helper method to add the available stocks to the comp
        addStocksToComp(){
            var stocksList = [];
            if(this.catToAdd === 'Tech'){
                return techStocks;
            } else if(this.catToAdd === 'Large Cap'){
                return largeCapStocks;
            } else if(this.catToAdd === 'Crypto'){
                return cryptoStocks;
            } else if (this.catToAdd === 'By Sector'){
                return bySectorStocks;
            }
            return [];
        },

        //Helper function used to set deadline
        addTime() {
            var dayVal = 1000 * 60 * 60 * 24;
            if(this.timeToAdd === "One Day"){
                return dayVal;
            } else if (this.timeToAdd === "One Week"){
                return dayVal * 7;
            } else if(this.timeToAdd === "Two Weeks"){
                return dayVal * 14;
            } else {
                return dayVal * 31;
            }
        },

        // Adds a competition to the website
        addComp() {
            //TODO: only admins & logged in users can do this function
            console.log("adding competition");
            if(this.catToAdd !== null && this.dateToAdd !== null){
                var currDate = new Date().getTime();
                var computedDeadline = currDate + this.addTime();
                var stockArray = this.addStocksToComp();
                compsRef.push({
                    isCompleted: false,
                    title: this.catToAdd,
                    leader: "Not Started",
                    created: currDate,
                    deadline: computedDeadline,
                    availStocks: stockArray
                }).then((data, err)=> { if (err) {console.log(err)}});
                
                //reset options to allow user a blank slate for next competition
                this.catToAdd = null;
                this.dateToAdd = null;
            }
        },

        // Allows admin to delete a competition
        deleteComp(comp){
            compsRef.child(comp['.key']).remove();
        },

        // allows user to view an ongoing competition
        viewComp(comp) {
            console.log("viewing a competition");
            //compsRef.child(comp['.key']).update({viewModal: true});
            for(var i in this.competitions){
                if(this.competitions[i]['.key'] === comp['.key']){
                    this.competitions[i].viewModal = true;
                    console.log("2: " + this.competitions[i].viewModal);
                    break;
                }
            }
            this.getAllPrices(comp);
            console.log("3: " +  this.competitions[i].viewModal);
        },

        //closes teh modal view
        closeModal(comp) {
            //compsRef.child(comp['.key']).update({viewModal: false});
            for(var i in this.competitions){
                if(this.competitions[i]['.key'] === comp['.key']){
                    this.competitions[i].viewModal = false;
                    break;
                }
            }
        },

        //allows user to join a competition
        joinComp(comp){
            if(this.user){
                var userAlreadyJoined = false;
                for(var i in comp.users){
                    if(comp.users[i].userid === this.user.uid){
                        userAlreadyJoined = true;
                        alert("You have already joined this competition");
                    }
                }
                if(!userAlreadyJoined){
                    console.log("user is joining competition")
                    this.userJoining = true;
                }
            } else {
                alert("You must be logged in to join");
            }
        },
        
        //submits the stocks the user wants to enter in the competition
        submitPicks(comp){
            var sum = 0;
            for(var i = 0; i <this.selectedStocks.length; i++){
                if(this.selectedStocks[i] !== null){
                    sum += parseFloat(this.selectedStocks[i]);
                }
            }
            var map = {};
            if(sum === 100.0){
                //close the joining modal
                this.userJoining = false;

                for(var j = 0; j <this.selectedStocks.length; j++){
                    map[comp.availStocks[j]] = parseFloat(this.selectedStocks[j]);
                }
                var userObject = {username: this.user.name,
                                    userid: this.user.uid,
                                    useremail: this.user.email,
                                    currentValue: 1000000,
                                    stocksMap: map
                                };
                //compsRef.child(comp['.key']).child("users").push(userObject);
                compsRef.child(comp['.key']).child("users").child(this.user.uid).set(userObject);

                for(var j = 0; j <this.selectedStocks.length; j++){
                    if(parseFloat(this.selectedStocks[j]) !== 0){
                        this.calcShares(comp.availStocks[j], parseFloat(this.selectedStocks[j]),
                                       comp,
                                        userObject
                                       );
                    }
                }
                //reset selected stocks ammounts
                this.selectedStocks = [0,0,0,0,0,0,0,0,0,0];

            } else {
                alert("Make sure selections add up to 100%");
            }
        },
        
        //calculate how many shares of a stock that a user can buy at the current price
        calcShares(ticker, percent,comp,userObject){
            var key = "LSL4TQ54M83DX4NV";
            var requestURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + ticker + "&interval=1min&apikey=" + key;
            var responseJSON = this.getStockData(requestURL,comp,ticker,percent);
        }
    }
}
</script>

<style scoped>
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
</style>
