// Initialize Firebase


var config = {
  apiKey: "AIzaSyB449TZG4sds9XuDoIalxUtNGwWkyRG0GM",
  authDomain: "cs-290-final.firebaseapp.com",
  databaseURL: "https://cs-290-final.firebaseio.com",
  projectId: "cs-290-final",
  storageBucket: "cs-290-final.appspot.com",
  messagingSenderId: "1013644465157"
};

  firebase.initializeApp(config);

  var db = firebase.database();

  var usersRef = db.ref('users');
  var storageRef = firebase.storage().ref();


  // connect Firebase to Vue
  Vue.use(VueFire);

var app = new Vue({
  data: {
    newCreateAccount: false,
    newSignIn: false,
    newName: '',
    newEmail: '',
    loginInfo: '',
    loggedIn: false,
    currentUser: '',
    users: []
  },

  firebase: {
    users: usersRef
  },

  methods: {
    createAccount() {
      var userImage = document.getElementById('files');

      if (this.newName && this.newEmail && userImage.files.length>0) {
          // get reference to a storage location and
          var file = userImage.files[0];
          var imageURL;
          var nameToAdd = this.newName;
          var emailToAdd = this.newEmail;

          storageRef.child('images/' + file.name).put(file).then(function(snapshot) {
            imageURL = snapshot.downloadURL;
            usersRef.push({
              "name": nameToAdd,
              "email": emailToAdd,
              "image": imageURL
            });
            }
          );
          // reset input values so user knows to input new data
          userImage.value = '';

          console.log(imageURL);


        this.resetUser();
      }
      console.log(this.users);
    },

    signIn() {
      console.log(this.users);
      console.log("here", this.loginInfo, this.users.length);
      if (this.users.length>0 && this.loginInfo) {
        console.log("now here",this.loginInfo);
        for (var userKey in this.users) {
          var user = this.users[userKey];
          if (user.name==this.loginInfo || user.email==this.loginInfo) {
            this.loggedIn = true;
            this.currentUser = user;
            break;
          }
        }
      }

      console.log(this.loggedIn, this.currentUser);

      this.resetUser();

    },

    resetUser() {
      this.newName = '';
      this.newEmail = '';
      this.loginInfo = '';
      this.newCreateAccount = false;
      this.newSignIn = false;
    }
  },

  mounted() {
    console.log('here');
    console.log(this.newCreateAccount);
    console.log(this.newSignIn);
  },

});

// attach Vue app to an existing DOM element
app.$mount('#app');
