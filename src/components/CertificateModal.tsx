import { Download, ExternalLink, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Credential } from '../data'

type CertificateModalProps = {
  credential: Credential | null
  onClose: () => void
}

export function CertificateModal({
  credential,
  onClose,
}: CertificateModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !credential) return

    returnFocusRef.current = document.activeElement as HTMLElement
    if (!dialog.open) dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
      returnFocusRef.current?.focus()
    }
  }, [credential])

  if (
    !credential?.preview ||
    (!credential.document && !credential.verificationUrl)
  )
    return null

  const close = () => {
    dialogRef.current?.close()
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="certificate-dialog"
      data-lenis-prevent
      aria-labelledby="certificate-dialog-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        close()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <div className="dialog-shell">
        <header className="dialog-header">
          <div>
            <p className="dialog-kind">{credential.kind}</p>
            <h2 id="certificate-dialog-title">{credential.title}</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Close certificate viewer"
            onClick={close}
          >
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </header>

        <div className="dialog-body">
          <figure className="certificate-full-preview">
            <img
              src={credential.preview}
              alt={credential.imageAlt ?? credential.title}
              width="1800"
              height="1273"
            />
          </figure>

          <aside className="certificate-facts">
            {credential.issuer && (
              <p className="certificate-issuer">{credential.issuer}</p>
            )}
            {credential.date && <p>{credential.date}</p>}
            {credential.status && <p>{credential.status}</p>}

            {credential.details && (
              <dl>
                {credential.details.map((detail) => (
                  <div key={detail.label}>
                    <dt>{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {credential.notes && (
              <ul>
                {credential.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            )}
          </aside>
        </div>

        <footer className="dialog-actions">
          {credential.document && (
            <>
              <a
                className="button button-primary"
                href={credential.document}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
                Open original PDF
              </a>
              <a
                className="button button-secondary"
                href={credential.document}
                download
              >
                <Download size={16} strokeWidth={1.5} aria-hidden="true" />
                Download PDF
              </a>
            </>
          )}
          {credential.verificationUrl && (
            <a
              className="button button-primary"
              href={credential.verificationUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
              Verify on Credly
            </a>
          )}
        </footer>
      </div>
    </dialog>
  )
}
