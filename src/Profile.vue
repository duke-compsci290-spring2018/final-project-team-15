<template>
<div id="profile">

  <button @click="backToMainView">Back to Competitions</button>
  <div id="userInfo">
    <h4 v-if="isLoggedIn">{{currentUser.name}}</h4>
    <h4 v-else>{{currentUser.username}}</h4>
    <h4 v-if="isLoggedIn">{{currentUser.email}}</h4>
    <h4 v-else><a :href="'mailto:' + currentUser.useremail + emailContent">{{currentUser.useremail}}</a></h4>
  </div>

  <div id="image">
    <img :src="userImageSource" alt="Empty Avatar">
    <div v-if="isLoggedIn" id="modifyImage">
      <label for="files"><b>Upload an Image:</b></label>
      <input type="file" id="files" name="files[]" />
      <button @click="uploadImage()">Upload Image</button>
    </div>
  </div>

  <div id="invite" v-if="isLoggedIn">
    <span class="emailInvite">Invite a friend to Fantasy Stock Trading!</span>
    <input class="emailInvite" size="35" placeholder="Enter your friend's email here" v-model="invitationEmail">
    <textarea name="myMessage" class="emailInvite" cols="80" rows="5" v-model="invitationMessage" placeholder="Enter your message here"></textarea>
    <button class="emailInvite" @click="sendInvite">Invite</button>
  </div>

  <hr>

  <div class="competitionStatus">
    <h3>Current Competitions:</h3>
    <ul id="userComps">
      <li v-for="comp in competitions" v-if="comp.users && !comp.isComplete">
        <div class="compView" v-for="user in comp.users" v-if="(isLoggedIn && (user.userid === currentUser.uid)) || (user.userid === currentUser.userid)">
          <h4>{{ comp.title }}</h4>
          <ul class="compData">
            <li><b> Portfolio value: </b> ${{ user.currentValue }}</li>
            <span><b> Shares owned: </b></span>
            <ul class="sharesOwned">
              <li v-for="share in user.shares">{{ share }}</li>
            </ul>
          </ul>
        </div>
      </li>
    </ul>
  </div>

  <div class="competitionStatus">
    <h3>Old Competitions:</h3>
    <ul id="userComps">
      <li v-for="comp in competitions" v-if="comp.users && comp.isComplete">
        <div class="compView" v-for="user in comp.users" v-if="(isLoggedIn && (user.userid === currentUser.uid)) || (user.userid === currentUser.userid)">
          <h4>{{ comp.title }}</h4>
          <ul class="compData">
            <li><b> Final portfolio value: </b> ${{ user.currentValue }}</li>
            <span><b> Shares owned: </b></span>
            <ul class="sharesOwned">
              <li v-for="share in user.shares">{{ share }}</li>
            </ul>
          </ul>
        </div>
      </li>
    </ul>
  </div>

</div>
</template>

<script>

import { storageRef, picsRef, compsRef } from './database'
//var storageRef = firebase.storage().ref();

export default {
  name: 'Profile',
  data() {
    return {
      isShown: false,
      userImageSource: "src/assets/empty-avatar.jpg",
      emailContent: "?subject=Fantasy%20Stock%20Trading&body=I%20saw%20your%20profile%20on%20Fantasy%20Stock%20Trading%20and%20wanted%20to%20say...",
      invitationEmail: null,
      invitationMessage: "I've been playing Fantasy Stock Trading lately, and you should too!  Check it out here: https://duke-compsci290-spring2018.github.io/final-project-team-15/"
    }
  },
  firebase: {
      images: {
        source: picsRef,
        readyCallback: function() {
          this.addImage(this.currentUser.uid);
        }
      },
      competitions: {
        source: compsRef
      }
  },

  mounted () {

    //var im = storageRef.child('images/' + this.currentUser.uid).getDownloadUrl().getResult();
    //console.log(im);

    /*
    storageRef.once("value").then(function(snapshot) {
      var uploadedImage = snapshot.child('images/' + this.currentUser.uid).val();
      console.log(uploadedImage);
      if (uploadedImage!=null) {
        this.userImageSource = uploadedImage;
      }
    });
    */
  },
  // methods provided to change value of user in parent component
  props: [
    'currentUser',
    'isLoggedIn'
  ],
  // let HTML template access user as if it were a variable in this component
  computed: {
    user() {
      return this.getUser()
    }
  },
  // methods for signing in and out
  methods: {

    sendInvite() {
      //console.log("email is ", this.invitationEmail);
      if (this.invitationEmail!==null) {
        window.location.href = "mailto:" + this.invitationEmail + "?subject=Check%20Out%20This%20Cool%20Site!&body=" + this.invitationMessage;
      }
      else {
        alert("Invalid email.")
      }
    },

    uploadImage() {
      var grabbedImage = document.getElementById('files');
      //var validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];

      if (grabbedImage.files.length > 0) {
        // get reference to a storage location and
        var file = grabbedImage.files[0];
        //var imageURL;

        storageRef.child('images/' + this.currentUser.uid).put(file).then(snapshot => this.pushUserImage(snapshot.downloadURL));
        this.userImageSource = file;
        // reset input values so user knows to input new data
        grabbedImage.value = '';

        //console.log(imageURL);
      }
    },

    pushUserImage(url) {
      picsRef.child(this.currentUser.uid).set({url: url, id: this.currentUser.uid}).then((data,err) => {if (err) {console.log(err)}});
      this.addImage(this.currentUser.uid);
    },

    addImage(userId) {

      console.log("images is " + this.images);
      for (var i=0; i<this.images.length; i++) {
        console.log(this.images[i]);
        if ((this.isLoggedIn && this.images[i].id === this.currentUser.uid) || this.images[i].id === this.currentUser.userid) {
          this.userImageSource = this.images[i].url;
        }
      }
      console.log(this.userImageSource, "");

    },

    backToMainView() {
      this.$parent.hidden = !this.$parent.hidden;
      this.$parent.userProfileToView = null;
      this.$parent.sameUser = false;
    },

    testFn() {
      console.log(this.currentUser);
    }
  }

}
</script>

<style scoped>

#profile {
  height: 100%;
}

.competitionStatus {
  text-align: center;
}

.compView {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}

#userInfo {
  text-align: center;
}

#image {
  padding-top: 20px;
  text-align: center;
}

.emailInvite {
  display: block;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}

span[class="emailInvite"] {
  text-align: center;
  font-weight: bold;
  margin-top: 30px;
}

input, label {
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 500px;
}

</style>
