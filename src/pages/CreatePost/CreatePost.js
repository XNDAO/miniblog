import styles from './CreatePost.module.css'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState('')

    const { insertDocument, response } = useInsertDocument('posts')

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

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        // redirect to home page
        navigate('/')

    }

    return (
        <div className={styles.create_post}>
            <h2>Criar post</h2>
            <p>Escreva e compartilhe com o mundo</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título:</span>
                    <input type='text' name='title' required placeholder='Um título' onChange={(e) => setTitle(e.target.value)} value={title} />
                </label>
                <label>
                    <span>URL da imagem</span>
                    <input type='text' name='title' required placeholder='Uma imagem' onChange={(e) => setImage(e.target.value)} value={image} />
                </label>
                <label>
                    <span>Conteúdo:</span>
                    <textarea name='body' required placeholder='Insira o conteúdo do post' onChange={(e) => setBody(e.target.value)} value={body}></textarea>
                </label>
                <label>
                    <span>Tags (separe com vírgula):</span>
                    <input type='text' name='tags' required placeholder='Insira tags separados' onChange={(e) => setTags(e.target.value)} value={tags} />
                </label>

                {!response.loading && <button className='btn'>Cadastrar</button>}
                {response.loading && (<button className='btn' disabled>Aguarde</button>)}
                {response.error && <p className='error'>{response.error}</p>}
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}

export default CreatePost