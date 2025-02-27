"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
    const [post, setPost] = useState({ title: '', content: '', tags: '' });
    const [tags, setTags] = useState<string[]>([]);
    const [admin, setAdmin] = useState({ username: '', email: '', password: '' });
    const router = useRouter();

    const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTags(e.target.value.split(','));
    };

    const createPost = async () => {
        const response = await fetch('/api/entries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(post),
        });
        if (response.ok) {
            router.refresh();
        }
    };

    const editAdmin = async () => {
        // Lógica para editar admin
    };

    const editUser = async (userId: string) => {
        // Lógica para editar usuario
    };

    return (
        <div>
            <h1>Admin Page</h1>

            <h2>Create Post</h2>
            <input type="text" name="title" placeholder="Title" onChange={handlePostChange} />
            <textarea name="content" placeholder="Content" onChange={handlePostChange}></textarea>
            <input type="text" name="tags" placeholder="Tags (comma separated)" onChange={handleTagChange} />
            <button onClick={createPost}>Create Post</button>

            <h2>Edit Tags</h2>
            <input type="text" onChange={handleTagChange} placeholder="Edit tags" />
            {/* Implementar lógica para mostrar y eliminar etiquetas */}

            <h2>Edit Admin</h2>
            <input type="text" name="username" placeholder="Username" onChange={handleAdminChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleAdminChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleAdminChange} />
            <button onClick={editAdmin}>Update Admin</button>

            <h2>Manage Users</h2>
            {/* Mostrar lista de usuarios y opciones de edición */}
        </div>
    );
};

export default AdminPage;