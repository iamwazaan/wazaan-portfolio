import {
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  ChevronRight,
  CodeXml,
  Download,
  Mail,
  MapPin,
  Phone,
  Play,
} from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "./components/BrandLogo";
import { CertificateModal } from "./components/CertificateModal";
import { ContactModal } from "./components/ContactModal";
import { HeroVideoBackdrop } from "./components/HeroVideoBackdrop";
import { PageMotion } from "./components/PageMotion";
import { Reveal } from "./components/Reveal";
import { SmoothScroll } from "./components/SmoothScroll";
import { Magnet } from "./components/react-bits/Magnet";
import { SplitText } from "./components/react-bits/SplitText";
import { credentials, projects, skillGroups, type Credential } from "./data";

const capabilities = [
  {
    title: "Routing and connectivity",
    body: "VLANs, OSPF, EIGRP, BGP, NAT, DHCP, QoS and IPsec.",
  },
  {
    title: "Security and access",
    body: "Cisco ASA, FortiGate, VPNs, AAA, RADIUS, IPS and SSL inspection.",
  },
  {
    title: "Systems and visibility",
    body: "Windows Server, Linux, VMware, Wireshark, Nmap, Azure and AWS.",
  },
];

const portraitUrl =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85";
const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();

function App() {
  const [selectedCredential, setSelectedCredential] =
    useState<Credential | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SmoothScroll />
      <PageMotion />
      <HeroVideoBackdrop />

      <header className="site-nav">
        <div className="container nav-inner">
          <a
            className="brand"
            href="#profile"
            aria-label="Wazaan Wazeer, home"
          >
            <BrandLogo />
          </a>

          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#profile">Profile</a>
            <a href="#education">Education</a>
            <a href="#credentials">
              Credentials<sup>{credentials.length}</sup>
            </a>
            <a href="#experience">Experience</a>
            <a href="#projects">
              Projects<sup>{projects.length}</sup>
            </a>
            <a href="#contact">Contact</a>
          </nav>

          <a
            className="nav-download font-recepts"
            href="/Wazaan-Wazeer-CV.pdf"
            download="Wazaan-Wazeer-CV.pdf"
          >
            <Download size={16} strokeWidth={1.5} aria-hidden="true" />
            Download CV
          </a>
        </div>
        <span className="nav-progress" aria-hidden="true" />
      </header>

      <main id="main" className="page-content">
        <section id="profile" className="profile-section">
          <div className="hero container">
            <div className="hero-top">
              <div className="service-list" aria-label="Areas of practice">
                {[
                  "Network administration",
                  "Network security",
                  "Cloud and systems",
                ].map((service, index) => (
                  <Reveal order={index + 1} key={service}>
                    / {service}
                  </Reveal>
                ))}
              </div>
              <Reveal className="hero-intro" order={3}>
                <p>
                  I configure and troubleshoot Cisco networks, firewalls,
                  Windows Server, Linux and cloud connectivity.
                </p>
              </Reveal>
            </div>

            <div className="hero-bottom">
              <div className="hero-copy">
                <Reveal order={2}>
                  <p className="hero-badge">
                    CCNA certified network professional
                  </p>
                </Reveal>
                <h1 aria-label="Wazaan Wazeer. Network Administrator.">
                  <SplitText
                    className="hero-title-line"
                    text="Wazaan Wazeer."
                    tag="span"
                    trigger="load"
                    startDelay={0.08}
                  />
                  <SplitText
                    className="hero-title-line"
                    text="Network"
                    tag="span"
                    trigger="load"
                    startDelay={0.24}
                  />
                  <SplitText
                    className="hero-title-line"
                    text="Administrator."
                    tag="span"
                    trigger="load"
                    startDelay={0.38}
                  />
                </h1>
              </div>

              <div className="hero-card-motion">
                <Reveal className="hero-contact-card glass-panel" order={4}>
                  <img
                    className="hero-portrait"
                    src={portraitUrl}
                    alt="Wazaan, Network & Security Engineer"
                    width="80"
                    height="96"
                  />
                  <div>
                    <h2>Get in touch with Wazaan</h2>
                    <p>Network and security engineer</p>
                    <Magnet padding={40} strength={5} maxOffset={7}>
                      <button
                        type="button"
                        onClick={() => setContactOpen(true)}
                      >
                        Email Wazaan
                        <ChevronRight
                          size={14}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </button>
                    </Magnet>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          <aside className="scrub-spacer" aria-hidden="true" />

          <div id="technical-profile" className="section technical-section">
            <div className="container technical-shell">
              <div className="technical-top">
                <Reveal className="section-badge" order={1}>
                  Technical profile
                </Reveal>
                <Reveal className="technical-intro" order={2}>
                  <p>
                    Routing, access control and visibility turn infrastructure
                    into a network that teams can trust.
                  </p>
                </Reveal>
              </div>

              <div className="technical-bottom">
                <Reveal className="technical-statement" order={2}>
                  <h2>
                    Cisco routes.
                    <br />
                    FortiGate controls.
                  </h2>
                  <p>
                    My foundation spans enterprise routing, switching, VPNs,
                    secure access, network visibility and systems
                    administration.
                  </p>
                  <div className="technical-actions">
                    <Magnet padding={44} strength={5} maxOffset={8}>
                      <a className="button button-primary" href="#projects">
                        View lab work
                        <ChevronRight
                          size={14}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </a>
                    </Magnet>
                  </div>
                </Reveal>

                <ol className="capability-list glass-panel">
                  {capabilities.map((capability, index) => (
                    <li key={capability.title}>
                      <Reveal order={index + 1}>
                        <span className="capability-number num">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <div className="capability-heading">
                            <h3>{capability.title}</h3>
                            <ChevronRight
                              size={16}
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          </div>
                          <p>{capability.body}</p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div id="skills" className="section skills-section">
            <div className="container">
              <Reveal as="header" className="section-intro" order={0}>
                <h2>BGP to Metasploit.</h2>
                <p>Current and legacy CV skills.</p>
              </Reveal>

              <dl className="skills-index glass-panel">
                {skillGroups.map((group, index) => (
                  <Reveal order={index % 4} key={group.name}>
                    <dt>{group.name}</dt>
                    <dd>{group.items.join(", ")}.</dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="education" className="section education-section">
          <div className="container">
            <Reveal as="header" className="section-intro" order={0}>
              <h2>My education qualifications.</h2>
              <p>
                Academic foundations and focused training across networking,
                security and infrastructure.
              </p>
            </Reveal>

            <div className="education-grid">
              <Reveal
                as="article"
                className="education-entry glass-panel"
                order={1}
              >
                <div className="education-entry-heading">
                  <h3>WP/HR/Veyangalla Muslim Maha Vidyalaya</h3>
                  <p className="education-date num">2011–2022</p>
                </div>
                <ul className="ruled-list">
                  <li>Ordinary Level (7A, 2B) – 2021 (2022)</li>
                </ul>
              </Reveal>

              <Reveal
                as="article"
                className="education-entry glass-panel"
                order={2}
              >
                <div className="education-entry-heading">
                  <h3>ATN Campus</h3>
                  <p className="education-date num">2024–2025</p>
                </div>
                <ul className="ruled-list">
                  <li>Cisco Certified Network Associate (CCNA)</li>
                  <li>Cisco Certified Network Professional (CCNP)</li>
                  <li>Certified Ethical Hacker (CEH)</li>
                  <li>Diploma in Network Engineering</li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="credentials" className="section credentials-section">
          <div className="container">
            <Reveal as="header" className="section-intro" order={0}>
              <h2>Credentials you can inspect.</h2>
              <p>
                Professional certification, practical simulation and focused
                training across the network stack.
              </p>
            </Reveal>

            <div className="credential-index">
              {credentials.map((credential, index) => (
                <Reveal
                  className={`credential-row${credential.preview ? "" : " credential-row-text"}`}
                  order={index % 4}
                  key={credential.title}
                >
                  {credential.preview ? (
                    <figure className="credential-preview">
                      <img
                        src={credential.preview}
                        alt=""
                        width="360"
                        height="255"
                        loading="lazy"
                      />
                    </figure>
                  ) : null}

                  <div className="credential-copy">
                    <h3>{credential.title}</h3>
                    {credential.issuer && <p>{credential.issuer}</p>}
                  </div>

                  <div className="credential-meta">
                    <p>{credential.kind}</p>
                    {credential.date && <p>{credential.date}</p>}
                    {credential.status && <p>{credential.status}</p>}
                  </div>

                  <div className="credential-actions">
                    {credential.document || credential.verificationUrl ? (
                      <>
                        <button
                          type="button"
                          className="text-button"
                          onClick={() => setSelectedCredential(credential)}
                        >
                          {credential.document
                            ? "View certificate"
                            : "View credential"}
                        </button>
                        {credential.document && (
                          <a href={credential.document} download>
                            Download PDF
                          </a>
                        )}
                        {credential.verificationUrl && (
                          <a
                            href={credential.verificationUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Verify on Credly
                          </a>
                        )}
                      </>
                    ) : (
                      <span>Listed training</span>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <div className="container">
            <Reveal as="header" className="section-intro" order={0}>
              <h2>Active Tech Networks, 2025.</h2>
              <p>
                Practical infrastructure support across routing, systems,
                security and cloud connectivity.
              </p>
            </Reveal>

            <div className="experience-layout">
              <Reveal className="experience-record glass-panel" order={1}>
                <p className="record-date num">February 2025 to August 2025</p>
                <h3>Network Administrator Trainee</h3>
                <p className="record-organisation">Active Tech Networks</p>
                <ul>
                  <li>
                    Configured and maintained Cisco routers, switches, servers,
                    DNS and Active Directory.
                  </li>
                  <li>
                    Implemented and supported VPNs, wireless networks, backups,
                    monitoring and cloud-networking solutions.
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="container">
            <Reveal as="header" className="section-intro" order={0}>
              <h2>From RADIUS to routed firewalls.</h2>
              <p>
                Hands-on training projects across access control, FortiGate and
                Cisco ASA.
              </p>
            </Reveal>

            <div className="project-index">
              {projects.map((project, index) => (
                <Reveal
                  as="article"
                  className="project-row"
                  order={index}
                  key={project.title}
                >
                  <div className="project-marker">
                    <span className="num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>Lab project</span>
                  </div>
                  <div className="project-copy">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul className="project-core" aria-label="Core technologies">
                      {project.technologies.slice(0, 4).map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  </div>
                  <details className="project-scope">
                    <summary>Technical scope</summary>
                    <p className="technology-list">
                      {project.technologies.join(", ")}.
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container">
            <Reveal as="header" className="contact-heading" order={0}>
              <h2>Open to network roles.</h2>
              <p>
                Contact Wazaan directly for Network Administrator and Network
                Security Administrator opportunities.
              </p>
            </Reveal>

            <div className="contact-layout">
              <Reveal className="contact-primary glass-panel" order={1}>
                <h3>Wazaan Wazeer</h3>
                <p>Network Administrator</p>
                <address>
                  <a href="tel:+94725369500">
                    <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
                    +94 72 536 9500
                  </a>
                  <a href="mailto:wazaanwazeer@gmail.com">
                    <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
                    wazaanwazeer@gmail.com
                  </a>
                  <span>
                    <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
                    25/8, Isnapulla Lane, Dharga Town
                  </span>
                </address>

                <Magnet
                  className="contact-form-trigger"
                  padding={48}
                  strength={5}
                  maxOffset={8}
                >
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => setContactOpen(true)}
                  >
                    <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
                    Email Wazaan
                  </button>
                </Magnet>

                <div className="social-links font-recepts">
                  <a
                    href="https://linkedin.com/in/iamwazaan"
                    target="_blank"
                    rel="noreferrer"
                    data-social="linkedin"
                  >
                    <BriefcaseBusiness
                      size={16}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/iamwazaan"
                    target="_blank"
                    rel="noreferrer"
                    data-social="github"
                  >
                    <CodeXml size={16} strokeWidth={1.7} aria-hidden="true" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://instagram.com/iamwazaan"
                    target="_blank"
                    rel="noreferrer"
                    data-social="instagram"
                  >
                    <Camera size={16} strokeWidth={1.7} aria-hidden="true" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@iamwazaan"
                    target="_blank"
                    rel="noreferrer"
                    data-social="youtube"
                  >
                    <Play size={17} strokeWidth={1.7} aria-hidden="true" />
                    <span>YouTube</span>
                  </a>
                  <a
                    href="https://www.credly.com/users/iamwazaan"
                    target="_blank"
                    rel="noreferrer"
                    data-social="credly"
                  >
                    <BadgeCheck
                      size={17}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <span>Credly</span>
                  </a>
                </div>
              </Reveal>

              <Reveal className="references" order={2}>
                <h3>Professional references</h3>
                <div className="reference-list">
                  <article>
                    <h4>Kulushan Ledrick</h4>
                    <p>Network Engineer, Broadband Solutions</p>
                    <a href="tel:+94757880735">+94 75 788 0735</a>
                    <a href="mailto:kulushanledrick17x@gmail.com">
                      kulushanledrick17x@gmail.com
                    </a>
                  </article>
                  <article>
                    <h4>Haran Mamankaran</h4>
                    <p>SOC Manager, Sysco Labs</p>
                    <a href="tel:+94766330550">+94 76 633 0550</a>
                    <a href="mailto:haran.mamankaran@sysco.com">
                      haran.mamankaran@sysco.com
                    </a>
                  </article>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a
            className="brand"
            href="#profile"
            aria-label="Wazaan Wazeer, back to the top"
          >
            <BrandLogo />
          </a>
          <p>Network administration, security and cloud.</p>
        </div>
      </footer>

      <CertificateModal
        credential={selectedCredential}
        onClose={() => setSelectedCredential(null)}
      />
      <ContactModal
        open={contactOpen}
        endpoint={formspreeEndpoint}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}

export default App;
