"use client";
import { useState } from "react";
import { MapPin, CalendarDays, Users, CarFront, ArrowRight, Route } from "lucide-react";
import { districts } from "@/data/destinations";
export default function TripPlannerForm(){
 const [from,setFrom]=useState("Almora"); const [to,setTo]=useState("Ranikhet"); const [category,setCategory]=useState("Family"); const [mode,setMode]=useState("Self Drive"); const [days,setDays]=useState("3"); const [month,setMonth]=useState("Any month"); const [mileage,setMileage]=useState("15"); const [fuel,setFuel]=useState("100"); const [result,setResult]=useState("");
 function submit(e:React.FormEvent){e.preventDefault();setResult(`Your ${days}-day ${category.toLowerCase()} trip from ${from} to ${to} is ready to configure. Add stops in the full planner to calculate a Mapbox route, real distance, travel time, tolls and fuel. This starter does not invent distance or toll prices.`);}
 return <form className="planner-form" onSubmit={submit}>
  <div className="planner-tabs"><span className="tab-active"><CarFront size={17}/> Plan Trip</span><a href="/destinations"><MapPin size={17}/> Find Destination</a><a href="/stays"><span>▣</span> Find Stays</a><a href="/cabs"><CarFront size={17}/> Book Cab</a></div>
  <div className="planner-grid">
   <label><span>From</span><div className="input-icon"><MapPin size={18}/><input value={from} onChange={e=>setFrom(e.target.value)} required placeholder="Starting point in Uttarakhand"/></div></label>
   <label><span>To</span><div className="input-icon"><MapPin size={18}/><input value={to} onChange={e=>setTo(e.target.value)} required placeholder="Destination e.g. Ranikhet"/></div></label>
   <label><span>Trip category</span><div className="input-icon"><Users size={18}/><select value={category} onChange={e=>setCategory(e.target.value)}>{["Family","Couple","Friends","Solo","Senior Citizens","Adventure","Spiritual","Nature","Photography","Budget","Luxury"].map(x=><option key={x}>{x}</option>)}</select></div></label>
   <label><span>Travel mode</span><div className="input-icon"><CarFront size={18}/><select value={mode} onChange={e=>setMode(e.target.value)}>{["Self Drive","Private Cab Sedan","Private Cab SUV","Sharing Cab per seat","Bike","EV"].map(x=><option key={x}>{x}</option>)}</select></div></label>
   <label><span>Duration</span><div className="input-icon"><CalendarDays size={18}/><select value={days} onChange={e=>setDays(e.target.value)}>{["2","3","5","7","10","14"].map(x=><option key={x} value={x}>{x} days</option>)}</select></div></label>
   <label><span>Travel month</span><div className="input-icon"><CalendarDays size={18}/><select value={month} onChange={e=>setMonth(e.target.value)}>{["Any month","January","February","March","April","May","June","July","August","September","October","November","December"].map(x=><option key={x}>{x}</option>)}</select></div></label>
   <label><span>Vehicle mileage (km/l)</span><input className="plain-input" type="number" min="1" max="100" value={mileage} onChange={e=>setMileage(e.target.value)}/></label>
   <label><span>Fuel price ₹/litre</span><input className="plain-input" type="number" min="1" value={fuel} onChange={e=>setFuel(e.target.value)}/></label>
  </div>
  <div className="planner-actions"><p><Route size={17}/> Live route, actual KM, tolls and fuel totals appear after map and data integrations are configured.</p><button className="btn btn-primary" type="submit">Plan My Trip <ArrowRight size={17}/></button></div>
  {result && <div className="planner-result" role="status">{result}<div><a className="btn btn-outline btn-small" href="/account">Save enquiry</a></div></div>}
 </form>
}
