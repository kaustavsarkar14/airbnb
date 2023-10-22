const hotelsDiv = document.querySelector('.hotelsdiv')
const searchTab = document.querySelector('.mid')
const searchForm = document.getElementById('searchForm')
const searchButton = document.getElementById('searchButton')
const filterButtons = document.querySelectorAll('.filters>button')

const urlParams = new URLSearchParams(window.location.search);
let cityName = urlParams.get('location')
let checkin = urlParams.get('checkin')
let checkout = urlParams.get('checkout')
let guest = urlParams.get('guest') || 1
console.log(cityName, checkin, checkout, guest)

let url = `https://airbnb13.p.rapidapi.com/search-location?location=${cityName}&checkin=${checkin}&checkout=${checkout}&adults=${guest}&children=0&infants=0&pets=0&page=1&currency=INR`;


let isFreeCancellationSelected = false
let isWifiSelected = false
let isKitchenSelected = false
let isACSelected = false
let isWasherSelected = false
let isIronSelected = false
let isParkingSelected = false
let isWorkspaceSelected= false
let isDryerSelected = false

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f5f3289e7bmsh6d4d9e5c6728ef5p1d0bb0jsnd72aaae20a24',
        'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
};

async function getData() {
    try {
        url = `https://airbnb13.p.rapidapi.com/search-location?location=${cityName}&checkin=${checkin}&checkout=${checkout}&adults=${guest}&children=0&infants=0&pets=0&page=1&currency=INR`;
        const response = await fetch(url, options);
        const data = await response.json();
        let result = data.results;

        // const response = await fetch("./dummy.json");
        // const data = await response.json();
        // let result = data;
        let resultCopy = [...result]
        showSeach()
        console.log(result)
        renderHotels(result)

        toggleFreeCancellation.addEventListener('click',(e)=>{
            e.target.classList.toggle('selected')
            if(!isFreeCancellationSelected){
                result = result.filter(el=>el.cancelPolicy=="CANCEL_FLEXIBLE")
            }
            else{
                result = [...resultCopy]
            }
            isFreeCancellationSelected = !isFreeCancellationSelected
            
            renderHotels(result)
        })
        toggleWifi.addEventListener('click',(e)=>{
            e.target.classList.toggle('selected')
            if(!isWifiSelected){
                result = result.filter(el=>el.previewAmenities.includes("Wifi"))
            }
            else{
                result = [...resultCopy]
            }
            isWifiSelected = !isWifiSelected
            renderHotels(result)
        })
        toggleKitchen.addEventListener('click',e=>{
            e.target.classList.toggle('selected')
            if(!isKitchenSelected){
                result = result.filter(el=>el.previewAmenities.includes("Kitchen"))
            }
            else{
                result = [...resultCopy]
            }
            isKitchenSelected = !isKitchenSelected
            renderHotels(result)
        })
        toggleAC.addEventListener('click',e=>{
            e.target.classList.toggle('selected')
            if(!isACSelected){
                result = result.filter(el=>el.previewAmenities.includes("Air conditioning"))
            }
            else{
                result = [...resultCopy]
            }
            isACSelected = !isACSelected
            renderHotels(result)
        })
        toggleWasher.addEventListener('click',e=>{
            e.target.classList.toggle('selected')
            if(!isWasherSelected){
                result = result.filter(el=>el.previewAmenities.includes("Washer"))
            }
            else{
                result = [...resultCopy]
            }
            isWasherSelected = !isWasherSelected
            renderHotels(result)
        })
        toggleIron.addEventListener('click',e=>{
            e.target.classList.toggle('selected')
            if(!isIronSelected){
                result = result.filter(el=>el.previewAmenities.includes("Iron"))
            }
            else{
                result = [...resultCopy]
            }
            isIronSelected = !isIronSelected
            renderHotels(result)
        })
        toggleFreeParking.addEventListener('click',e=>{
            e.target.classList.toggle('selected')
            if(!isParkingSelected){
                result = result.filter(el=>el.previewAmenities.includes("Free parking"))
            }
            else{
                result = [...resultCopy]
            }
            isParkingSelected = !isParkingSelected
            renderHotels(result)
        })
        toggleDryer.addEventListener('click',e=>{
            e.target.classList.toggle('selected')
            if(!isDryerSelected){
                result = result.filter(el=>el.previewAmenities.includes("Dryer"))
            }
            else{
                result = [...resultCopy]
            }
            isDryerSelected = !isDryerSelected
            renderHotels(result)
        })
        toggleWorkspace.addEventListener('click',e=>{
            e.target.classList.toggle('selected')
            if(!isWorkspaceSelected){
                result = result.filter(el=>el.previewAmenities.includes("Personal Workspace"))
            }
            else{
                result = [...resultCopy]
            }
            isWorkspaceSelected = !isWorkspaceSelected
            renderHotels(result)
        })
        selectPrice.addEventListener("input",e=>{
            result = [...resultCopy]
            result = result.filter(el=>el.price.rate<parseInt(e.target.value))
            filterButtons.forEach(el=>el.classList.remove('selected'))
            renderHotels(result)
        })
        typeOfPlace.addEventListener("input",e=>{
            result = [...resultCopy]
            result = result.filter(el=>el.type.includes(e.target.value))
            filterButtons.forEach(el=>el.classList.remove('selected'))
            renderHotels(result)
        })

    } catch (error) {
        console.error(error);
    }
}
getData()

