import { useEffect, useState } from 'react'
import ucdLogo from './assets/ucd-logo-transparent.png'
import './App.css'

const services = [
  { icon: '⌂', number: '01', title: 'Homes with character', text: 'Thoughtful residences that feel calm, work beautifully, and hold their value.' },
  { icon: '▦', number: '02', title: 'Commercial that performs', text: 'Workplaces and retail spaces designed for flow, durability, and a stronger brand presence.' },
  { icon: '◇', number: '03', title: 'Development advisory', text: 'From site feasibility through handover, we turn opportunity into a confident plan.' },
]

const process = [
  ['01', 'Listen closely', 'We understand your site, ambition, timeline, and the life or business it needs to support.'],
  ['02', 'Plan precisely', 'Clear scope, budgets, drawings, and milestones make every next step visible.'],
  ['03', 'Build intelligently', 'Disciplined supervision and transparent updates keep detail, quality, and momentum aligned.'],
  ['04', 'Hand over proudly', 'We finish with rigorous checks and a space that is ready for its next chapter.'],
]

const testimonials = [
  ['“The UCD team made a complex build feel remarkably clear. Every decision had a reason.”', 'Private residence client', 'Aurum Villa Court'],
  ['“Their site discipline and finishing standards changed the outcome of our commercial project.”', 'Retail development partner', 'Uday High Street'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dialog, setDialog] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [projects, setProjects] = useState([])
  const [projectLoading, setProjectLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load projects')))
      .then((data) => setProjects(data.projects || []))
      .catch(() => setProjects(fallbackProjects))
      .finally(() => setProjectLoading(false))
  }, [])

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.category === activeFilter)

  const closeMenu = () => setMenuOpen(false)
  const openEnquiry = (project = null) => {
    closeMenu()
    setDialog({ type: 'enquiry', project })
  }

  return (
    <main>
      <nav className="nav-wrap" aria-label="Primary navigation">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="UCD home">
          <img src={ucdLogo} alt="Uday Constructions & Developers" />
          <span><strong>Uday</strong><small>Constructions & Developers</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <i /><i />
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={closeMenu}>Our approach</a>
          <a href="#services" onClick={closeMenu}>Capabilities</a>
          <a href="#projects" onClick={closeMenu}>Selected work</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <button className="nav-cta" onClick={() => openEnquiry()}>Start a project <span>↗</span></button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy reveal">
          <p className="kicker"><span /> Hyderabad · India</p>
          <h1>Spaces built for <em>what’s next.</em></h1>
          <p className="hero-intro">Uday Constructions & Developers brings architecture, engineering, and execution together to shape enduring places.</p>
          <div className="hero-actions">
            <button className="button button-solid" onClick={() => openEnquiry()}>Discuss your project <span>↗</span></button>
            <a className="text-link" href="#projects">Explore our work <span>↓</span></a>
          </div>
          <div className="hero-trust"><div className="avatar-stack"><b>U</b><b>C</b><b>D</b></div><span>Trusted by homeowners,<br />developers, and businesses.</span></div>
        </div>
        <div className="hero-image reveal">
          <div className="image-frame" />
          <article className="hero-note"><p>Our promise</p><strong>Clear thinking.<br />Crafted outcomes.</strong><span>Since 2007</span></article>
          <div className="scroll-mark"><span>Scroll to explore</span><i /></div>
        </div>
      </section>

      <section className="numbers" aria-label="UCD impact">
        <article><strong>18<span>+</span></strong><p>years of practical<br />site experience</p></article>
        <article><strong>42</strong><p>premium projects<br />delivered</p></article>
        <article><strong>96<span>%</span></strong><p>on-time milestone<br />record</p></article>
        <article><strong>01</strong><p>accountable team,<br />from start to finish</p></article>
      </section>

      <section className="about section" id="about">
        <div className="section-label"><span>01</span> The UCD difference</div>
        <div className="about-grid">
          <div><p className="kicker dark"><span /> Building conviction</p><h2>Beautifully considered.<br /><em>Rigorously delivered.</em></h2></div>
          <div className="about-copy"><p>We see construction as a creative, highly coordinated discipline. The result is a better experience on site and a more rewarding space to live, work, or grow in.</p><a className="text-link ink" href="#process">How we work <span>→</span></a></div>
        </div>
        <div className="values-grid">
          <article><span className="value-icon">✦</span><h3>Design-minded</h3><p>We protect the idea in every practical decision, so the finished space feels intentional.</p></article>
          <article><span className="value-icon">⌁</span><h3>Radically clear</h3><p>Cost, scope, timing, and progress are communicated with honesty and rhythm.</p></article>
          <article><span className="value-icon">◎</span><h3>Built to last</h3><p>Quality materials, smart detailing, and proven site systems earn long-term trust.</p></article>
        </div>
      </section>

      <section className="services-section section" id="services">
        <div className="section-label light"><span>02</span> What we do</div>
        <div className="services-header"><h2>One partner.<br /><em>Every possibility.</em></h2><p>Whether you are creating a family home, a workplace, or a neighbourhood, we bring the team and thinking to move it forward.</p></div>
        <div className="service-list">
          {services.map((service) => <article key={service.title} className="service-row"><span className="service-no">{service.number}</span><span className="service-icon">{service.icon}</span><div><h3>{service.title}</h3><p>{service.text}</p></div><button onClick={() => openEnquiry()} aria-label={`Enquire about ${service.title}`}>↗</button></article>)}
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="section-label"><span>03</span> Selected work</div>
        <div className="projects-heading"><h2>Made to make<br /><em>an impression.</em></h2><p>Every project responds to its people, place, and purpose.</p></div>
        <div className="filter-bar" aria-label="Filter projects">
          {['All', 'Residential', 'Commercial', 'Development'].map((filter) => <button key={filter} className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
        </div>
        <div className="project-grid">
          {projectLoading && <p className="loading-copy">Loading our selected work…</p>}
          {filteredProjects.map((project, index) => <article className={`project-card project-card-${index + 1}`} key={project.id}>
            <img src={project.image} alt={project.title} />
            <div className="project-overlay"><span>{project.category}</span><button onClick={() => setDialog({ type: 'project', project })} aria-label={`View ${project.title}`}>↗</button></div>
            <div className="project-name"><h3>{project.title}</h3><p>{project.location} <span>·</span> {project.year}</p></div>
          </article>)}
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="section process-inner"><div className="section-label light"><span>04</span> Our process</div><div className="process-title"><h2>Good work has<br /><em>a clear rhythm.</em></h2><p>We make the journey as considered as the destination.</p></div><div className="process-grid">{process.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>

      <section className="quote-section section"><div className="quote-mark">“</div><div className="quote-content"><blockquote>{testimonials[0][0]}</blockquote><p>{testimonials[0][1]} <span>—</span> {testimonials[0][2]}</p><div className="quote-nav"><button aria-label="Previous testimonial">←</button><button aria-label="Next testimonial">→</button></div></div></section>

      <section className="contact-cta" id="contact"><div><p className="kicker"><span /> Let’s begin</p><h2>Bring us your<br /><em>boldest idea.</em></h2></div><div><p>Tell us a little about your project. We’ll bring a clear head, a practical point of view, and the drive to make it exceptional.</p><button className="button button-light" onClick={() => openEnquiry()}>Start a conversation <span>↗</span></button></div></section>

      <footer><a className="brand footer-brand" href="#home"><img src={ucdLogo} alt="UCD" /><span><strong>Uday</strong><small>Constructions & Developers</small></span></a><div className="footer-note">© {new Date().getFullYear()} Uday Constructions & Developers<br />Built with purpose in Hyderabad.</div><div className="footer-links"><a href="mailto:udayconstructions@gmail.com">Email us</a><a href="https://wa.me/919989270699" target="_blank" rel="noreferrer">WhatsApp</a><a href="#home">Back to top ↑</a></div></footer>

      {dialog?.type === 'enquiry' && <EnquiryModal project={dialog.project} onClose={() => setDialog(null)} />}
      {dialog?.type === 'project' && <ProjectModal project={dialog.project} onClose={() => setDialog(null)} onEnquire={() => setDialog({ type: 'enquiry', project: dialog.project })} />}
    </main>
  )
}

function EnquiryModal({ project, onClose }) {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const submit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    const form = new FormData(event.currentTarget)
    const payload = Object.fromEntries(form.entries())
    payload.projectInterest = project?.title || payload.projectInterest
    try {
      const response = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to send enquiry')
      setStatus('success'); setMessage('Thank you — your enquiry is with our project desk. We’ll be in touch shortly.')
      event.currentTarget.reset()
    } catch (error) { setStatus('error'); setMessage(error.message || 'Something went wrong. Please try again.') }
  }
  return <Modal title="Start a conversation" onClose={onClose}><div className="modal-intro"><p>Share the essentials and our project desk will come back to you with a clear next step.</p>{project && <span className="interest-tag">Interested in: {project.title}</span>}</div><form className="enquiry-form" onSubmit={submit}><label>Your name<input required name="name" placeholder="Your full name" /></label><label>Phone number<input required name="phone" inputMode="tel" placeholder="+91 00000 00000" /></label><label>Email address<input required type="email" name="email" placeholder="you@example.com" /></label><label>Project type<select name="projectType" defaultValue={project?.category || ''}><option value="">Select one</option><option>Residential</option><option>Commercial</option><option>Development</option><option>Other</option></select></label><label className="full">Tell us about your vision<textarea required name="message" rows="4" placeholder="Site location, project scope, or what you have in mind…" /></label><button className="button button-solid full" disabled={status === 'loading'}>{status === 'loading' ? 'Sending…' : 'Send enquiry'} <span>↗</span></button>{message && <p className={`form-message ${status}`}>{message}</p>}</form></Modal>
}

function ProjectModal({ project, onClose, onEnquire }) {
  return <Modal title={project.title} onClose={onClose}><article className="project-modal"><img src={project.image} alt={project.title} /><div><p className="kicker dark"><span /> {project.category}</p><h3>{project.location} · {project.year}</h3><p>{project.description}</p><dl><div><dt>Project type</dt><dd>{project.category}</dd></div><div><dt>Status</dt><dd>{project.status}</dd></div></dl><button className="button button-solid" onClick={onEnquire}>Enquire about this project <span>↗</span></button></div></article></Modal>
}

function Modal({ title, onClose, children }) {
  useEffect(() => { const escape = (event) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape) }, [onClose])
  return <div className="modal-backdrop" onMouseDown={onClose}><section className="modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}><header><div><p className="kicker dark"><span /> UCD project desk</p><h2>{title}</h2></div><button className="close" onClick={onClose} aria-label="Close">×</button></header>{children}</section></div>
}

const fallbackProjects = [
  { id: 1, category: 'Residential', title: 'Aurum Villa Court', location: 'Bengaluru', year: '2025', status: 'In progress', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85', description: 'A private villa community with courtyard living, warm natural materials, and a considered relationship to landscape.' },
  { id: 2, category: 'Commercial', title: 'Uday High Street', location: 'Hyderabad', year: '2024', status: 'Completed', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85', description: 'A street-facing retail destination designed for visibility, flexible tenancy, and confident urban presence.' },
  { id: 3, category: 'Development', title: 'Greenline Enclave', location: 'Telangana', year: '2025', status: 'In progress', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=85', description: 'A plotted community plan centred on access, landscape buffers, and practical phased delivery.' },
]

export default App
