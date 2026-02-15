import "../styles/help.css";
export default function Returns() {
  return (
    <section id="returns" className="support-page">

      <div className="support-header">
        <h1>
          Returns & <span>Refunds</span>
        </h1>

        <p>
          Easy and transparent return
          process for your peace of mind.
        </p>
      </div>


      <div className="support-card">
        <h3>Return Eligibility</h3>

        <ul>
          <li>Product must be unused</li>
          <li>Original packaging required</li>
          <li>Return within 7 days</li>
        </ul>
      </div>


      <div className="support-card">
        <h3>Refund Process</h3>

        <p>
          Refunds are issued within
          5–7 business days after inspection.
        </p>
      </div>


      <div className="support-card">
        <h3>Damaged Products</h3>

        <p>
          Report damaged items within
          48 hours of delivery with photos.
        </p>
      </div>

    </section>
  );
}
