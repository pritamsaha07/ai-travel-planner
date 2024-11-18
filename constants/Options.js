import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: <MaterialIcons name="flight" size={24} color="black" />,
    people: "1 people",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tande,",
    icon: <FontAwesome5 name="glass-cheers" size={24} color="black" />,
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving individuals",
    icon: <Entypo name="home" size={24} color="black" />,
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: <FontAwesome6 name="sailboat" size={24} color="black" />,
    people: "5 to 10 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: <FontAwesome name="money" size={24} color="black" />,
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: <FontAwesome6 name="money-bill-wheat" size={24} color="black" />,
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't woory about cost",
    icon: <FontAwesome6 name="money-bill-trend-up" size={24} color="black" />,
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for {location}, for {totalDays} Days and {totalNights} Nights for {traveler} with a {budget} budget with a destination Image url, Flight deatils, Flight Price with a Booking urls, Hotels options list with HotelName, Hotel address, Hotel Image url, rating and Places to visit nearby iwith place Name, place details, Place Image Url, ticket pricing, Time to travel each of the loctaion with each day plan with best time to visit in JSON format. ";
