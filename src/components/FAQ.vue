<template>
<div id="faq">
  <h2>Welcome to Fantasy Stock Trading!</h2>
  <ul>
    <li>
      Feel free to browse available stock competitions below.
      Competitions will be updated regularly by the site administrators.
    </li>
    <li>
      After creating your profile, you can join as many open competitions as you'd like!
    </li>
    <li>
      Allocate your available cash based on the available stocks in each competition.
      Choose wisely, because you can't change your portfolio once it's been submitted!
    </li>
    <li>
      The user with the highest portfolio value at the end of each competition wins!
    </li>
    <li>
      Check out the leaderboard to see how your performance compares to that of other users.
    </li>
    <li>
      Competitions can be separated by category using the filters below.
      They also vary in terms of the timeframe for which they will last.
    </li>
    <li>
      You can check out competitions that have already been completed as well.
    </li>
    <li>
      Invite your friends over email, Facebook, or Twitter.
      Feel free to share your performance too!
    </li>
    <li>
      Happy Trading!
    </li>
    <li>
      --Peter Ciporin and Kelley Scroggs
    </li>
  </ul>
  <hr>
</div>
</template>

<script>
//import { storageRef, picsRef } from './database'
//var storageRef = firebase.storage().ref();

export default {
  name: 'FAQ',
  data() {
    return {

    }
  },
  firebase: {

  },

  mounted () {

  },
  props: [

  ],
  computed: {

  },
  methods: {

  }

}
</script>

<style scoped>

ul {
  list-style-type: none;
}

li {
  font-weight: bold;
  margin: 10px;
}

</style>
