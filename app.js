// for Dom

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
//console.log(icon);

const updateUI = (data)=>{
    const{cityDets,weather} = data; //destructuer prperties
    
    
    // const cityDets= data.cityDets;
    // const weather= data.weather;
    // console.log(data)

    //update details temp
    details.innerHTML=`
    <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText} </div>
            <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>



    `;
// update the night / day & icon images

// const iconsrc=`img/icons/${weather.WeatherIcon}.svg`;
//  icon.setAttribute('src',iconsrc);
//console.log(data);
let timesrc = null;
if(weather.IsDayTime){
    timesrc='img/day.svg'
}else{
    timesrc='img/night.svg'
}
time.setAttribute('src',timesrc);



//remove the d-non class present
if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
}
// console.log(data)
};

const updateCity = async(city)=>{
const cityDets = await getCity(city);
const weather = await getWeather(cityDets.Key);
//return to object
return { cityDets,weather};

};

cityForm.addEventListener('submit', e=>{

    e.preventDefault();

// get city value 
const city = cityForm.city.value.trim();
cityForm.reset();


//update UI with new city 
updateCity(city)
.then(data=>updateUI(data))
.catch(err=>console.log(err));
});
