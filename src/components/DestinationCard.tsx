import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Destination } from "@/data/destinations";
export default function DestinationCard({item}:{item:Destination}) { return <Link href={`/destinations/${item.slug}`} className="destination-card"><div className="destination-image"><Image src={item.image} alt={`${item.name}, ${item.district}, Uttarakhand`} fill sizes="(max-width:700px) 80vw, (max-width:1100px) 35vw, 18vw" /><span className="district-pill"><MapPin size={12}/>{item.district}</span><span className="card-arrow"><ArrowUpRight size={17}/></span></div><div className="destination-copy"><div><h3>{item.name}</h3><p>{item.description}</p></div><span className="best-time">{item.bestTime}</span></div></Link> }
