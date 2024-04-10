/* Variables */
// Grab the first <dd> element for displaying the battery charging status
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
// Grab the <output> element inside the second <dd> element for displaying the battery charge level
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
// Grab the <progress> element inside the second <dd> element for a more graphical representation of the battery's state of charge (SOC)
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');

/* Functions */
// Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
    // Check if the browser supports the Battery Status API
if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
        // Initial battery status
        updateBatteryStatus(battery);

        // Listen for changes in battery status
        battery.addEventListener('chargingchange', function() {
            updateBatteryStatus(battery);
        });

        battery.addEventListener('levelchange', function() {
            updateBatteryStatus(battery);
        });
    });
} else {
    console.log('Battery Status API not supported');
}

function updateBatteryStatus(battery) {
    console.log('Battery charging:', battery.charging);
    console.log('Battery level:', battery.level);
    console.log('Battery charging time:', battery.chargingTime);
    console.log('Battery discharging time:', battery.dischargingTime);
}

    
    // Update the charge level
    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = (battery.level * 100);

    // Fetching image from Robohash API based on battery percentage
    const batteryPercent = Math.round(battery.level * 100);
    const robohashUrl = `https://robohash.org/${batteryPercent}.png`;
    const image = new Image();
    image.src = robohashUrl;
    document.body.appendChild(image); // Appending the image 
}

navigator.getBattery().then(battery => {
    updateBatteryStatus(battery);

    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    })

    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    })
})
