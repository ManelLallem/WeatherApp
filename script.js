let locationKey ="Go7rOvXTFKM0ZzjlLEm2Jg==FI6u1GP25bbqs4gP"

const cityInput = document.getElementById('searchInput')
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click',async() => {
    let cityName = cityInput.value;

    let locationApi = `https://api.api-ninjas.com/v1/city?name=${cityName}`
    let coordinates= await getLocation(locationApi,locationKey)

    let weatherApi =`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`
    getWeather(weatherApi)
    }
);

let getLocation = async(url,key)=>{
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': key
            }
        });
        let data = await response.json();
        console.log(data);
        return {
            latitude: data[0].latitude,
            longitude: data[0].longitude
        };
    } catch (error) {
        console.error('Error fetching location data:', error);
    }
    
}
let getWeather=(url)=>{
    fetch(url)
        .then(response => response.json())
        .then(data => { console.log(data)

            // get the  weather description 
            let description = "";
            let weatherCode = data.current.weather_code;
            if (weatherCode === 0) {
                description = "Clear Sky";
                document.body.classList.remove(...document.body.classList);
                document.body.classList.add('clear');

            } else if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3 ) {
                description = "Partly cloudy";
                document.body.classList.remove(...document.body.classList);
                document.body.classList.add('cloud');

            } else if (weatherCode === 45 || weatherCode === 48) {
                description = "Fog";
                document.body.classList.remove(...document.body.classList);
                document.body.classList.add('fog');

            } else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55|| weatherCode === 56|| weatherCode === 57) {
                description = "Drizzle";
                document.body.classList.remove(...document.body.classList);
                document.body.classList.add('drizzle');

            } else if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65|| weatherCode === 80|| weatherCode === 81|| weatherCode === 82) {
                description = "Rain";
                document.body.classList.remove(...document.body.classList);
                document.body.classList.add('rain');

            } else if (weatherCode === 66 || weatherCode === 67) {
                description = "Freezing rain";
                document.body.classList.remove(...document.body.classList);
                document.body.classList.add('freezRain');

            } else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75|| weatherCode === 77|| weatherCode === 85|| weatherCode === 86) {
                description = "Snow";
                document.body.classList.remove(...document.body.classList);
                document.body.classList.add('snow');

            } else if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
                description = "Thunderstorm";
                document.body.classList.remove(...document.body.classList);
                document.body.classList.add('thunderstorm');
            } else {
                description = "Unknown weather code";
            }
            document.getElementById('disc').textContent = description;

            // get the  current temperture 
            let temp = data.current.temperature_2m;
            document.getElementById('temp').textContent = `${temp}°`;

            // get the date and time
            let Thedate = new Date(data.current.time);
            date = Thedate.toLocaleDateString('en-US', {weekday: 'long',day: '2-digit',month: 'long',year: 'numeric'});
            let num_date =Thedate.toLocaleDateString('en-US')
            let time = Thedate.toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            });
            document.getElementById('time').textContent = time;
            document.getElementById('date').textContent = date ;
            document.getElementById('num-date').textContent=num_date
            
            //get the max an min temp
            let max_temp  = data.daily.temperature_2m_max[0]
            let min_temp  = data.daily.temperature_2m_min[0]
            document.getElementById('max-temp').textContent = `${max_temp}°` ;
            document.getElementById('min-temp').textContent = `${min_temp}°` ;

            //get the humidity
            let humidity = data.current.relative_humidity_2m
            document.getElementById('current-humidity').textContent =`${humidity} %`;
            //get the precipitation
            let prec = data.current.precipitation
            document.getElementById('current-prec').textContent= `${prec} mm`
            //get the wind
            let wind = data.current.wind_speed_10m
            document.getElementById('current-wind').textContent= `${wind} km/h`
            //get the current temp
            let current_temp = data.current.apparent_temperature
            document.getElementById('current-temp').textContent= `${current_temp}°`


        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
