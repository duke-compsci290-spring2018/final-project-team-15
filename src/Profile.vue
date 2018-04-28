<template>
<div id="profile">

  <button @click="backToMainView">Back to Competitions</button>
  <div id="userInfo">
    <h4>{{currentUser.name}}</h4>
    <h4>{{currentUser.email}}</h4>
  </div>

  <div id="image">
    <img :src="userImageSource" alt="Empty Avatar">
    <label for="files"><b>Upload an Image:</b></label>
    <input type="file" id="files" name="files[]" />
    <button @click="uploadImage()">Upload Image</button>
  </div>

</div>
</template>

<script>
import { storageRef, picsRef } from './database'
//var storageRef = firebase.storage().ref();

export default {
  name: 'Profile',
  data() {
    return {
      isShown: false,
      userImageSource: "src/assets/empty-avatar.jpg"
    }
  },
  firebase: {
      images: {
        source: picsRef,
        readyCallback: function() {
          this.addImage(this.currentUser.uid);
        }
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
  ],
  // let HTML template access user as if it were a variable in this component
  computed: {
    user() {
      return this.getUser()
    }
  },
  // methods for signing in and out
  methods: {
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
      /*
      var src = null;
      picsRef.once("value").then(function(snapshot) {
        snapshot.forEach(function(child) {
          if (child.key === userId) {
            src = child.child('url').val();
            console.log(src);
          }
        });
      }).then(
        this.userImageSource = src
      );
      */

      console.log("images is " + this.images);
      for (var i=0; i<this.images.length; i++) {
        console.log(this.images[i]);
        if (this.images[i].id === this.currentUser.uid) {
          this.userImageSource = this.images[i].url;
        }
      }
      console.log(this.userImageSource, "");

    },

    backToMainView() {
      this.$parent.hidden = !this.$parent.hidden;
    },

    testFn() {
      console.log(this.currentUser);
    }
  }

}
</script>

<style scoped>
#userInfo {
  text-align: center;
}

#image {
  padding-top: 20px;
  text-align: center;
}

#image button, input, label {
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
