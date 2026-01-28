import React from "react";
import { Container } from "react-bootstrap";
import PageTransition from "../PageTransition";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function OutrageEconomy() {
  return (
    <PageTransition>
      <Container>
        <div className="detail-page">
          <Link to="/about" className="back-link">
            <FaArrowLeft />
            <span>Back to About</span>
          </Link>

          <h1 className="detail-title">Outrage Economy - The Reality Show</h1>

          <div className="detail-content">
            <h3 className="detail-subtitle">Outrage as Political Currency</h3>
            <p>
              In modern politics, manufactured outrage has become a currency more valuable than policy. We explore how political parties leverage controversy and sensationalism to maintain relevance and secure funding. The 'Outrage Economy' is a concept we've extensively studied—it refers to the systematic creation and amplification of public anger to distract from governance failures and policy shortcomings. Political parties have become expert at identifying sensitive topics, escalating tensions, and channeling public emotion for electoral gain.
            </p>

            <h3 className="detail-subtitle">Amplifying Controversy Mechanics</h3>
            <p>
              From social media storms to staged protests, we dissect the mechanics of political outrage. Our analysis shows how genuine concerns are often hijacked and amplified for political gain, while real issues get buried under the noise. Take any contentious issue—be it language, religion, caste, or cultural matters—and you'll find political parties strategically amplifying existing tensions. They do this through coordinated social media campaigns, inflammatory speeches, and careful media management. The goal is simple: keep people angry and emotionally invested while actual governance takes a backseat.
            </p>

            <h3 className="detail-subtitle">Media Literacy Against Manufactured Drama</h3>
            <p>
              Through our content, we aim to help viewers distinguish between authentic political discourse and manufactured drama. We believe that understanding these tactics is essential for developing a more mature and effective democracy. Media literacy is crucial in today's age. People need to understand how their emotions are being manipulated by political actors. We provide viewers with the tools to identify manufactured outrage, to question the narratives being presented, and to demand better from their leaders.
            </p>

            <h3 className="detail-subtitle">Hijacking the News Cycle</h3>
            <p>
              The mechanics of the Outrage Economy are fascinating from a sociological perspective. When a politician or party feels threatened by negative news coverage or declining popularity, they create a new controversy to dominate the news cycle. This simple tactic has proven remarkably effective. Traditional media, desperate for viewership, eagerly covers any controversy. Social media algorithms amplify divisive content because it generates engagement. Before long, the entire public discourse is dominated by the manufactured issue, and the original problem—poor governance, corruption, failed policies—is completely forgotten.
            </p>

            <h3 className="detail-subtitle">Documented Outrage Playbooks</h3>
            <p>
              We've documented numerous instances of orchestrated outrage campaigns. Some are subtle, involving carefully planted stories and strategic leaks. Others are blatant, featuring inflammatory speeches and public confrontations. What's remarkable is how effective these campaigns are. Millions of people get drawn into emotional debates about topics that have been artificially elevated in importance. Meanwhile, critical issues affecting their daily lives—healthcare, education, infrastructure, employment—receive minimal attention.
            </p>

            <h3 className="detail-subtitle">The Money Behind Outrage</h3>
            <p>
              Our investigation into the Outrage Economy also reveals the financial incentives driving this behavior. Political parties raise enormous funds during periods of heightened tension. Advertisers pay premium rates for media placements during controversial periods. Religious and cultural organizations benefit from increased donations when emotions run high. The entire ecosystem profits from outrage, creating a perverse incentive structure that rewards sensationalism over substantive governance. We use satire and critical analysis to expose this toxic dynamic and encourage viewers to think critically about the political narratives they consume.
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
