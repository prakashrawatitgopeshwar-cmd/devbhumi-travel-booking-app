"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  Compass,
  FileText,
  LayoutDashboard,
  MapPinned,
  Menu,
  Mountain,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Store,
  Users,
  X,
  XCircle,
} from "lucide-react";

type AdminData = {
  users: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  }[];
  providers: {
    id: string;
    userId: string;
    businessName: string;
    type: string;
    description: string;
    phone: string;
    status: string;
    createdAt: string;
    owner: string;
    adminNote?: string;
  }[];
  bookings: {
    id: string;
    userId: string;
    kind: string;
    destination: string;
    startDate: string;
    endDate?: string;
    guests: number;
    contact: string;
    status: string;
    estimatedPrice: number;
    createdAt: string;
  }[];
  audit: { at: string; actor: string; action: string; detail: string }[];
};

const nav = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "#overview",
    section: "MAIN",
  },
  { label: "Users", icon: Users, href: "#users" },
  { label: "Provider approvals", icon: Store, href: "#providers", badge: true },
  {
    label: "Destinations",
    icon: Compass,
    href: "/destinations",
    section: "CONTENT",
  },
  { label: "District & location data", icon: MapPinned, href: "/locations" },
  { label: "Trip planner", icon: Mountain, href: "/planner" },
  { label: "Trip reports", icon: FileText, href: "/trip-report" },
  { label: "Stays & cabs", icon: Store, href: "/stays" },
  {
    label: "Bookings",
    icon: CalendarDays,
    href: "#bookings",
    section: "OPERATIONS",
  },
  { label: "Activity log", icon: Activity, href: "#activity" },
];

function formatDate(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}
function money(value: number) {
  return `₹${(Number(value) || 0).toLocaleString("en-IN")}`;
}
function statusClass(status: string) {
  if (["approved", "confirmed", "completed"].includes(status))
    return "admin-status success";
  if (["rejected", "cancelled"].includes(status)) return "admin-status danger";
  if (status === "changes_requested") return "admin-status warning";
  return "admin-status pending";
}

