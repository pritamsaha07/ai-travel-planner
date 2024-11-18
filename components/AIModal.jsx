const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
            role: "user",
            parts: [
              {text: "Generate Travel Plan for Delhi, for 5 Days and 4 Nights for Friends with a Moderate budget with a destination Image url Flight deatils, Flight Price with a Booking urls, Hotels options list with HotelName, Hotel address, Hotel Image url, rating and Places to visit nearby iwith place Name, place details, Place Image Url, ticket pricing, Time to travel each of the loctaion with each day plan with best time to visit in JSON format"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```json\n{\n  \"tripName\": \"Delhi Friends' Exploration: 5 Days, 4 Nights\",\n  \"destinationImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/New_Delhi_skyline.jpg/1280px-New_Delhi_skyline.jpg\",\n  \"bestTimetoVisit\": \"October to March (pleasant weather)\",\n  \"budget\": \"Moderate\",\n  \"flightDetails\": {\n    \"airline\": \"[Airline Name - e.g., IndiGo]\",\n    \"flightNumber\": \"[Flight Number - e.g., 6E1234]\",\n    \"arrival\": \"[Arrival Time and Airport - e.g., Delhi (DEL), 10:00 AM]\",\n    \"departure\": \"[Departure Time and Airport - e.g., Delhi (DEL), 6:00 PM]\",\n    \"bookingUrl\": \"[Booking URL - e.g., www.goindigo.in]\",\n    \"price\": \"[Price per person - e.g., INR 8000 (round trip)]\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"[Hotel Name 1 - e.g., FabHotel Prime 22]\",\n      \"hotelAddress\": \"[Hotel Address 1 - e.g.,  22, Paharganj, New Delhi]\",\n      \"hotelImageUrl\": \"[Hotel Image URL 1 -  replace with actual URL]\",\n      \"rating\": \"[Hotel Rating 1 - e.g., 4.2]\",\n      \"nearbyPlaces\": [\n        {\n          \"name\": \"Connaught Place\",\n          \"placeDetails\": \"A bustling commercial and shopping hub\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Connaught_Place_Delhi.jpg/1280px-Connaught_Place_Delhi.jpg\",\n          \"ticketPricing\": \"No entry fee\",\n          \"travelTime\": \"20 minutes (taxi/metro)\"\n        }\n      ]\n    },\n    {\n      \"hotelName\": \"[Hotel Name 2 - e.g.,  Hotel Sunshine]\",\n      \"hotelAddress\": \"[Hotel Address 2 - e.g., 21, Paharganj, New Delhi]\",\n      \"hotelImageUrl\": \"[Hotel Image URL 2 - replace with actual URL]\",\n      \"rating\": \"[Hotel Rating 2 - e.g., 3.8]\",\n      \"nearbyPlaces\": [\n        {\n          \"name\": \"New Delhi Railway Station\",\n          \"placeDetails\": \"Major railway station\",\n          \"placeImageUrl\": \"[Image URL - replace with actual URL]\",\n          \"ticketPricing\": \"No entry fee\",\n          \"travelTime\": \"5 minutes (taxi/walk)\"\n        }\n      ]\n    }\n  ],\n  \"days\": [\n    {\n      \"day\": 1,\n      \"theme\": \"Arrival & Old Delhi Exploration\",\n      \"locations\": [\n        {\n          \"name\": \"Red Fort\",\n          \"placeDetails\": \"UNESCO World Heritage Site, Mughal emperor's residence\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Red_Fort_Delhi.jpg/1280px-Red_Fort_Delhi.jpg\",\n          \"ticketPricing\": \"INR 50 (Indians), INR 600 (Foreigners)\",\n          \"travelTime\": \"3-4 hours\"\n        },\n        {\n          \"name\": \"Jama Masjid\",\n          \"placeDetails\": \"Grand mosque, impressive architecture\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Jama_Masjid_Delhi_2009.jpg/1280px-Jama_Masjid_Delhi_2009.jpg\",\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"1-2 hours\"\n        },\n        {\n          \"name\": \"Chandni Chowk\",\n          \"placeDetails\": \"Vibrant market, street food, shopping\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Chandni_Chowk_Delhi.jpg/1280px-Chandni_Chowk_Delhi.jpg\",\n          \"ticketPricing\": \"No entry fee\",\n          \"travelTime\": \"2-3 hours\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"theme\": \"Mughal Heritage & South Delhi\",\n      \"locations\": [\n        {\n          \"name\": \"Humayun's Tomb\",\n          \"placeDetails\": \"Precursor to the Taj Mahal, beautiful Mughal architecture\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Humayuns_Tomb_001.jpg/1280px-Humayuns_Tomb_001.jpg\",\n          \"ticketPricing\": \"INR 60 (Indians), INR 600 (Foreigners)\",\n          \"travelTime\": \"2-3 hours\"\n        },\n        {\n          \"name\": \"Qutub Minar\",\n          \"placeDetails\": \"Tall minaret, Indo-Islamic architecture\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Qutub_Minar_Delhi_India_2009.jpg/1280px-Qutub_Minar_Delhi_India_2009.jpg\",\n          \"ticketPricing\": \"INR 60 (Indians), INR 600 (Foreigners)\",\n          \"travelTime\": \"2-3 hours\"\n        },\n        {\n          \"name\": \"Hauz Khas Village\",\n          \"placeDetails\": \"Trendy area with cafes, restaurants, and shops\",\n          \"placeImageUrl\": \"[Image URL - replace with actual URL]\",\n          \"ticketPricing\": \"No entry fee\",\n          \"travelTime\": \"2-3 hours\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"theme\": \"Lutyens' Delhi & Museums\",\n      \"locations\": [\n        {\n          \"name\": \"India Gate\",\n          \"placeDetails\": \"War memorial\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/India_Gate.jpg/1280px-India_Gate.jpg\",\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"1-2 hours\"\n        },\n        {\n          \"name\": \"National Museum\",\n          \"placeDetails\": \"Extensive collection of Indian art and artifacts\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/National_Museum_Delhi.jpg/1280px-National_Museum_Delhi.jpg\",\n          \"ticketPricing\": \"INR 20 (Indians), INR 500 (Foreigners)\",\n          \"travelTime\": \"3-4 hours\"\n        },\n        {\n          \"name\": \"Rajpath\",\n          \"placeDetails\": \"Ceremonial boulevard\",\n          \"placeImageUrl\": \"[Image URL - replace with actual URL]\",\n          \"ticketPricing\": \"No entry fee\",\n          \"travelTime\": \"1-2 hours\"\n        }\n      ]\n    },\n    {\n      \"day\": 4,\n      \"theme\": \"Spiritual Exploration & Relaxation\",\n      \"locations\": [\n        {\n          \"name\": \"Akshardham Temple\",\n          \"placeDetails\": \"Magnificent temple complex, water show (check show timings)\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Akshardham_Temple_Delhi.jpg/1280px-Akshardham_Temple_Delhi.jpg\",\n          \"ticketPricing\": \"Free entry (water show is ticketed)\",\n          \"travelTime\": \"3-4 hours\"\n        },\n        {\n          \"name\": \"Lodhi Garden\",\n          \"placeDetails\": \"Peaceful park with historical tombs\",\n          \"placeImageUrl\": \"[Image URL - replace with actual URL]\",\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"2-3 hours\"\n        }\n      ]\n    },\n    {\n      \"day\": 5,\n      \"theme\": \"Departure\",\n      \"locations\": [\n        {\n          \"name\": \"Departure from Delhi\",\n          \"placeDetails\": \"Travel to the airport for your departure.\",\n          \"placeImageUrl\": null,\n          \"ticketPricing\": \"NA\",\n          \"travelTime\": \"Varies depending on location\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Crucial:**  Remember to replace all bracketed placeholders (`[...]`) with actual and accurate information.  Use reliable sources for image URLs, addresses, and pricing.  Hotel and flight prices will vary; use booking sites for up-to-date costs.  Enjoy your Delhi trip!\n"},
            ],
          },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());

  
 