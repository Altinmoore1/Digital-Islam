import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebaseConfig';
import { signOut } from 'firebase/auth';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const menuItems = [
        { label: 'Landing Page', path: '/admin' },
        // Add more menu items here in the future
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 relative">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-green-900 text-white z-40 px-4 h-16 flex items-center justify-between shadow-md">
                <span className="font-bold">Digital Islam</span>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-green-900 text-white shadow-xl flex flex-col transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6">
                    <h2 className="text-2xl font-bold italic">Digital Islam</h2>
                    <div className="text-green-300 text-xs tracking-wider uppercase mt-1">Admin Portal</div>
                </div>

                <nav className="mt-6 flex-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`block px-6 py-4 text-sm font-medium transition-colors ${location.pathname === item.path
                                ? 'bg-green-800 border-r-4 border-green-400'
                                : 'text-green-100 hover:bg-green-800/50'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="mt-8 px-6">
                        <Link to="/" className="text-xs text-green-300 hover:text-white flex items-center gap-2">
                            <span>←</span> Back to Website
                        </Link>
                    </div>
                </nav>

                <div className="p-6 border-t border-green-800 bg-green-950/30">
                    <p className="text-xs text-green-400 mb-2 truncate">
                        {auth.currentUser?.email}
                    </p>
                    <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-white hover:text-red-300 flex items-center gap-2 transition-colors w-full"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen pt-20 md:pt-8">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
