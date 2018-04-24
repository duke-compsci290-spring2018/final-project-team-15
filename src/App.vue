<template>
<div id="app">
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
                </div>
            </div>
        </section>
    </main>
</div>
</template>

<script>
import { storageRef, compsRef, choicesRef} from './database'
import Authentication from './components/Authentication'
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
            //console.log(childchild.key+": "+childchild.val());              
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
    
export default {
    name: 'App',
    data () {
        return {
            user: null,
            catToAdd: null,
            timeToAdd: null,
            isShown: false,
            currentUid: null
        }
    },
    firebase: {
        competitions: compsRef,
        choices: choicesRef
    },
    components: {
        Authentication
    },
    filters:{
        formatDate(value){
            if (value) {
                return new Date(value).toDateString();
            }
        }
    },
    methods: {
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
                    viewModal: false,
                    availStocks: stockArray
                }).then((data, err)=> { if (err) {console.log(err)}});
                
                
                this.catToAdd = null;
            }
        },
            
        // Allows admin to delete a competition
        deleteComp(comp){
            compsRef.child(comp['.key']).remove();
        },
                
        // allows user to view an ongoing competition
        viewComp(comp) {
            console.log("viewing competition");
            compsRef.child(comp['.key']).update({viewModal: true});
        },
        
        closeModal(comp) {
            compsRef.child(comp['.key']).update({viewModal: false});
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