export default function AdminPage() {
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [search, setSearch] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [active, setActive] = useState("Overview");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/providers", {
        cache: "no-store",
      });
      const json = await response.json();
      if (!response.ok)
        throw new Error(
          json.error ||
            "Admin access required. Please sign in with an administrator account.",
        );
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load admin data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const providers = data?.providers ?? [];
  const users = data?.users ?? [];
  const bookings = data?.bookings ?? [];
  const audit = data?.audit ?? [];
  const pendingProviders = providers.filter((p) => p.status === "pending");
  const filteredUsers = useMemo(
    () =>
      users.filter((u) =>
        `${u.name} ${u.email} ${u.role}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [users, search],
  );
  const filteredBookings = useMemo(
    () =>
      bookings.filter((b) =>
        `${b.destination} ${b.kind} ${b.status} ${b.contact}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [bookings, search],
  );

  async function decide(
    id: string,
    status: "approved" | "rejected" | "changes_requested",
  ) {
    const provider = providers.find((p) => p.id === id);
    if (!provider) return;
    const note =
      window.prompt(`Optional note for ${provider.businessName}:`, "") ?? "";
    if (
      status === "rejected" &&
      !window.confirm(`Reject ${provider.businessName}'s application?`)
    )
      return;
    setBusyId(id);
    try {
      const response = await fetch("/api/admin/providers", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, status, note }),
      });
      const json = await response.json();
      if (!response.ok)
        throw new Error(json.error || "Could not update application.");
      await load();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : "Update failed.");
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="admin-app" id="overview">
      <aside className={`admin-sidebar ${mobileNav ? "is-open" : ""}`}>
        <div className="admin-brand">
          <span className="admin-brand-mark">
            <Mountain size={27} />
          </span>
          <span>
            <strong>DevBhoomi</strong>
            <small>HIMALAYAN HORIZONS</small>
          </span>
          <button
            className="admin-close-mobile"
            aria-label="Close menu"
            onClick={() => setMobileNav(false)}
          >
            <X size={18} />
          </button>
        </div>
        <div className="admin-workspace">
          <span className="admin-avatar">DH</span>
          <span>
            <b>Platform Admin</b>
            <small>Operations workspace</small>
          </span>
          <ChevronDown size={15} />
        </div>
        <nav className="admin-nav" aria-label="Admin navigation">
          {nav.map((item) => (
            <div key={item.label}>
              {item.section && (
                <p className="admin-nav-label">{item.section}</p>
              )}
              {item.href.startsWith("#") ? (
                <a
                  href={item.href}
                  onClick={() => {
                    setActive(item.label);
                    setMobileNav(false);
                  }}
                  className={`admin-nav-link ${active === item.label ? "active" : ""}`}
                >
                  <item.icon size={17} />
                  <span>{item.label}</span>
                  {item.badge && pendingProviders.length > 0 && (
                    <b className="admin-nav-badge">{pendingProviders.length}</b>
                  )}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="admin-nav-link"
                  onClick={() => setMobileNav(false)}
                >
                  <item.icon size={17} />
                  <span>{item.label}</span>
                  <ArrowRight size={13} className="admin-nav-arrow" />
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-help-icon">
            <CircleHelp size={18} />
          </div>
          <div>
            <b>Need a hand?</b>
            <small>Review admin setup notes</small>
          </div>
          <Link href="/about" aria-label="Help and about">
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="admin-sidebar-foot">
          <ShieldCheck size={14} /> Protected admin workspace
        </div>
      </aside>

      {mobileNav && (
        <button
          className="admin-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileNav(false)}
        />
      )}

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-menu-toggle"
              aria-label="Open menu"
              onClick={() => setMobileNav(true)}
            >
              <Menu size={21} />
            </button>
            <div>
              <span className="admin-breadcrumb">Workspace /</span>{" "}
              <b>Dashboard</b>
            </div>
          </div>
          <div className="admin-topbar-actions">
            <label className="admin-search">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users, bookings..."
                aria-label="Search dashboard data"
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </label>
            <button
              className="admin-icon-button"
              aria-label="Refresh data"
              onClick={() => void load()}
            >
              <RefreshCw size={17} />
            </button>
            <button
              className="admin-icon-button admin-bell"
              aria-label="Notifications"
            >
              <Bell size={17} />
              <i />
            </button>
            <div className="admin-user">
              <span className="admin-user-avatar">A</span>
              <span>
                <b>Administrator</b>
                <small>Platform owner</small>
              </span>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        <div className="admin-content">
          <div className="admin-page-heading">
            <div>
              <p className="admin-eyebrow">FRIDAY, 02 OCTOBER 2026</p>
              <h1>
                Good day, Admin <span>✦</span>
              </h1>
              <p>
                Here’s what’s happening across your DevBhoomi travel platform.
              </p>
            </div>
            <button
              className="admin-refresh-button"
              onClick={() => void load()}
            >
              <RefreshCw size={15} /> Refresh overview
            </button>
          </div>

          {error && (
            <div className="admin-alert">
              <ShieldCheck size={19} />
              <div>
                <b>Admin data is protected</b>
                <p>{error}</p>
                <Link href="/login">
                  Go to login <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
          {loading && (
            <div className="admin-loading">
              <RefreshCw size={18} className="admin-spin" /> Loading live
              dashboard data…
            </div>
          )}

          <section className="admin-kpi-grid" aria-label="Platform statistics">
            <article className="admin-kpi">
              <div className="admin-kpi-top">
                <span>Total users</span>
                <span className="admin-kpi-icon green">
                  <Users size={18} />
                </span>
              </div>
              <strong>
                {data ? users.length.toLocaleString("en-IN") : "—"}
              </strong>
              <div className="admin-kpi-foot">
                <span className="admin-kpi-note">Registered accounts</span>
                <span className="admin-kpi-trend">
                  <ArrowDownRight size={13} /> Live
                </span>
              </div>
            </article>
            <article className="admin-kpi">
              <div className="admin-kpi-top">
                <span>Pending providers</span>
                <span className="admin-kpi-icon amber">
                  <Store size={18} />
                </span>
              </div>
              <strong>
                {data ? pendingProviders.length.toLocaleString("en-IN") : "—"}
              </strong>
              <div className="admin-kpi-foot">
                <span className="admin-kpi-note">Awaiting review</span>
                <a href="#providers">
                  Review queue <ArrowRight size={12} />
                </a>
              </div>
            </article>
            <article className="admin-kpi">
              <div className="admin-kpi-top">
                <span>Booking requests</span>
                <span className="admin-kpi-icon violet">
                  <CalendarDays size={18} />
                </span>
              </div>
              <strong>
                {data ? bookings.length.toLocaleString("en-IN") : "—"}
              </strong>
              <div className="admin-kpi-foot">
                <span className="admin-kpi-note">All recorded requests</span>
                <span className="admin-kpi-trend">
                  <Activity size={13} /> Live
                </span>
              </div>
            </article>
            <article className="admin-kpi">
              <div className="admin-kpi-top">
                <span>Destination records</span>
                <span className="admin-kpi-icon teal">
                  <MapPinned size={18} />
                </span>
              </div>
              <strong>13</strong>
              <div className="admin-kpi-foot">
                <span className="admin-kpi-note">District master list</span>
                <Link href="/locations">
                  View directory <ArrowRight size={12} />
                </Link>
              </div>
            </article>
          </section>

          <section className="admin-middle-grid">
            <article className="admin-panel admin-chart-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>Booking overview</h2>
                  <p>Distribution of recorded booking requests by status</p>
                </div>
                <span className="admin-period-pill">All records</span>
              </div>
              {data && bookings.length > 0 ? (
                <>
                  <div
                    className="admin-bar-chart"
                    aria-label="Booking counts by status"
                  >
                    {(["requested", "confirmed", "cancelled"] as const).map(
                      (status, i) => {
                        const count = bookings.filter(
                          (b) => b.status === status,
                        ).length;
                        const max = Math.max(
                          1,
                          ...(
                            ["requested", "confirmed", "cancelled"] as const
                          ).map(
                            (s) =>
                              bookings.filter((b) => b.status === s).length,
                          ),
                        );
                        return (
                          <div className="admin-bar-group" key={status}>
                            <div className="admin-bar-track">
                              <div
                                className={`admin-bar-fill bar-${i}`}
                                style={{
                                  height: `${Math.max(5, (count / max) * 100)}%`,
                                }}
                              />
                              <span>{count}</span>
                            </div>
                            <small>
                              {status[0].toUpperCase() + status.slice(1)}
                            </small>
                          </div>
                        );
                      },
                    )}
                  </div>
                  <div className="admin-chart-legend">
                    <span>
                      <i className="legend-green" /> Requested
                    </span>
                    <span>
                      <i className="legend-blue" /> Confirmed
                    </span>
                    <span>
                      <i className="legend-orange" /> Cancelled
                    </span>
                  </div>
                </>
              ) : (
                <div className="admin-empty-chart">
                  <BarChart3 size={28} />
                  <b>No booking trends yet</b>
                  <span>
                    Booking activity will appear here when requests are
                    recorded.
                  </span>
                </div>
              )}
            </article>
            <article className="admin-panel admin-quick-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>Quick actions</h2>
                  <p>Common platform tasks</p>
                </div>
              </div>
              <div className="admin-quick-actions">
                <a href="#providers">
                  <span className="quick-icon amber">
                    <CheckCircle2 size={17} />
                  </span>
                  <span>
                    <b>Review providers</b>
                    <small>{pendingProviders.length} awaiting review</small>
                  </span>
                  <ArrowRight size={15} />
                </a>
                <Link href="/locations">
                  <span className="quick-icon teal">
                    <MapPinned size={17} />
                  </span>
                  <span>
                    <b>Explore location data</b>
                    <small>District directory</small>
                  </span>
                  <ArrowRight size={15} />
                </Link>
                <Link href="/trip-report">
                  <span className="quick-icon violet">
                    <FileText size={17} />
                  </span>
                  <span>
                    <b>Open trip report</b>
                    <small>View report builder</small>
                  </span>
                  <ArrowRight size={15} />
                </Link>
                <a href="#bookings">
                  <span className="quick-icon blue">
                    <BookOpenCheck size={17} />
                  </span>
                  <span>
                    <b>Manage requests</b>
                    <small>Review booking records</small>
                  </span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </article>
          </section>

          <section className="admin-panel admin-table-panel" id="providers">
            <div className="admin-panel-heading">
              <div>
                <h2>Provider applications</h2>
                <p>Review partners before their services can be published.</p>
              </div>
              <span className="admin-count-pill">
                {pendingProviders.length} pending
              </span>
            </div>
            {data && providers.length > 0 ? (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>BUSINESS / OWNER</th>
                      <th>TYPE</th>
                      <th>SUBMITTED</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providers
                      .filter((p) =>
                        `${p.businessName} ${p.owner} ${p.type} ${p.status}`
                          .toLowerCase()
                          .includes(search.toLowerCase()),
                      )
                      .slice(0, 10)
                      .map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div className="admin-business-cell">
                              <span className="admin-business-avatar">
                                {p.businessName.slice(0, 1).toUpperCase()}
                              </span>
                              <span>
                                <b>{p.businessName}</b>
                                <small>{p.owner}</small>
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="admin-type-text">{p.type}</span>
                          </td>
                          <td>{formatDate(p.createdAt)}</td>
                          <td>
                            <span className={statusClass(p.status)}>
                              {p.status.replace("_", " ")}
                            </span>
                          </td>
                          <td>
                            {p.status === "pending" ? (
                              <div className="admin-row-actions">
                                <button
                                  disabled={busyId === p.id}
                                  className="admin-approve"
                                  onClick={() => void decide(p.id, "approved")}
                                  aria-label={`Approve ${p.businessName}`}
                                >
                                  <CheckCircle2 size={15} /> Approve
                                </button>
                                <button
                                  disabled={busyId === p.id}
                                  className="admin-reject"
                                  onClick={() => void decide(p.id, "rejected")}
                                  aria-label={`Reject ${p.businessName}`}
                                >
                                  <XCircle size={15} />
                                </button>
                              </div>
                            ) : (
                              <span className="admin-muted-action">
                                Reviewed
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="admin-empty-state">
                <span>
                  <Store size={22} />
                </span>
                <b>No provider applications yet</b>
                <p>New partner applications will appear here for review.</p>
              </div>
            )}
            {providers.length > 10 && (
              <p className="admin-table-foot">
                Showing 10 of {providers.length} provider applications.
              </p>
            )}
          </section>

          <section className="admin-bottom-grid">
            <article className="admin-panel" id="bookings">
              <div className="admin-panel-heading">
                <div>
                  <h2>Recent booking requests</h2>
                  <p>Latest requests recorded by the platform.</p>
                </div>
                <span className="admin-count-pill">
                  {filteredBookings.length} total
                </span>
              </div>
              {data && filteredBookings.length > 0 ? (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>DESTINATION / TYPE</th>
                        <th>DATE</th>
                        <th>GUESTS</th>
                        <th>EST. PRICE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...filteredBookings]
                        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                        .slice(0, 6)
                        .map((b) => (
                          <tr key={b.id}>
                            <td>
                              <b>{b.destination}</b>
                              <small className="admin-table-sub">
                                {b.kind}
                              </small>
                            </td>
                            <td>{formatDate(b.startDate)}</td>
                            <td>{b.guests}</td>
                            <td>{money(b.estimatedPrice)}</td>
                            <td>
                              <span className={statusClass(b.status)}>
                                {b.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="admin-empty-inline">
                  No booking requests found.
                </div>
              )}
            </article>
            <article className="admin-panel" id="users">
              <div className="admin-panel-heading">
                <div>
                  <h2>Recent users</h2>
                  <p>Registered platform accounts.</p>
                </div>
                <span className="admin-count-pill">
                  {filteredUsers.length} total
                </span>
              </div>
              {data && filteredUsers.length > 0 ? (
                <div className="admin-user-list">
                  {[...filteredUsers]
                    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                    .slice(0, 5)
                    .map((u) => (
                      <div className="admin-user-row" key={u.id}>
                        <span className="admin-user-initial">
                          {(u.name || u.email).slice(0, 1).toUpperCase()}
                        </span>
                        <span className="admin-user-info">
                          <b>{u.name || "Unnamed user"}</b>
                          <small>{u.email}</small>
                        </span>
                        <span className="admin-role-tag">{u.role}</span>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="admin-empty-inline">No users found.</div>
              )}
            </article>
          </section>

          <section className="admin-panel admin-activity-panel" id="activity">
            <div className="admin-panel-heading">
              <div>
                <h2>Recent admin activity</h2>
                <p>
                  Audit events available from the current application store.
                </p>
              </div>
              <Activity size={18} className="admin-panel-muted-icon" />
            </div>
            {data && audit.length > 0 ? (
              <div className="admin-activity-list">
                {audit.slice(0, 6).map((event, i) => (
                  <div className="admin-activity-row" key={`${event.at}-${i}`}>
                    <span className="admin-activity-dot">
                      <Activity size={14} />
                    </span>
                    <span className="admin-activity-copy">
                      <b>{event.action.replaceAll("_", " ")}</b>
                      <small>
                        {event.detail} · Actor: {event.actor}
                      </small>
                    </span>
                    <time>{formatDate(event.at)}</time>
                  </div>
                ))}
              </div>
            ) : (
              <div className="admin-empty-inline">
                No audit events have been recorded yet.
              </div>
            )}
          </section>
          <footer className="admin-footer">
            <span>© 2026 DevBhoomi Himalayan Horizons</span>
            <span>
              <ShieldCheck size={14} /> Admin actions are protected by
              server-side role checks.
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}
