import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Reveal from './Reveal';
import './Contact.css';


const EJS_SERVICE  = 'service_0rshjk6';   // e.g. 'portfolio_service'
const EJS_TEMPLATE = 'template_binqpxv';  // e.g. 'template_abc123'
const EJS_KEY      = '6XRJ_u22qQ81GD0R7';   // e.g. 'aBcDeFgHiJkL'

export default function Contact() {
  const [fromEmail, setFromEmail] = useState('');
  const [message,   setMessage]   = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSend = async () => {
    if (!fromEmail || !fromEmail.includes('@')) {
      setStatus('error');
      return;
    }
    if (!message.trim()) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name: 'Portfolio Contact',
          email:     fromEmail,
          message:   message,
        },
        EJS_KEY,
      );
      setStatus('sent');
      setFromEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact" id="contact" aria-label="Contact">
      <div className="contact__inner">
        <Reveal>
          <h2 className="contact__heading">
            Tell me about your project<span className="contact__accent">.</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="contact__sub">I'll tell you what it should feel like.</p>
        </Reveal>

        <Reveal delay={200}>
          <div className="contact__form">
            <input
              id="contact-email"
              type="email"
              className="contact__input"
              placeholder="your@email.com"
              value={fromEmail}
              onChange={(e) => { setFromEmail(e.target.value); setStatus('idle'); }}
              aria-label="Your email address"
              autoComplete="email"
            />

            <textarea
              id="contact-message"
              className="contact__textarea"
              placeholder="Tell me what you want to build."
              rows={5}
              value={message}
              onChange={(e) => { setMessage(e.target.value); setStatus('idle'); }}
              aria-label="Your message"
            />

            <button
              type="button"
              className="contact__btn"
              id="contact-send-btn"
              onClick={handleSend}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>

            {status === 'sent' && (
              <p className="contact__msg contact__msg--sent">
                Sent. I'll be in touch.
              </p>
            )}
            {status === 'error' && (
              <p className="contact__msg contact__msg--error">
                Something went wrong. Try emailing directly.
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={350}>
          <footer className="contact__footer">
            <a
              href="https://github.com/Miracle004"
              className="contact__link"
              target="_blank"
              rel="noopener noreferrer"
              id="github-link"
            >
              github.com/Miracle004
            </a>
            <span className="contact__dot" aria-hidden="true">·</span>
            <a
              href="mailto:officialtosin16@gmail.com"
              className="contact__link"
              id="email-link"
            >
              officialtosin16@gmail.com
            </a>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
