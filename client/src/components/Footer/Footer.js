import React from "react";
import "./Footer.css";
import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isRankPage = location.pathname === "/rankings";

  return (
    <footer className={`${isRankPage ? "rank-footer" : "footer"}`}>
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Baller</h2>
        </div>
        <div className="footer-sections">
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li>
                <span>About Us</span>
              </li>
              <li>
                <span>Contact</span>
              </li>
              <li>
                <span>Careers</span>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li>
                <span>Help Center</span>
              </li>
              <li>
                <span>Community Guidelines</span>
              </li>
              <li>
                <span>Terms of Service</span>
              </li>
              <li>
                <span>Privacy Policy</span>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li>
                <span>Docs</span>
              </li>
              <li>
                <span>Blog</span>
              </li>
              <li>
                <span>Github Repository</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2024 Baller. <span>Privacy Policy</span> |{" "}
          <span>Terms of Service</span> | <span>Cookies Settings</span>
        </p>
        <div className="footer-social">
          <span>
            <FacebookFilled />
          </span>
          <span>
            <InstagramFilled />
          </span>
          <span>
            <TwitterCircleFilled />
          </span>
          <span>
            <LinkedinFilled />
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
