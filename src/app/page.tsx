import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Route,
  CarFront,
  Camera,
  Heart,
  Users,
  Mountain,
  Landmark,
  Leaf,
  CalendarDays,
  UserRound,
  UsersRound,
} from "lucide-react";
import { destinations, tripCategories } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";
import TripPlannerForm from "@/components/TripPlannerForm";
const icons: Record<string, React.ReactNode> = {
  users: <Users />,
  heart: <Heart />,
  "users-round": <UsersRound />,
  "user-round": <UserRound />,
  mountain: <Mountain />,
  landmark: <Landmark />,
  leaf: <Leaf />,
  "calendar-days": <CalendarDays />,
};
const benefits = [
  {
    icon: <ShieldCheck />,
    title: "Destination information",
    text: "Uttarakhand-focused content with verification status clearly shown.",
  },
  {
    icon: <Route />,
    title: "Smart Trip Planner",
    text: "Plan a route and prepare for real distance, costs and travel time integrations.",
  },
  {
    icon: <CarFront />,
    title: "Stays & cabs",
    text: "Partner-based accommodation and transport enquiries.",
  },
  {
    icon: <Camera />,
    title: "Local experiences",
    text: "Culture, food, nature and activities across the state.",
  },
];
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">DISCOVER THE REAL</div>
          <h1>Uttarakhand</h1>
          <p className="hero-kicker">
            Mountains&nbsp; • &nbsp;Pilgrimage&nbsp; • &nbsp;Nature&nbsp; •
            &nbsp;Culture&nbsp; • &nbsp;Experiences
          </p>
          <p className="hero-desc">
            Plan your perfect trip with destination information, stays, cabs,
            local experiences and smart travel insights.
          </p>
          <div className="hero-buttons">
            <Link className="btn btn-primary" href="/planner">
              <CarFront size={17} /> Start Trip Planner <ArrowRight size={16} />
            </Link>
            <Link className="btn btn-glass" href="/destinations">
              Explore Destinations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <div className="search-wrap">
        <TripPlannerForm />
      </div>
      <section className="section category-section">
        <div className="section-head">
          <h2>Popular Trip Categories</h2>
          <Link href="/planner">
            Personalise your trip <ArrowRight size={15} />
          </Link>
        </div>
        <div className="category-grid">
          {tripCategories.map((c) => (
            <Link
              key={c.value}
              href={`/destinations?style=${encodeURIComponent(c.value)}`}
              className={`category-card ${c.tone}`}
            >
              {icons[c.icon]}
              <b>{c.label}</b>
            </Link>
          ))}
        </div>
      </section>
      <section className="section destinations-section">
        <div className="section-head">
          <h2>Top Uttarakhand Destinations</h2>
          <Link href="/destinations">
            View all destinations <ArrowRight size={15} />
          </Link>
        </div>
        <div className="destination-grid">
          {destinations.slice(0, 10).map((item) => (
            <DestinationCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
      <section className="why-section">
        <div className="why-inner">
          <h2>Why Travel with DevBhoomi Himalayan Horizon</h2>
          <div className="benefit-grid">
            {benefits.map((b) => (
              <div className="benefit" key={b.title}>
                <span className="benefit-icon">{b.icon}</span>
                <div>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
