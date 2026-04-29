const RAPID_API_KEY = "1af8eed1a0mshe1aeb1a26024eebp1db103jsn3f5882b37da3";
const RAPID_API_HOST = "free-api-live-football-data.p.rapidapi.com";
const url = `https://${RAPID_API_HOST}/football-get-all-leagues-with-countries?lang=en`;

fetch(url, {
  method: "GET",
  headers: {
    "x-rapidapi-key": RAPID_API_KEY,
    "x-rapidapi-host": RAPID_API_HOST,
    "Accept": "application/json",
  }
})
.then(async res => {
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Body:", text);
})
.catch(err => console.error("Error:", err));
