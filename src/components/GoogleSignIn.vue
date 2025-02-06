<template>
    <div class="login-container">
        <div class="login-details">
            <img src="../assets/weather-logo.png" height="150" width="150">
            <p>Welcome to the Weather App! Stay updated with real-time weather conditions for any city around the globe. Simply log in, search for your desired location, and get detailed weather information at your fingertips. Enjoy a seamless experience with accurate forecasts and user-friendly features!</p>
            <h1>Sign in below to continue with the app!</h1>
            <div @click="signInWithGoogle" class="login-button">
                <img src="../assets/google-logo.webp" height="25" width="25">
                <button>Sign in with Google</button>
            </div>
        </div>
    </div>
</template>

<script>
import { auth, provider, signInWithPopup } from "../firebase";

export default {
    methods: {
        async signInWithGoogle() {
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                console.log("User signed in:", user);
                this.$router.push("/app");
            } catch (error) {
                console.error("Error signing in:", error);
            }
        },
    },
};
</script>

<style>

body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    background-image: url('/src/assets/login-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
.login-container{
    margin: 2rem;
    padding: 2rem;
    text-align: center;
    background-color: rgba(239, 247, 250, 0.6);
    border-radius: 2rem;
    backdrop-filter: blur(3px);
    height: 80vh;
    width: 30%;
}
.login-details{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    letter-spacing: 1px;
}
.login-details p{
    font-size: larger;
}
.login-details h1{
    color: #2c2a2a;
}
.login-button{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #F5FDFF;
    border-radius: 3rem;
    cursor: pointer;
    width: 25vw;
}
.login-button:hover{
    background-color: #e1e6e7;
}
.login-button button{
    background-color: transparent;
    border: none;
    font-size: larger;
    cursor: pointer;
    letter-spacing: 1px;
    outline: none;
}

</style>