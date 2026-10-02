import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">
            <Image
              src="/logo.png"
              alt="DevBhoomi Himalayan Horizon Logo"
              width={100}
              height={100}
            />
            <span>DevBhoomi Himalayan Horizon</span>
          </div>
          <p>Explore Uttarakhand. Experience the Himalayas.</p>
          <small>
            Destination facts, operating details and availability must be
            verified before booking.
          </small>
        </div>
        <div>
          <b>Explore</b>
          <Link href="/destinations">Destinations</Link>
          <Link href="/planner">Smart Trip Planner</Link>
          <Link href="/experiences">Experiences</Link>
        </div>
        <div>
          <b>Travel services</b>
          <Link href="/stays">Stays</Link>
          <Link href="/cabs">Cabs</Link>
          <Link href="/account">My Trip</Link>
        </div>
        <div>
          <b>Support</b>
          <Link href="/about">About us</Link>
          <Link href="/admin">Admin portal</Link>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} DevBhoomi Himalayan Horizon · Uttarakhand,
        India
      </div>
    </footer>
  );
}