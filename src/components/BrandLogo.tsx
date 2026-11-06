export function BrandLogo() {
  return (
    <>
      <svg
        className="brand-mark"
        viewBox="0 0 38 32"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="brand-mark-route brand-mark-route-back"
          d="M2.75 5.5 7.8 26l6.25-12.5L20.3 26l5.05-20.5"
        />
        <path
          className="brand-mark-route brand-mark-route-front"
          d="M12.65 5.5 17.7 26l6.25-12.5L30.2 26l5.05-20.5"
        />
        <g className="brand-mark-terminals">
          <circle cx="2.75" cy="5.5" r="2" />
          <circle cx="12.65" cy="5.5" r="2" />
          <circle cx="25.35" cy="5.5" r="2" />
          <circle cx="35.25" cy="5.5" r="2" />
        </g>
      </svg>

      <span className="brand-wordmark" aria-hidden="true">
        <span className="brand-wordmark-name font-recepts">wazaan</span>
        <span className="brand-wordmark-surname">wazeer</span>
      </span>
    </>
  )
}
