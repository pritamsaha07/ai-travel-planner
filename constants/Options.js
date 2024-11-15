import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
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