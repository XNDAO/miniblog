import styles from './About.module.css'

import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'

const About = () => {
  const { user } = useAuthValue()

  return (
    <div className={styles.about}>
      <h2>Sobre o Mini <span>Blog</span></h2>
      <p>
        Este projeto utiliza React no front-end e Firebase no back-end.
      </p>
      <Link
        to={user ? '/posts/create' : '/login'}
        className='btn btn-fix'
      >
        Criar post
      </Link>
    </div>
  )
}

export default About