import styles from './Post.module.css';
import { useParams, useNavigate } from 'react-router-dom'; // Adicione useNavigate
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useAuthValue } from '../../context/AuthContext';
import { Link } from 'react-router-dom'

const Post = () => {
    const { id } = useParams()
    const { document: post, loading } = useFetchDocument('posts', id)
    const { user } = useAuthValue()
    const navigate = useNavigate() // Instancie o navigate

    return (
        <div className={styles.post_container}>
            <div style={{ textAlign: 'left', marginBottom: '1em' }}>
                <button
                    className={`btn btn-outline`}
                    onClick={() => navigate(-1)}
                    style={{ padding: '0 20px' }}
                >
                    Voltar
                </button>
            </div>

            {!user && (
                <>
                    <p>Faça login para realizar buscas</p>
                    <Link to='/login' className='btn btn-outline'>
                        Fazer Login
                    </Link>
                </>
            )}
            {user && loading && <p>Carregando...</p>}
            {user && post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} />
                    <p>{post.body}</p>
                    <h3>Este post é sobre:</h3>
                    <div className={styles.tags}>
                        {post.tagsArray.map((tag) => (
                            <p key={tag}><span>#</span>
                                {tag}
                            </p>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Post