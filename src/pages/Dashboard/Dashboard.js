import styles from './Dashboard.module.css'

import { Link } from 'react-router-dom'

import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

const Dashboard = () => {
	const { user } = useAuthValue()
	const uid = user.uid

	const { documents: posts, loading } = useFetchDocuments('posts', null, uid)

	const { deleteDocument } = useDeleteDocument('posts')

	if (loading) {
		return <p>Loading...</p>
	}

	const handleDelete = (id) => {
		const confirmDelete = window.confirm("Tem certeza que deseja excluir este post?")
		if (confirmDelete) {
			deleteDocument(id)
		}
	}

	return (
		<div className={styles.dashboard}>
			<h2>Dashboard</h2>
			<p>Gerencie os seus posts</p>
			{posts && posts.length === 0 ? (
				<div className={styles.noposts}>
					<p>Não há posts para exibir</p>
					<Link to="/posts/create" className='btn'>Criar post</Link>
				</div>
			) : (
				<>
					<div className={styles.post_header}>
						<span>Título</span>
						<span>Ações</span>
					</div>

					{posts && posts.map((post) => <div key={post.id} className={styles.post_row}>
						<p>{post.title}</p>
						<div className={styles.dashboard_button}>
							<Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver post</Link>
							<Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>Editar post</Link>
							<button onClick={() => handleDelete(post.id)} className='btn btn-outline btn-danger'>
								Excluir
							</button>
						</div>
					</div>)}
				</>
			)}

			{/* {posts && posts.map((post) => <h3>{post.title}</h3>)} */}
		</div>
	)
}

export default Dashboard