<template>
<ul>
    <li v-if="user"><a>{{user.name}}</a></li>
    <li v-if="user" @click="signOut"><a><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
    <li v-else @click="signInPopup"><a><span class="glyphicon glyphicon-user"></span>Sign In</a></li>
    <!-- sign in "popup" container does not popup for email authentication, so provide so styling help -->
    <div id="firebaseui-auth-container" :class="{ popup: isShown }"></div>
</ul>
</template>

<script>
import Firebase from 'firebase'
import FirebaseUI from 'firebaseui'
// single instance of popup credentials UI
var authUI = new FirebaseUI.auth.AuthUI(Firebase.auth())

export default {
    name: 'Authentication',
    data () {
        return {
            isShown: false
        }
    },
    // methods provided to change value of user in parent component
    props: [
        'getUser',
        'setUser'
    ],
    // let HTML template access user as if it were a variable in this component
    computed: {
        user () {
            return this.getUser()
        }
    },
    // methods for signing in and out
    methods: {
        signInPopup () {
            authUI.start('#firebaseui-auth-container', {
                // open the authentication flow as a popup
                signInFlow: 'popup',
                // require password each time
                credentialHelper: FirebaseUI.auth.CredentialHelper.NONE,
                // new users automatically created for new emails
                signInOptions: [{
                    provider: Firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true
                }],
                // respond to authenticaion attempts
                callbacks: {
                    signInSuccessWithAuthResult: authResult => {
                        // save interesting parts of user data
                        this.signIn(authResult.user)
                        // hide styling again
                        this.isShown = false
                        // do not redirect
                        return false
                    },
                    uiShown: () => {
                        // style UI container as a popup
                        this.isShown = true
                    }
                }
            })
        },
        signIn (user) {
            this.setUser({
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                isAnonymous: user.isAnonymous
            })
        },
        signOut () {
            Firebase.auth().signOut()
            this.setUser(null)
        }
    },
    mounted () {
        // allow user to automatically log in if returning to site after refresh
        Firebase.auth().onAuthStateChanged(authState => {
            if (authState) {
                this.signIn(authState)
            }
        })
    }
}
</script>

<style scoped>
.popup {
    position: absolute;
    padding: 15px;
    width: 350px;
    height: 250px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,0%);
}
</style>
