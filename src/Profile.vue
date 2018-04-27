<template>
  <div id="profile">

    <button @click="backToMainView">Back to Competitions</button>
    <div id="userInfo">
      <h4>{{currentUser.name}}</h4>
      <h4>{{currentUser.email}}</h4>
    </div>

    <div id="image">
      <img src="./assets/empty-avatar.jpg" alt="Empty Avatar">
      <label for="files">Upload an Image:</label>
      <input type="file" id="files" name="files[]" />
    </div>

  </div>
</template>

<script>
//var storageRef = firebase.storage().ref();

export default {
    name: 'Profile',
    data () {
        return {
            isShown: false
        }
    },
    // methods provided to change value of user in parent component
    props: [
        'currentUser',
    ],
    // let HTML template access user as if it were a variable in this component
    computed: {
        user () {
            return this.getUser()
        }
    },
    // methods for signing in and out
    methods: {
      backToMainView() {
        this.$parent.hidden = !this.$parent.hidden;
      },

      testFn() {
        console.log(this.currentUser);
      }
    }

}
</script>

<style>
#userInfo {
  text-align: center;
}

#image{
  padding-top: 20px;
  text-align: center;
  margin: auto;
  width: 300px;
}
</style>
