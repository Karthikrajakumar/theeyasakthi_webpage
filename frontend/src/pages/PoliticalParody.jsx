import React from "react";
import { Container } from "react-bootstrap";
import PageTransition from "../PageTransition";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function PoliticalParody() {
  return (
    <PageTransition>
      <Container>
        <div className="detail-page">
          <Link to="/about" className="back-link">
            <FaArrowLeft />
            <span>Back to About</span>
          </Link>

          <h1 className="detail-title">Political Parody - Full Story</h1>

          <div className="detail-content">
            <h3 className="detail-subtitle">Satirical Lens on DMK Politics</h3>
            <p>
              The DMK party has long been a subject of satire and comedy in Tamil Nadu politics. Our platform offers a unique perspective on the party's policies, promises, and actions through the lens of humor and critical analysis. Since its inception, the DMK has positioned itself as a champion of social justice and Tamil cultural preservation. However, the gap between electoral promises and ground reality has widened considerably over the decades, creating an abundant source of satirical material.
            </p>

            <h3 className="detail-subtitle">Documenting Broken Promises</h3>
            <p>
              From broken promises to controversial decisions, we dissect the party's track record with a comedic twist. Our content ranges from memes and short videos to detailed commentary on political events that shape Tamil Nadu's future. The DMK's history includes numerous instances of populist promises that were never fulfilled—from unrealistic welfare schemes to infrastructure projects that existed only in press releases. We document these moments with humor while maintaining factual accuracy, allowing viewers to understand the political landscape through a comedic lens.
            </p>

            <h3 className="detail-subtitle">Satire as Civic Awareness</h3>
            <p>
              We believe in the power of satire as a tool for political awareness. Through laughter, we aim to shed light on important issues and encourage critical thinking among citizens. Our goal is not just to entertain, but to inform and inspire change. Political satire has a long tradition in Tamil culture, dating back to ancient times when court jesters used humor to critique those in power. We continue this legacy by using modern media to reach contemporary audiences.
            </p>

            <h3 className="detail-subtitle">How Parody Exposes Absurdity</h3>
            <p>
              The mechanics of political parody work by exaggerating existing truths to highlight absurdities. When a politician makes a promise they clearly cannot keep, satire amplifies this impossibility to comedic effect. When policies are implemented that contradict previous statements, we showcase the hypocrisy through funny videos and memes. This approach makes complex political issues accessible to the general public, breaking down the jargon and pretense that often surrounds political discourse.
            </p>

            <h3 className="detail-subtitle">Research-Driven Humor</h3>
            <p>
              Our team of writers, video creators, and graphic designers work tirelessly to ensure our content is both hilarious and informative. We conduct extensive research on policy documents, speeches, and public records to ensure our parodies are grounded in reality. We believe that satirizing politics without factual basis is simply mockery, not meaningful commentary. Our commitment to this balance is what sets us apart from other satirical outlets.
            </p>

            <h3 className="detail-subtitle">Audience Impact and Engagement</h3>
            <p>
              The response from our audience has been overwhelming. Thousands of people engage with our content daily, sharing it with friends and family. We've received messages from viewers who say our videos helped them understand complex political issues for the first time. Some have even mentioned that our content inspired them to engage more actively in the political process. This feedback drives us to continue producing high-quality satirical content that educates while entertaining.
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
