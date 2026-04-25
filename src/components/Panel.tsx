interface Props {
  children: React.ReactNode
  title?: string
  titleRight?: React.ReactNode
  className?: string
  bodyClass?: string
  noPad?: boolean
}

export default function Panel({ children, title, titleRight, className = '', bodyClass = '', noPad }: Props) {
  return (
    <div className={`sl-panel ${className}`}>
      <div className="sl-corner tl" />
      <div className="sl-corner tr" />
      <div className="sl-corner bl" />
      <div className="sl-corner br" />
      {(title || titleRight) && (
        <div className="sl-panel-header">
          {title && <span className="sl-panel-title">{title}</span>}
          {titleRight && <div style={{ marginLeft: 'auto' }}>{titleRight}</div>}
        </div>
      )}
      {!noPad && <div className={`p-4 ${bodyClass}`}>{children}</div>}
      {noPad && children}
    </div>
  )
}
