import "../styles/help.css";

export default function Help() {
  return (
    <section id="help" className="support-page">

      <div className="support-header">
        <h1>
          Help <span>Center</span>
        </h1>

        <p>
          Find quick answers to common questions
          and get support when you need it.
        </p>
      </div>


      <div className="support-card">
        <h3>Account & Orders</h3>

        <ul>
          <li>How to create and manage your account</li>
          <li>Track your orders in real-time</li>
          <li>Update billing information</li>
          <li>Cancel or modify orders</li>
        </ul>
      </div>


      <div className="support-card">
        <h3>Payments & Security</h3>

        <ul>
          <li>Secure payment processing</li>
          <li>Supported payment methods</li>
          <li>Refund timelines</li>
          <li>Fraud protection</li>
        </ul>
      </div>


      <div className="support-card">
        <h3>Technical Support</h3>

        <ul>
          <li>Website performance issues</li>
          <li>Login problems</li>
          <li>Bug reporting</li>
          <li>Account recovery</li>
        </ul>
      </div>

    </section>
  );
}
