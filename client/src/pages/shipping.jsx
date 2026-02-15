import "../styles/help.css";
export default function Shipping() {
  return (
    <section id="shipping" className="support-page">

      <div className="support-header">
        <h1>
          Shipping <span>Policy</span>
        </h1>

        <p>
          Learn how we process and deliver
          your orders safely and on time.
        </p>
      </div>


      <div className="support-card">
        <h3>Processing Time</h3>

        <p>
          Orders are processed within
          24–48 business hours after payment
          confirmation.
        </p>
      </div>


      <div className="support-card">
        <h3>Delivery Time</h3>

        <ul>
          <li>Local: 2–4 business days</li>
          <li>National: 3–7 business days</li>
          <li>International: 7–14 business days</li>
        </ul>
      </div>


      <div className="support-card">
        <h3>Shipping Partners</h3>

        <p>
          We work with trusted courier
          services to ensure secure delivery.
        </p>
      </div>

    </section>
  );
}
