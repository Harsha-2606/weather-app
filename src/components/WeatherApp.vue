<template>
    <div>
        <div v-if="user">
            <div class="main-page">
                <SearchBar @search="handleSearch" @getCurrentLocation="fetchCurrentLocation" />
                <WeatherDisplay v-if="weatherData" :weather="weatherData" />
                <div class="user-signout">
                    <h1>Hello, {{ user.displayName }}</h1>
                    <button @click="signOut"><img src="../assets/logout-logo.png" height="18"></button>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Please log in to view the weather.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import SearchBar from './SearchBar.vue';
import WeatherDisplay from './WeatherDisplay.vue';
import { auth } from '@/firebase';

export default {
    components: {
        SearchBar,
        WeatherDisplay,
    },
    data() {
        return {
            weatherData: null,
            user: null,
        };
    },
    methods: {
        async handleSearch(city) {
            const apiKey = process.env.VUE_APP_OPENWEATHERAPP_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            try {
                const response = await axios.get(url);
                this.weatherData = response.data;
                this.weatherData.iconUrl = `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}.png`;
            } catch (error) {
                console.error("Error fetching weather data:", error)
            }
        },
        async fetchCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const apiKey = process.env.VUE_APP_OPENWEATHERAPP_API_KEY;
                        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
                        try {
                            const response = await axios.get(url);
                            this.weatherData = response.data;
                            this.weatherData.iconUrl = `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}.png`;
                        } catch (error) {
                            console.error("Error fetching current location data:", error);
                        }
                    },
                    (error) => {
                        console.error("Geolocation error:", error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        },
        async signOut() {
            try {
                await auth.signOut();
                this.user = null;
                this.$router.push("/");
            } catch (error) {
                console.error("Error signing out:", error)
            }
        },
    },
    created() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
                this.fetchCurrentLocation();
            } else {
                this.user = null;
            }
        });
    },
};
</script>

<style>

body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}
.main-page{
    margin: 2rem;
    height: 120vh;
    width: 95vw;
    background-color: rgba(239, 247, 250, 0.6);
    border-radius: 2rem;
}
.user-signout{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    padding: 1px;
    height: 3.1rem;
    width: 66%;
    border-radius: 2rem;
    top: 4rem;
    transform: translateX(-50%);
    left: 62%;
    background-color: rgba(255, 255, 255, 0.6);
}
.user-signout h1{
    color: #242424;
    font-size: 1.5rem;
    margin-left: 1rem;
    text-decoration: underline;
}
.user-signout button{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    border: none;
    outline: none;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 3rem;
    height: 2.5rem;
    width: 2.5rem;
    cursor: pointer;
}
.user-signout button:hover{
    background-color: #ffffff;
}

</style>