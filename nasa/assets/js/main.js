
const apiKey = "MqEy5rgadORtCZikqSHmJdsJ8q0D5vcJflKY0Zat";
const datePicker = document.getElementById("date-picker");
const fetchButton = document.getElementById("fetch-button");
const titleElement = document.getElementById("title");
const mediaContainer = document.getElementById("potd-media");
const descriptionElement = document.getElementById("potd-desc");

async function getNasaData(date = "") {
    try {
        let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
        if (date) {
            url += `&date=${date}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();

        titleElement.textContent = data.title;
        descriptionElement.textContent = data.explanation;
        
        mediaContainer.innerHTML = data.media_type === "image"
            ? `<img src="${data.url}" alt="${data.title}">`
            : `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;

    } catch (error) {
        console.error("Error fetching NASA data:", error);
        mediaContainer.innerHTML = "<p>Failed to load data. Try again later.</p>";
    }
}

// Load default image on page load
getNasaData();

// Fetch image when user selects a date
fetchButton.addEventListener("click", () => {
    const selectedDate = datePicker.value;
    if (selectedDate) {
        getNasaData(selectedDate);
    } else {
        alert("Please select a date!");
    }
});

