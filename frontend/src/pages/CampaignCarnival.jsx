import React from "react";
import { Container } from "react-bootstrap";
import PageTransition from "../PageTransition";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function CampaignCarnival() {
  return (
    <PageTransition>
      <Container>
        <div className="detail-page">
          <Link to="/about" className="back-link">
            <FaArrowLeft />
            <span>Back to About</span>
          </Link>

          <h1 className="detail-title">Campaign Carnival - Behind the Curtain</h1>

          <div className="detail-content">
            <h3 className="detail-subtitle">The Election Spectacle</h3>
            <p>
              Election season transforms into a grand spectacle where political promises flow like rivers and accountability evaporates like morning dew. We document this fascinating dance of democracy with a critical yet humorous eye. Every five years, Tamil Nadu witnesses an elaborate circus where candidates and parties mobilize enormous resources to influence voter behavior. The spectacle includes carefully choreographed rallies, strategic media buys, celebrity endorsements, and grassroots campaigns designed to create an illusion of popular support.
            </p>

            <h3 className="detail-subtitle">Behind the Rallies and Media</h3>
            <p>
              From extravagant campaign rallies to carefully crafted media appearances, we expose the machinery behind political campaigns. Watch as we analyze the gap between campaign rhetoric and actual governance, all while maintaining our signature satirical approach. Campaign rallies are masterpieces of orchestration—they feature elaborate stage setups, professional sound systems, celebrity performances, and carefully selected audiences. Yet most of the promises made at these rallies vanish the moment the election results are announced.
            </p>

            <h3 className="detail-subtitle">Tracking Promises vs. Reality</h3>
            <p>
              Our coverage includes tracking campaign promises, monitoring public spending during elections, and highlighting the absurdities that often accompany political campaigns. We believe informed voters make better decisions, and humor makes information more digestible. We maintain detailed databases of election promises and track their implementation rates. The statistics are often staggering—many parties have implementation rates below 10% for their election promises. This stark reality forms the basis of our satirical content.
            </p>

            <h3 className="detail-subtitle">The Theater of Campaign Narratives</h3>
            <p>
              The 'Campaign Carnival' series specifically focuses on exposing the theatrical nature of political campaigns. We examine how politicians craft their public image, how they target specific demographics with tailored messages, and how they use social media to amplify their narrative. The irony is often lost on voters who genuinely believe that politicians will deliver on promises made during the campaign season. We use satire to highlight this fundamental disconnect between campaign promises and post-election reality.
            </p>

            <h3 className="detail-subtitle">Hypocrisy as Satire Fuel</h3>
            <p>
              One of the most amusing aspects of campaigns is the rhetoric employed by different parties. Each claims to be the sole savior of the state and the people. Each accuses the others of corruption and mismanagement. Yet when elected, they often follow similar patterns of governance. This hypocrisy is a goldmine for satirical commentary. We create content that juxtaposes campaign promises with actual governance outcomes, allowing viewers to draw their own conclusions about political sincerity.
            </p>

            <h3 className="detail-subtitle">Evolving, Costly Campaign Tactics</h3>
            <p>
              We've also documented the evolution of campaign strategies over the years. What was once limited to rallies and print media has now expanded to include sophisticated digital campaigns, influencer endorsements, and micro-targeted advertising. The budget for campaigns has increased exponentially, yet the quality of governance hasn't improved proportionally. This misalignment is something we regularly highlight in our content. The carnival aspect comes from the realization that massive resources are being spent on creating an illusion rather than on actually improving public services.
            </p>
          </div>
        </div>

        <style>{`
          .detail-page {
            padding: 40px 0 80px;
            max-width: 900px;
            margin: 0 auto;
          }

          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 30px;
            padding: 10px 20px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 25px;
            color: #fff;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
          }

          .back-link:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateX(-5px);
            color: #fff;
          }

          .back-link svg {
            transition: transform 0.3s ease;
          }

          .back-link:hover svg {
            transform: translateX(-4px);
          }

          .detail-title {
            font-size: 2.5rem;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #ffffff, #fecaca);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            line-height: 1.3;
            font-weight: 700;
          }

          .detail-content p {
            font-size: 1.15rem;
            line-height: 1.9;
            margin-bottom: 25px;
            color: rgba(255, 255, 255, 0.95);
            text-align: justify;
          }

          .detail-subtitle {
            font-size: 1.1rem;
            margin: 24px 0 8px;
            font-weight: 700;
            color: #fff;
            letter-spacing: 0.3px;
          }

          .detail-content p:last-child {
            margin-bottom: 0;
          }

          @media (max-width: 768px) {
            .detail-page {
              padding: 20px 0 60px;
            }

            .detail-title {
              font-size: 1.8rem;
              margin-bottom: 30px;
            }

            .detail-content p {
              font-size: 1rem;
              text-align: left;
            }

            .detail-subtitle {
              font-size: 1rem;
              margin: 20px 0 6px;
            }
          }
        `}</style>
      </Container>
    </PageTransition>
  );
}
