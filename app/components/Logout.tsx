import { useRouter } from 'next/navigation';

const LogoutButton = ({ onLogout }: { onLogout: () => void }) => {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            onLogout();
            router.push('/');
        } else {
            console.error('Error al cerrar sesión');
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
