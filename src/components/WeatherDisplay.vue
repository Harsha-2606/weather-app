<template>
    <div v-if="weather">
        <div class="weather-details">
            <div class="weather-info">
                <h1><img src="../assets/location.png" height="25" /> {{ weather.name }}</h1>
                <p class="desc">{{ weather.weather[0].description }}</p>
                <h3 class="day-time">{{ localDateTime.day }}, <strong>{{ localDateTime.time }}</strong></h3>
                <div class="icon-temp">
                    <img :src="weather.iconUrl" alt="Weather icon" class="weather-logo" />
                    <p>{{ weather.main.temp }}°C</p>
                </div>
                <p class="temp-details"><img src="../assets/humidity.png" height="14" /> Humidity: <strong>{{ weather.main.humidity }}%</strong></p>
                <p class="temp-details"><img src="../assets/temperature.png" height="14" /> Real Feel: <strong>{{ weather.main.feels_like }}°</strong></p>
                <p class="temp-details"><img src="../assets/wind-logo.png" height="14" />Wind: <strong>{{ weather.wind.speed }}km/h</strong></p>

                <div class="temp-details2">
                    <p class="temp-details"><img src="../assets/therm-up.png" height="16" />High Temperature: <strong>{{ weather.main.temp_max }}°</strong></p>
                    <p class="temp-details"><img src="../assets/therm-down.png" height="16" />Low Temperature: <strong>{{ weather.main.temp_min }}°</strong></p>
                    <p class="temp-details"><img src="../assets/sunrise.png" height="16" />Sunrise: <strong>{{ formatTime(weather.sys.sunrise) }}</strong></p>
                    <p class="temp-details"><img src="../assets/sunset.png" height="16" />Sunset: <strong>{{ formatTime(weather.sys.sunset) }}</strong></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        weather: Object,
    },
    computed: {
        localDateTime() {
            if(!this.weather || !this.weather.timezone) return { day: "", time: "" };
            const utcTimestamp = Date.now();
            const localeTimestamp = utcTimestamp + this.weather.timezone * 1000;
            const localeDate = new Date(localeTimestamp);
            const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(localeDate);
            const time = localeDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
            return { day, time }
        }
    },
    methods: {
        formatTime(timestamp) {
            const date = new Date(timestamp * 1000);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        },
    },
};
</script>

<style scoped>

.weather-details{
   margin-top: -40rem;
}
.weather-info{
    border-top: 1px solid #ffffff;
    padding-left: 3rem;
    margin-top: 2rem;
    width: 22.17%;
}
.day-time{
    font-weight: 500;
}
.day-time strong{
    font-weight: normal;
}
.weather-info .desc{
    text-transform: capitalize;
    font-style: italic;
    font-size: 1.2rem;
    font-weight: 700;
    color: rgb(33, 152, 189);
    position: relative;
    bottom: 0.5rem;
}
.icon-temp{
    display: flex;
    align-items: center;
    margin-top: -1rem;
}
.icon-temp p{
    font-size: 2rem;
    font-weight: bold;
}
.weather-logo{
    height: 6rem;
    width: 6rem;
}
.temp-details{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.1rem;
    font-style: italic;
    letter-spacing: 1px;
}
.temp-details img{
    padding-right: 1.5rem;
}
.temp-details strong{
    padding-left: 0.3rem;
}

</style>