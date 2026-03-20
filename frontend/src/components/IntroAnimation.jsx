import './IntroAnimation.css'

function IntroAnimation() {
  return (
    <div className="intro-overlay" aria-hidden="true">
      <div className="intro-content">
        <img src="/logo.png" alt="LearnPath AI" className="intro-logo-img" />
        <h1 className="intro-title brand-gradient">LearnPath AI</h1>
      </div>
    </div>
  )
}

export default IntroAnimation
