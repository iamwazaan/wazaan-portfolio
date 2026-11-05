import { CheckCircle, Mail, Send, X } from 'lucide-react'
import { type FormEvent, useEffect, useRef, useState } from 'react'

type ContactModalProps = {
  open: boolean
  endpoint?: string
  onClose: () => void
}

type SubmissionState =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error'
  | 'unconfigured'

const directEmail = 'wazaanwazeer@gmail.com'

export function ContactModal({
  open,
  endpoint,
  onClose,
}: ContactModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !open) return

    returnFocusRef.current = document.activeElement as HTMLElement
    if (!dialog.open) dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFrame = window.requestAnimationFrame(() =>
      firstInputRef.current?.focus(),
    )

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
      returnFocusRef.current?.focus()
      setSubmissionState('idle')
    }
  }, [open])

  if (!open) return null

  const configured = Boolean(
    endpoint?.startsWith('https://formspree.io/f/'),
  )

  const close = () => {
    dialogRef.current?.close()
    onClose()
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    if (!configured || !endpoint) {
      const subject = String(data.get('subject') ?? 'Portfolio enquiry')
      const body = [
        `Name: ${String(data.get('name') ?? '')}`,
        `Reply email: ${String(data.get('email') ?? '')}`,
        '',
        String(data.get('message') ?? ''),
      ].join('\n')

      setSubmissionState('unconfigured')
      window.location.href = `mailto:${directEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      return
    }

    setSubmissionState('submitting')

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Form submission failed')
      form.reset()
      setSubmissionState('success')
    } catch {
      setSubmissionState('error')
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="contact-form-dialog"
      data-lenis-prevent
      aria-labelledby="contact-form-title"
      aria-describedby="contact-form-description"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        close()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <div className="contact-form-shell">
        <header className="contact-form-header">
          <div>
            <h2 id="contact-form-title">Email Wazaan</h2>
            <p id="contact-form-description">
              Tell me about the role, project, or network challenge you have in
              mind.
            </p>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Close contact form"
            onClick={close}
          >
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </header>

        {submissionState === 'success' ? (
          <div className="contact-form-success" role="status">
            <CheckCircle size={30} strokeWidth={1.5} aria-hidden="true" />
            <h3>Message sent.</h3>
            <p>Thank you. Your message is on its way to Wazaan’s inbox.</p>
            <button
              type="button"
              className="button button-primary"
              onClick={close}
            >
              Close
            </button>
          </div>
        ) : (
          <form
            className="contact-form"
            onSubmit={submit}
            aria-busy={submissionState === 'submitting'}
          >
            <label className="form-field">
              <span>Name</span>
              <input
                ref={firstInputRef}
                type="text"
                name="name"
                autoComplete="name"
                maxLength={100}
                required
              />
            </label>

            <label className="form-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                maxLength={200}
                required
              />
            </label>

            <label className="form-field">
              <span>Subject</span>
              <input type="text" name="subject" maxLength={120} required />
            </label>

            <label className="form-field">
              <span>Message</span>
              <textarea name="message" maxLength={3000} required />
            </label>

            <label className="honeypot" aria-hidden="true">
              Leave this field empty
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            {!configured && (
              <p className="contact-form-note">
                Direct delivery is awaiting the Formspree endpoint. For now,
                submitting opens your email app with these details filled in.
              </p>
            )}

            {submissionState === 'error' && (
              <p className="form-status form-status-error" role="alert">
                The message could not be sent. Please try again or email{' '}
                <a href={`mailto:${directEmail}`}>{directEmail}</a>.
              </p>
            )}

            {submissionState === 'unconfigured' && (
              <p className="form-status" role="status">
                Your email app should now be open with the message prepared.
              </p>
            )}

            <div className="contact-form-actions">
              <button
                type="submit"
                className="button button-primary"
                disabled={submissionState === 'submitting'}
              >
                <Send size={16} strokeWidth={1.5} aria-hidden="true" />
                {submissionState === 'submitting'
                  ? 'Sending…'
                  : configured
                    ? 'Send message'
                    : 'Continue in email app'}
              </button>
              <a className="direct-email-link" href={`mailto:${directEmail}`}>
                <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
                Use email directly
              </a>
            </div>
          </form>
        )}
      </div>
    </dialog>
  )
}
