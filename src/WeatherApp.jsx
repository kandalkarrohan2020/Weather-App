import { useState } from 'react'
import './WeatherApp.css'


export default function WeatherApp() {
     const [input,setInput] = useState("Mahagaon");
     const [name,setName] = useState("Mahagaon");
     const [temp,setTemp] = useState("30");
     const [windSpeed,setWindSpeed] = useState("3");
     const [weather,setWeather] = useState("26");
     let backPhoto = document.querySelector("#backphoto");
     

   
     let updateInput = (event) => {
         setInput(event.target.value);
     }
     
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const key = "28ba7b63d2488c8da941cde1680591ac";
    
       
  
    
    let getWeatherInfo = async () => {
         let response = await fetch(`${url}?q=${input}&appid=${key}&units=Metric`);
         let jsonResponse = await response.json();
         
         setName(jsonResponse.name);
         setTemp(jsonResponse.main.temp);
         setWindSpeed(jsonResponse.wind.speed);
         setWeather(jsonResponse.main.humidity);
         
         if(Math.floor(jsonResponse.main.temp) > 15 && Math.floor(jsonResponse.main.humidity) < 80){
           backPhoto.className = "img";
         }
         if(Math.floor(jsonResponse.main.temp) < 15 && Math.floor(jsonResponse.main.humidity) < 80){
          backPhoto.className = "img2";
         }
        
          if(Math.floor(jsonResponse.main.humidity) > 80){
            backPhoto.className = "img3";
         }
        
         };
    
   
    
    let clickbtn = () => {
        
        if(input === ""){
            return 0;
        }
        else {
            getWeatherInfo();
            setInput("");
        }
        

     }

     

     

    return (
        <div className='weather-container'>
            <div className="search">
              <input type="text" placeholder='City_Name' className='inp' value={input} onChange={updateInput}/>
              <button className='btn' onClick={clickbtn}><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            
            <div className="img" id='backphoto'>
           
            </div>
            
            <div className="box">
               <ul>
                  <li>City : {name}</li>
                  <li>Tempreature : {Math.floor(temp) + " Degree"} </li>
                  <li>Humidity : {Math.floor(weather) + " %"}</li>
                  <li>Wind-Speed : {Math.floor(windSpeed)+ " km/h"} </li>
                  
               </ul>
            </div>
        </div>
    )
}