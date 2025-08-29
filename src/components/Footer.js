import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>Escreva sobre o melhor de <span>Drag<span className={styles.footer_orange}>o</span>nBall</span>!</h3>
      <p>DragonBall Blog &copy; 2025</p>
      <a href='https://github.com/XNDAO/miniblog'>Code on XNDAO's GitHub</a>
    </footer>
  )
}

export default Footer