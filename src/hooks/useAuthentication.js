import { db, app } from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth(app)

    function checkIfIsCancelled() {
        if (cancelled) {
            return true
        }
    }


    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {

            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user

        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message === 'auth/weak-password') {
                systemErrorMessage = 'Password must be at least 6 characters long';
            } else if (error.message === 'auth/email-already-in-use') {
                systemErrorMessage = 'Email already in use';
            } else {
                systemErrorMessage = 'Ocorreu um erro, tente novamente';
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    // logout
    const logout = () => {
        checkIfIsCancelled()

        signOut(auth)
    }

    // login
    const login = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(false)

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {

            let systemErrorMessage

            if (error.message === 'auth/user-not-found') {
                systemErrorMessage = 'Usuário não encontrado';
            } else if (error.message === 'auth/wrong-password') {
                systemErrorMessage = 'Senha incorreta';
            } else {
                systemErrorMessage = 'Ocorreu um erro, tente novamente';
            }

            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}