import Link from "next/link";
import Image from "next/image";
import { Search, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <span className="brand-mark">
          <Image
            src="/logo.png"
            alt="DevBhoomi Himalayan Horizon Logo"
            width={40}
            height={40}
            priority
          />
        </span>
        <span>
          <strong>DevBhoomi</strong>
          <b>Himalayan Horizon</b>
          <small>Explore · Plan · Travel · Experience Uttarakhand</small>
        </span>
      </Link>

      <nav className="main-nav">
        <Link href="/">Home</Link>
        <Link href="/destinations">Destinations</Link>
        <Link href="/planner">Trip Planner</Link>
        <Link href="/trip-report">Trip Report</Link>
        <Link href="/locations">All Districts</Link>
        <Link href="/provider">Partner</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/stays">Stays</Link>
        <Link href="/cabs">Cabs</Link>
        <Link href="/experiences">Experiences</Link>
        <Link href="/about">About</Link>
      </nav>

      <div className="header-actions">
        <Link className="search-button" href="/destinations" aria-label="Search destinations">
          <Search size={20} />
        </Link>
        <Link className="btn btn-outline btn-small" href="/login">
          Login
        </Link>
        <Link className="btn btn-primary btn-small" href="/register">
          Sign Up
        </Link>
        <button className="mobile-menu" aria-label="Menu">
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
}