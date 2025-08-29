import styles from './EditPost.module.css'

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const EditPost = () => {
    const { id } = useParams()
    const { document: post } = useFetchDocument('posts', id)

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState('')

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setImage(post.image)
            setBody(post.body)

            const textTags = post.tagsArray.join(', ')

            setTags(textTags)
        }
    }, [post])

    const { updateDocument, response } = useUpdateDocument('posts')

    const navigate = useNavigate()

    const { user } = useAuthValue()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError('')

        // validate image url
        try {
            new URL(image);
        } catch (error) {
            setFormError('Invalid image url')
        }


        // criar array de tags
        const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

        // checar todos os valores
        if (!title || !image || !tags || !body) {
            setFormError('pls, fill all fields')
        }

        if (formError) return

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            EditdBy: user.displayName
        }

        updateDocument(id, data)

        // redirect to home page
        navigate('/dashboard')

    }

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editando post {post.title}</h2>
                    <p>Altere os dados como desejar</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título:</span>
                            <input type='text' name='title' required placeholder='Um título' onChange={(e) => setTitle(e.target.value)} value={title} />
                        </label>
                        <label>
                            <span>URL da imagem</span>
                            <input type='text' name='title' required placeholder='Uma imagem' onChange={(e) => setImage(e.target.value)} value={image} />
                        </label>
                        <p className={styles.preview_title}>Preview da imagem</p>
                        <img className={styles.image_title} src={post.image} alt={post.title} />
                        <label>
                            <span>Conteúdo:</span>
                            <textarea name='body' required placeholder='Insira o conteúdo do post' onChange={(e) => setBody(e.target.value)} value={body}></textarea>
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input type='text' name='tags' required placeholder='Insira tags separados' onChange={(e) => setTags(e.target.value)} value={tags} />
                        </label>

                        {!response.loading && <button className='btn'>Editar</button>}
                        {response.loading && (<button className='btn' disabled>Aguarde</button>)}
                        {response.error && <p className='error'>{response.error}</p>}
                        {formError && <p className='error'>{formError}</p>}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost