import styles from './Search.module.css'

import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useQuery } from "../../hooks/useQuery"

import PostDetail from "../../components/PostDetail"

import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'

const Search = () => {
    const query = useQuery()
    const search = query.get('q')
    const { user } = useAuthValue()

    const { documents: posts } = useFetchDocuments('posts', search)

    return (
        <div className={styles.search_container}>
            <h2 className={styles.search_container_h2}>Busca</h2>
            <div>
                {!user ? (
                    <div className={styles.noposts}>
                        <p>Faça login para realizar buscas</p>
                        <Link to='/login' className='btn btn-outline'>
                            Fazer Login
                        </Link>
                    </div>
                ) : posts && posts.length === 0 ? (
                    <div className={styles.noposts}>
                        <p>Nenhum post encontrado</p>
                        <Link to='/' className='btn btn-outline'>
                            Voltar
                        </Link>
                    </div>
                ) : (
                    posts && posts.map((post) =>
                        <PostDetail key={post.id} post={post} />)
                )}
            </div>
        </div>
    )
}

export default Search