searchTab.addEventListener('click', e => {
    searchTab.style.display = "none"
    document.querySelector('.search-box').style.display = "block"
})
searchForm.addEventListener('submit', e => {
    e.preventDefault()
})
function renderHotels(result) {
    hotelsDiv.innerHTML = ""
    const searchResultCount = document.createElement('h4')
    searchResultCount.innerText = `${roundValue(result?.length)}+ stays in ${cityName}`
    hotelsDiv.appendChild(searchResultCount)
    result.forEach(el => {
        const hotel = document.createElement('div')
        hotel.className = "hotel"
        hotel.addEventListener('click',()=>{
            window.location.href = "hotelDetails.html"
            localStorage.setItem('hotel',JSON.stringify(el))
        })
        hotel.innerHTML = `
        <div class="imageDiv">
        <img src=${el.images[0]}
            alt="">
        </div>
        <div class="hotelDetails">
        <img id="likeIcon" src="./assets/liked.svg" alt="">
        <div class="title">
            <p style="margin-bottom:0.5rem;">${el.type} in ${el.city}</p>
            <h3>${el.name}</h3>
        </div>
        <hr/>
        <div class="features">
             ${el.beds} ${el.beds > 1 ? "beds" : "bed"} · ${el.bathrooms} ${el.bathrooms > 1 ? "baths" : "bath"} · ${el.persons} ${el.persons > 1 ? "guests" : "guest"} <br>
            ${el.previewAmenities.toString().split(",").join(" · ")}
        </div>
        <hr/>
        <div class="rating"><span>${el.rating}</span> <img src="./assets/star.svg" /><span>(${el.reviewsCount} reviews)</span></div>
        <h3 class="price">₹${el.price.rate} <span>/night</span></h3>
        </div>
        `
        hotelsDiv.appendChild(hotel)
    })
}
function roundValue(n) {
    let ncopy = n
    let i = 1
    while (n > 9) {
        n = Math.floor(n / 10)
        i *= 10
    }
    return n * i
}


searchButton.addEventListener('click',e=>{
    e.preventDefault()
    showSearchTab()
    cityName = document.getElementById('location').value
    checkin = document.getElementById('checkin').value
    checkout = document.getElementById('checkout').value
    guest = document.getElementById('guest').value
    getData()
})
function showSearchTab() {
    document.querySelector('.search-box').style.display = "none"
    searchTab.style.display = "block"
}

function formatDate(startDate, endDate) {
    if(!startDate || !endDate) return null
    const startDateParts = startDate.split("-");
    const endDateParts = endDate.split("-");

    const startMonth = new Date(startDate).toLocaleString('default', { month: 'short' });
    const endMonth = new Date(endDate).toLocaleString('default', { month: 'short' });

    if (startMonth === endMonth) {
        return `${startMonth} ${startDateParts[2]} - ${endDateParts[2]}`;
    } else {
        return `${startMonth} ${startDateParts[2]}-${endMonth} ${endDateParts[2]}`;
    }
}

function showSeach() {
    showCityName.innerText = cityName || "city"
    showDate.innerText = formatDate(checkin, checkout) || "date"
    showGuest.innerText = guest || 0
}



