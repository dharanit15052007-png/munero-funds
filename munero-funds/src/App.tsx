
import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";

type Announcement = {
  "Announcement ID": string;
  Title: string;
  Message: string;
  Date: string;
  Status: string;
};

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw2a8jaXtO2dUSWiMGWiEZIg1_YMhaGOVmjtRzhxMqSwUTdE_4bC7eW4mAtp_eJsIiLYw/exec";

function App() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const callbackName = "muneroCallback";

    const handleData = (data: Announcement[]) => {
      if (Array.isArray(data)) {
        setAnnouncements(data);
        setError("");
      } else {
        setError("Unable to load announcements.");
      }
      setLoading(false);
    };

    (window as any)[callbackName] = handleData;

    const script = document.createElement("script");
    script.src = `${SCRIPT_URL}?callback=${callbackName}`;

    script.onerror = () => {
      setError("Announcements could not be loaded.");
      setLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      script.remove();
      delete (window as any)[callbackName];
    };
  }, []);

  if (window.location.pathname === "/login") {
    return <Login />;
  }

  return (
    <div className="app">
      <header className="header">
        <a className="logo" href="#home">
          MUNERO<span> FUNDS</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#announcements">Announcements</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#contact">Contact</a>
          <a href="/login">Login</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">WELCOME TO MUNERO FUNDS</p>
            <h1>Your Savings,<br />Made Simple.</h1>
            <p className="hero-description">
              Explore savings information, discover your plans,
              and stay informed with important updates — all in one place.
            </p>
            <a href="#about" className="primary-btn">
              Discover Munero <span>→</span>
            </a>
          </div>

          <div className="hero-card">
            <div className="card-icon">M</div>
            <p className="card-label">A smarter way to stay informed</p>
            <h2>Clarity in every step.</h2>
            <div className="card-line"></div>
            <p className="card-note">
              Simple information. Clear updates. One platform.
            </p>
          </div>
        </section>

        <section className="about section" id="about">
          <p className="eyebrow">WHO WE ARE</p>
          <h2>A Clearer Way to Save.</h2>
          <p className="section-description">
            Munero Funds brings savings information and important
            updates together in one simple platform. We aim to make
            every detail clear, accessible, and easy to understand.
          </p>

          <div className="feature-grid">
            <article className="feature-card">
              <span>01</span>
              <h3>Simple Information</h3>
              <p>Understand important savings details with ease.</p>
            </article>

            <article className="feature-card">
              <span>02</span>
              <h3>Useful Updates</h3>
              <p>Stay informed through the latest announcements.</p>
            </article>

            <article className="feature-card">
              <span>03</span>
              <h3>One Convenient Place</h3>
              <p>Find key information in one organised platform.</p>
            </article>
          </div>
        </section>

        <section className="announcements section" id="announcements">
          <p className="eyebrow">STAY INFORMED</p>
          <h2>What's New at Munero Funds?</h2>
          <p className="section-description">
            Find the latest announcements, important notices,
            and updates in one place.
          </p>

          <div className="announcement-list">
            {loading && <p>Loading announcements...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && announcements.length === 0 && (
              <p>No announcements available right now.</p>
            )}

            {announcements.map((item) => (
              <article
                className="announcement-card"
                key={item["Announcement ID"]}
              >
                <div className="announcement-mark">M</div>
                <div>
                  <p className="announcement-date">{item.Date}</p>
                  <h3>{item.Title}</h3>
                  <p>{item.Message}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-section section" id="dashboard">
          <p className="eyebrow">YOUR ACCOUNT</p>
          <h2>My Dashboard</h2>
          <p className="section-description">
            Your savings overview and account information in one place.
          </p>

          <div className="dashboard-grid">
            <article className="dashboard-card">
              <span>Total Savings</span>
              <h3>₹0.00</h3>
              <p>Your total savings amount</p>
            </article>

            <article className="dashboard-card">
              <span>Monthly Payment</span>
              <h3>₹0.00</h3>
              <p>Your monthly contribution</p>
            </article>

            <article className="dashboard-card">
              <span>Next Payment Date</span>
              <h3>Not Set</h3>
              <p>Your upcoming payment date</p>
            </article>

            <article className="dashboard-card">
              <span>Customer ID</span>
              <h3>MF0001</h3>
              <p>Demo customer ID</p>
            </article>

            <article className="dashboard-card">
              <span>Savings Plan</span>
              <h3>My Savings</h3>
              <p>Demo savings plan</p>
            </article>

            <article className="dashboard-card">
              <span>Account Status</span>
              <h3>Demo</h3>
              <p>Sample account information</p>
            </article>
          </div>

          <div className="dashboard-profile">
            <h3>Customer Profile</h3>
            <p><strong>Name:</strong> Demo Customer</p>
            <p><strong>Customer ID:</strong> MF0001</p>
            <p><strong>Email:</strong> Not Connected</p>
            <p><strong>Phone:</strong> Not Connected</p>
          </div>

          <div className="dashboard-history">
            <h3>Payment History</h3>
            <div className="payment-heading">
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            <p className="payment-empty">
              No payment records available.
            </p>
          </div>
        </section>

        <section className="contact section" id="contact">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>We're Here to Help.</h2>
          <p className="section-description">
            Have questions about our savings plans?
            Contact our team for more information.
          </p>

          <div className="contact-details">
            <div>
              <h3>Email</h3>
              <p>support@munerofunds.com</p>
            </div>
            <div>
              <h3>Phone</h3>
              <p>Contact details coming soon</p>
            </div>
            <div>
              <h3>Office</h3>
              <p>Address coming soon</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <a className="footer-logo" href="#home">MUNERO FUNDS</a>
        <p>Clarity in Every Step.</p>
        <small>© 2026 Munero Funds. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default App;
