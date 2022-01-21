import "./footer.component.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="line-separator"></div>
      <div className="inner-footer-container">
        <div className="footer-info-container">
          <div className="footer-info-title">
            <h3>Creaven</h3>
          </div>
          <div className="footer-info-list">
            {["About Creaven", "Our Store", "Privacy Policy"].map(
              (item, index) => (
                <div className="footer-info-item" key={index}>
                  <p>{item}</p>
                </div>
              )
            )}
          </div>
        </div>
        <div className="footer-info-container">
          <div className="footer-info-title">
            <h3>Customer Care</h3>
          </div>
          <div className="footer-info-list">
            {[
              "How to Order",
              "Payment",
              "Refund",
              "Delivery",
              "Contact Us",
            ].map((item, index) => (
              <div className="footer-info-item" key={index}>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="empty-container"></div>
        <div className="socials-container">
          <div className="socials-title">
            <h3>Follow Us</h3>
          </div>
          <div className="socials-icons">
            <a href="http://localhost:3000/" target="_blank" rel="noreferrer">
              <span className="pi pi-twitter icon"></span>
            </a>
            <a href="http://localhost:3000/" target="_blank" rel="noreferrer">
              <span className="pi pi-facebook icon"></span>
            </a>
            <a href="http://localhost:3000/" target="_blank" rel="noreferrer">
              <span className="pi pi-youtube icon"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
