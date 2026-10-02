import { destinations, districts } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";
export default async function DestinationsPage({searchParams}:{searchParams:Promise<{district?:string;style?:string}>}) {
 const params=await searchParams;
 const list=destinations.filter(d=>(!params.district||d.district===params.district)&&(!params.style||d.category.includes(params.style)));
 return <div className="page-shell"><p className="eyebrow">THIRTEEN DISTRICTS · ONE STATE</p><h1 className="page-title">Explore Uttarakhand</h1><p className="page-intro">Discover destinations by interest, travel style and district. Photo choices and destination details are starter content and require editorial verification before production publication.</p><div className="district-filter"><a href="/destinations">All districts</a>{districts.map(d=><a key={d} href={`/destinations?district=${encodeURIComponent(d)}`}>{d}</a>)}</div><div className="page-destination-grid">{list.map(d=><DestinationCard key={d.slug} item={d}/>)}</div>{list.length===0&&<p>No matching destinations in the current starter dataset.</p>}</div>
}
