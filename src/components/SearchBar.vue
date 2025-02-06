<template>
    <div class="side-bar">
        <div class="input-field">
            <img class="search-icon" src="../assets/search-icon.png" height="20" width="20">
                <input
                      v-model="city"
                      placeholder="Search for places..."
                      @input="fetchCities"
                      @focus="showDropdown = true"
                      @blur="hideDropdownWithDelay"
                      class="search-input"
                />
                <ul v-if="showDropdown && cities.length" class="dropdown">
                    <li
                       v-for="(city, index) in cities"
                       :key="index"
                       @mousedown="selectCity(city)"
                       class="dropdown-item"
                    >
                       {{ city.name }}
                    </li>
                </ul>
                <button @click="fetchWeather" class="search-button"><img src="../assets/target-icon.png" height="18"></button>
        </div>
        <button @click="$emit('getCurrentLocation')" class="location-button">
            <img src="../assets/target-icon2.png" height="22" />
            Get Current Location
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            city: '',
            cities: [],
            showDropdown: false,
        };
    },
    methods: {
        async fetchCities() {
            if (this.city.length < 2) {
                this.cities = [];
                return;
            }
            const apiKey = 'f1dd5b425ac45cdcdfdc1610e658b825';
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=5&appid=${apiKey}`);
            const data = await response.json();
            this.cities = data.map(city => ({
                name: `${city.name}, ${city.country}` 
            }));
        },
        selectCity(city) {
            this.city = city.name;
            this.showDropdown = false;
        },
        hideDropdownWithDelay() {
            setTimeout(() => {
                this.showDropdown = false;
            }, 200);
        },
        fetchWeather() {
            this.$emit('search', this.city)
        },
    },
};
</script>

<style scoped>

.side-bar{
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.6);
    height: 45.28rem;
    width: 20vw;
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
}
.input-field{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 3rem;
    background-color: transparent;
    border: 0.5px solid #ffffff;
    outline: none;
}
.input-field:hover{
    outline: 1px solid #ffffff;
}
.search-icon{
    padding-left: 1rem;
}
.search-input{
   padding: 1rem;
   width: 60%;
   outline: none;
   border: none;
   border-radius: 3rem;
   background-color: transparent;
   font-size: 1rem;
}
.search-button{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 3rem;
    border: none;
    position: relative;
    right: 0.5rem;
    background-color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
}
.search-button:hover{
    background-color: #ffffff;
}
.dropdown{
    position: absolute;
    top: 18%;
    left: 4rem;
    width: 19%;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 0.5rem;
    margin-top: 0.5rem;
    max-height: 12rem;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    z-index: 1000;
}
.dropdown::-webkit-scrollbar{
    display: none;
}
.dropdown-item{
    padding: 1rem 1rem;
    border-radius: 2rem;
    font-size: 1rem;
    transition: background 0.2s ease-in-out;
    cursor: pointer;
}
.dropdown-item:hover{
    background-color: #f7f7f7;
}
.location-button{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    padding: 0.8rem;
    width: 100%;
    border: none;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 3rem;
    cursor: pointer;
    font-size: 1rem;
}
.location-button img{
    margin-right: 1rem;
}
.location-button:hover{
    background-color: #ffffff;
}

</style>