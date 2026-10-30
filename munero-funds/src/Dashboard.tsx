
import { useEffect, useState } from "react";
import "./Dashboard.css";

export type Customer = {
  customerId: string;
  name: string;
  totalSavings: string;
  monthlyPayment: string;
  status: string;
};

type Payment = {
  "Customer ID": string;
  "Payment Date": string;
  Amount: string;
  Status: string;
};

type DashboardProps = {
  customer: Customer;
  onLogout: () => void;
};

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwh5TVnh7NPtNPX5gd9aB_pzpda4RZsvdPyY-4NGwhs-NPM--JjZz2pjhsu7QtiniOsBg/exec";

function Dashboard({ customer, onLogout }: DashboardProps) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPayments() {
      try {
        setLoading(true);
        setError("");

        const url =
          `${SCRIPT_URL}?action=payments&customerId=${encodeURIComponent(customer.customerId)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Unable to load payments.");
        }

        setPayments(data.payments || []);
      } catch (err) {
        setError("Unable to load payment history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, [customer.customerId]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <a href="/" className="dashboard-logo">
          MUNERO <span>FUNDS</span>
        </a>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        <p className="dashboard-label">CUSTOMER PORTAL</p>

        <h1>Welcome, {customer.name}!</h1>

        <p className="dashboard-description">
          Your savings information, all in one place.
        </p>

        <div className="dashboard-grid">
          <div className="dashboard-card savings-card">
            <p>Total Savings</p>
            <h2>₹ {customer.totalSavings}</h2>
            <span>Your total savings</span>
          </div>

          <div className="dashboard-card">
            <p>Monthly Payment</p>
            <h2>₹ {customer.monthlyPayment}</h2>
            <span>Your monthly contribution</span>
          </div>

          <div className="dashboard-card">
            <p>Customer ID</p>
            <h2>{customer.customerId}</h2>
            <span>Your unique customer ID</span>
          </div>

          <div className="dashboard-card">
            <p>Account Status</p>
            <h2 className="status-value">{customer.status}</h2>
            <span>Your current account status</span>
          </div>
        </div>

        <section className="dashboard-info">
          <h2>Customer Profile</h2>

          <div className="profile-grid">
            <div className="profile-item">
              <p>Customer Name</p>
              <h3>{customer.name}</h3>
            </div>

            <div className="profile-item">
              <p>Customer ID</p>
              <h3>{customer.customerId}</h3>
            </div>

            <div className="profile-item">
              <p>Account Status</p>
              <h3>{customer.status}</h3>
            </div>

            <div className="profile-item">
              <p>Savings Plan</p>
              <h3>My Savings</h3>
            </div>
          </div>
        </section>

        <section className="dashboard-info">
          <h2>Payment History</h2>

          <div className="payment-table">
            <div className="payment-row payment-heading">
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            {loading && (
              <p className="payment-empty">
                Loading payment history...
              </p>
            )}

            {!loading && error && (
              <p className="payment-empty">{error}</p>
            )}

            {!loading && !error && payments.length === 0 && (
              <p className="payment-empty">
                No payment records available yet.
              </p>
            )}

            {!loading && !error && payments.map((payment, index) => (
              <div className="payment-row" key={index}>
                <span>{payment["Payment Date"]}</span>
                <span>₹ {payment.Amount}</span>
                <span>{payment.Status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-note">
          <h3>Your Savings, Your Future.</h3>
          <p>
            Thank you for being a part of Munero Funds.
            Contact our support team if you need assistance.
          </p>
        </section>
      </main>

      <footer className="dashboard-footer">
        <h3>MUNERO FUNDS</h3>
        <p>Clarity in Every Step.</p>
        <small>© 2026 Munero Funds. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default Dashboard;
