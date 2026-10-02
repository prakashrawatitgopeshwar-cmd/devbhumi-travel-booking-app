export type Destination = {
  slug: string; name: string; district: string; category: string[];
  description: string; image: string; bestTime: string; verified: boolean;
};
const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;
export const districts = [
  "Almora","Bageshwar","Chamoli","Champawat","Dehradun","Haridwar",
  "Nainital","Pauri Garhwal","Pithoragarh","Rudraprayag","Tehri Garhwal",
  "Udham Singh Nagar","Uttarkashi"
];
export const destinations: Destination[] = [
  {slug:"nainital",name:"Nainital",district:"Nainital",category:["Family","Nature","Weekend"],description:"Lake views, forested hills and a lively Himalayan town.",image:photo("photo-1500530855697-b586d89ba3ee"),bestTime:"March–June, September–November",verified:false},
  {slug:"ranikhet",name:"Ranikhet",district:"Almora",category:["Family","Couple","Nature","Relaxation"],description:"Quiet pine forests, open mountain views and Kumaoni heritage.",image:photo("photo-1470770841072-f978cf4d019e"),bestTime:"March–June, September–November",verified:false},
  {slug:"mukteshwar",name:"Mukteshwar",district:"Nainital",category:["Couple","Nature","Photography"],description:"Orchards, ridge walks and wide Himalayan panoramas.",image:photo("photo-1464822759023-fed622ff2c3b"),bestTime:"March–June, October–December",verified:false},
  {slug:"almora",name:"Almora",district:"Almora",category:["Culture","Family","Food"],description:"A historic hill town known for Kumaoni culture and local markets.",image:photo("photo-1519681393784-d120267933ba"),bestTime:"March–June, September–November",verified:false},
  {slug:"badrinath",name:"Badrinath",district:"Chamoli",category:["Spiritual","Pilgrimage"],description:"A major Himalayan pilgrimage destination. Check official opening and road updates before travel.",image:photo("photo-1548013146-72479768bada"),bestTime:"Seasonal; check official notices",verified:false},
  {slug:"kedarnath",name:"Kedarnath",district:"Rudraprayag",category:["Spiritual","Pilgrimage","Adventure"],description:"A high-altitude pilgrimage reached by a demanding mountain journey.",image:photo("photo-1561361513-2d000a50f0dc"),bestTime:"Seasonal; check official notices",verified:false},
  {slug:"auli",name:"Auli",district:"Chamoli",category:["Adventure","Snow","Nature"],description:"Mountain scenery, winter sports and cable-car views when operating.",image:photo("photo-1519681393784-d120267933ba"),bestTime:"Winter for snow; spring for views",verified:false},
  {slug:"valley-of-flowers",name:"Valley of Flowers",district:"Chamoli",category:["Nature","Trekking","Wildlife"],description:"A seasonal alpine valley. Access, permits and opening dates must be checked.",image:photo("photo-1470252649378-9c29740c9fa8"),bestTime:"Seasonal monsoon opening; verify locally",verified:false},
  {slug:"rishikesh",name:"Rishikesh",district:"Dehradun",category:["Adventure","Spiritual","Wellness"],description:"Riverfront experiences, yoga, cafes and adventure activities.",image:photo("photo-1500534623283-312a4c8e3f4f"),bestTime:"February–April, September–November",verified:false},
  {slug:"haridwar",name:"Haridwar",district:"Haridwar",category:["Spiritual","Pilgrimage","Culture"],description:"A sacred Ganga city with ghats, temples and evening rituals.",image:photo("photo-1519681393784-d120267933ba"),bestTime:"October–March; festival dates vary",verified:false},
  {slug:"pithoragarh",name:"Pithoragarh",district:"Pithoragarh",category:["Nature","Culture","Adventure"],description:"A Kumaon gateway with valleys, mountain viewpoints and local culture.",image:photo("photo-1464822759023-fed622ff2c3b"),bestTime:"March–June, September–November",verified:false},
  {slug:"tehri-lake",name:"Tehri Lake",district:"Tehri Garhwal",category:["Adventure","Family","Water"],description:"Reservoir landscapes and operator-led water activities when available.",image:photo("photo-1501785888041-af3ef285b470"),bestTime:"March–June, September–November",verified:false}
];
export const tripCategories = [
  {label:"Family Trips",value:"Family",icon:"users",tone:"peach"},
  {label:"Couple Getaways",value:"Couple",icon:"heart",tone:"pink"},
  {label:"Friends Trips",value:"Friends",icon:"users-round",tone:"yellow"},
  {label:"Solo Travel",value:"Solo",icon:"user-round",tone:"purple"},
  {label:"Adventure",value:"Adventure",icon:"mountain",tone:"green"},
  {label:"Religious",value:"Spiritual",icon:"landmark",tone:"orange"},
  {label:"Nature & Wildlife",value:"Nature",icon:"leaf",tone:"mint"},
  {label:"Weekend Trips",value:"Weekend",icon:"calendar-days",tone:"blue"}
];
