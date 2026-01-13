import React, { useState } from 'react';
import { useAppData } from '../context/DataContext';
import { uploadMedia, uploadGalleryMedia } from '../services/contentService';
import ProjectManager from './admin/ProjectManager';

const AdminPanel: React.FC = () => {
    const { data, updateHero, addGalleryItem, removeGalleryItem, updateSector, setIsAdmin, isLoading } = useAppData();
    const [activeTab, setActiveTab] = useState<'content' | 'gallery' | 'donors' | 'volunteers' | 'projects'>('content');

    // We initialize state from data, but data might be empty initially if loading. 
    // We initialize state from data, but data might be empty initially if loading. 
    // Ideally use useEffect to sync local form state when data loads.
    const [heroForm, setHeroForm] = useState(data.hero);

    // Effect to update form when data loads (fixing empty form on refresh)
    // DISABLED: Admin panel should NOT load data from landing page
    /*
    React.useEffect(() => {
        if (data.hero) setHeroForm(data.hero);
    }, [data.hero]);
    */

    const [newMedia, setNewMedia] = useState({ title: '', category: 'Charity' });
    const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<FileList | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateHero({
            title: heroForm.title,
            subtitle: heroForm.subtitle,
            description: heroForm.description
        });
        alert('Text content updated!');
    };

    const handleImageSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedFile) {
            try {
                setIsUploading(true);
                const downloadUrl = await uploadMedia(selectedFile);
                await updateHero({ image: downloadUrl });
                alert('Hero image updated successfully!');
                setSelectedFile(null);
            } catch (error) {
                console.error("Upload failed", error);
                alert('Failed to upload image.');
            } finally {
                setIsUploading(false);
            }
        } else if (heroForm.image) {
            // Fallback if they just wanted to keep the current URL but clicked update? 
            // Or maybe they pasted a URL?
            // For now, let's support both: if file, upload; else if text changed, update text.
            updateHero({ image: heroForm.image });
            alert('Hero image updated!');
        }
    };

    const handleMediaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedGalleryFiles || selectedGalleryFiles.length === 0) {
            alert("Please select at least one file.");
            return;
        }

        setIsUploading(true);
        try {
            // Loop through all selected files
            for (let i = 0; i < selectedGalleryFiles.length; i++) {
                const file = selectedGalleryFiles[i];
                // Determine type based on mime type
                const type = file.type.startsWith('video') ? 'video' : 'image';

                // Upload
                const url = await uploadGalleryMedia(file);

                // Add to Firestore
                await addGalleryItem({
                    title: newMedia.title, // They share the same title/category for batch
                    category: newMedia.category,
                    type: type,
                    url: url,
                    thumbnail: url // Use URL as thumbnail for both (video will render as video tag)
                });
            }

            alert(`${selectedGalleryFiles.length} item(s) added to gallery!`);
            setNewMedia({ title: '', category: 'Charity' });
            setSelectedGalleryFiles(null);
            // Reset file input manually if needed, or rely on React key/ref
        } catch (error) {
            console.error("Batch upload failed", error);
            alert("Failed to upload some items.");
        } finally {
            setIsUploading(false);
        }
    };

    // Optimization: Render sidebar immediately
    // if (isLoading) return <div className="p-10">Loading Data...</div>;

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900 relative">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-green-900 text-white z-40 px-4 h-16 flex items-center justify-between shadow-md">
                <span className="font-bold">Digital Islam Admin</span>
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
            <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-green-900 text-white flex flex-col shadow-2xl transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-24 flex items-center px-8 border-b border-green-800 gap-4 mb-6">
                    <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-full border-2 border-green-400 shadow-sm" />
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Admin Console</h2>
                        <span className="text-xs text-green-300 font-medium uppercase tracking-wider">Digital Islam</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    <div className="text-xs font-bold text-green-400 uppercase tracking-widest px-4 mb-2 mt-2">Main Menu</div>

                    <button
                        onClick={() => { setActiveTab('content'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${activeTab === 'content' ? 'bg-green-700 text-white shadow-lg translate-x-1 font-semibold' : 'text-green-100 hover:bg-green-800 hover:text-white'}`}
                    >
                        <svg className={`w-6 h-6 ${activeTab === 'content' ? 'text-green-300' : 'text-green-400 group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        Content Manager
                    </button>

                    <button
                        onClick={() => { setActiveTab('gallery'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${activeTab === 'gallery' ? 'bg-green-700 text-white shadow-lg translate-x-1 font-semibold' : 'text-green-100 hover:bg-green-800 hover:text-white'}`}
                    >
                        <svg className={`w-6 h-6 ${activeTab === 'gallery' ? 'text-green-300' : 'text-green-400 group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Media Gallery
                    </button>

                    <button
                        onClick={() => { setActiveTab('projects'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${activeTab === 'projects' ? 'bg-green-700 text-white shadow-lg translate-x-1 font-semibold' : 'text-green-100 hover:bg-green-800 hover:text-white'}`}
                    >
                        <svg className={`w-6 h-6 ${activeTab === 'projects' ? 'text-green-300' : 'text-green-400 group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        Projects
                    </button>

                    <button
                        onClick={() => { setActiveTab('donors'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${activeTab === 'donors' ? 'bg-green-700 text-white shadow-lg translate-x-1 font-semibold' : 'text-green-100 hover:bg-green-800 hover:text-white'}`}
                    >
                        <svg className={`w-6 h-6 ${activeTab === 'donors' ? 'text-green-300' : 'text-green-400 group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Donations
                    </button>

                    <button
                        onClick={() => { setActiveTab('volunteers'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${activeTab === 'volunteers' ? 'bg-green-700 text-white shadow-lg translate-x-1 font-semibold' : 'text-green-100 hover:bg-green-800 hover:text-white'}`}
                    >
                        <svg className={`w-6 h-6 ${activeTab === 'volunteers' ? 'text-green-300' : 'text-green-400 group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        Volunteers
                    </button>
                </nav>

                <div className="p-6 border-t border-green-800">
                    <button onClick={() => setIsAdmin(false)} className="w-full flex items-center justify-center gap-2 p-3 bg-red-600/10 text-red-100 hover:bg-red-600 hover:text-white rounded-xl font-bold transition-all duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50 pt-16 md:pt-0">
                {/* Header */}
                <header className="bg-white h-24 border-b border-gray-100 flex items-center justify-between px-4 md:px-10 sticky top-0 z-10 shadow-sm/50 backdrop-blur-sm bg-white/90">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize tracking-tight">{activeTab} Management</h1>
                        <p className="text-gray-500 text-sm mt-1 hidden md:block">Manage and oversee your application's {activeTab}.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center text-green-700 font-bold border border-green-100">
                            A
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-10 max-w-7xl mx-auto pb-24">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-96">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-green-700 mb-4"></div>
                            <p className="text-gray-500 font-medium">Loading Dashboard Data...</p>
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
                            {activeTab === 'content' && (
                                <div className="max-w-3xl bg-white p-10 rounded-3xl shadow-xl border border-gray-100/50">
                                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                                        <div className="p-3 bg-green-50 rounded-xl">
                                            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Landing Page Content</h3>
                                            <p className="text-gray-500 text-sm">Update the main hero section text and media.</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleTextSubmit} className="space-y-6 mb-10">
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-700">Hero Title</label>
                                            <input
                                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none font-medium text-gray-800"
                                                value={heroForm.title}
                                                onChange={e => setHeroForm({ ...heroForm, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1 text-gray-700">Hero Subtitle</label>
                                            <input className="w-full p-3 border rounded-lg" value={heroForm.subtitle} onChange={e => setHeroForm({ ...heroForm, subtitle: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-1 text-gray-700">Description</label>
                                            <textarea className="w-full p-3 border rounded-lg h-32" value={heroForm.description} onChange={e => setHeroForm({ ...heroForm, description: e.target.value })} />
                                        </div>
                                        <button className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 transition-colors">Save Text Changes</button>
                                    </form>

                                    {/* Image Section - Visually merged but independent logic */}
                                    <div className="mt-8">
                                        <form onSubmit={handleImageSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold mb-1 text-gray-700">Hero Image</label>
                                                <div className="flex gap-2 items-center">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="w-full p-2 border rounded-lg bg-white"
                                                        onChange={(e) => {
                                                            if (e.target.files && e.target.files[0]) {
                                                                setSelectedFile(e.target.files[0]);
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        disabled={isUploading}
                                                        className={`bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                                                    >
                                                        {isUploading ? 'Uploading...' : 'Update Image'}
                                                    </button>
                                                </div>

                                                {/* Read-only URL display */}
                                                <input
                                                    className="w-full p-2 border rounded-lg bg-gray-50 text-xs text-gray-500 mt-2"
                                                    value={heroForm.image}
                                                    readOnly
                                                    placeholder="Current Image URL"
                                                />

                                                {heroForm.image && (
                                                    <div className="mt-4">
                                                        <p className="text-xs text-gray-500 mb-2">Current Preview:</p>
                                                        <img src={heroForm.image} alt="Hero Preview" className="h-40 w-full object-cover rounded-lg border" />
                                                    </div>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'gallery' && (
                                <div className="space-y-8">
                                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                                        <h3 className="text-2xl font-bold mb-6 text-green-900">Add New Media</h3>
                                        <form onSubmit={handleMediaSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input placeholder="Batch Title (e.g. Graduation 2024)" className="p-3 border rounded-lg col-span-1 md:col-span-2" value={newMedia.title} onChange={e => setNewMedia({ ...newMedia, title: e.target.value })} required />

                                            <div className="col-span-1 md:col-span-2">
                                                <label className="block text-sm font-bold mb-1 text-gray-700">Select Images/Videos</label>
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*,video/*"
                                                    className="w-full p-2 border rounded-lg bg-white"
                                                    onChange={(e) => setSelectedGalleryFiles(e.target.files)}
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple files.</p>
                                            </div>

                                            <select className="p-3 border rounded-lg col-span-1 md:col-span-2" value={newMedia.category} onChange={e => setNewMedia({ ...newMedia, category: e.target.value })}>
                                                <option>Charity</option>
                                                <option>Education</option>
                                                <option>Entertainment</option>
                                                <option>Ambassadorial</option>
                                            </select>

                                            <button
                                                disabled={isUploading}
                                                className="col-span-1 md:col-span-2 bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 disabled:opacity-50"
                                            >
                                                {isUploading ? 'Uploading & Adding...' : 'Add to Gallery'}
                                            </button>
                                        </form>
                                    </div>

                                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                                        <h3 className="text-xl font-bold mb-4">Current Gallery Items</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                            {data.gallery.map(item => (
                                                <div key={item.id} className="relative group rounded-lg overflow-hidden border">
                                                    {item.type === 'video' ? (
                                                        <video
                                                            src={item.url}
                                                            className="w-full h-32 object-cover"
                                                            muted
                                                            onMouseOver={e => e.currentTarget.play()}
                                                            onMouseOut={e => {
                                                                e.currentTarget.pause();
                                                                e.currentTarget.currentTime = 0;
                                                            }}
                                                        />
                                                    ) : (
                                                        <img src={item.thumbnail} className="w-full h-32 object-cover" />
                                                    )}
                                                    <button
                                                        onClick={() => removeGalleryItem(item.id)}
                                                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'donors' && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="p-6 border-b"><h3 className="text-xl font-bold">Donation Log</h3></div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left min-w-[800px]">
                                            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                                                <tr>
                                                    <th className="p-4">Name</th>
                                                    <th className="p-4">Email</th>
                                                    <th className="p-4">Phone</th>
                                                    <th className="p-4">Occupation</th>
                                                    <th className="p-4">Location</th>
                                                    <th className="p-4">Project</th>
                                                    <th className="p-4">Pledge</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {data.donors.length === 0 && <tr><td colSpan={7} className="p-4 text-center text-gray-500">No donors found.</td></tr>}
                                                {data.donors.map(d => (
                                                    <tr key={d.id} className="hover:bg-gray-50">
                                                        <td className="p-4 font-medium">{d.name}</td>
                                                        <td className="p-4 text-sm">{d.email}</td>
                                                        <td className="p-4 text-sm">{d.phone}</td>
                                                        <td className="p-4 text-sm">{d.occupation}</td>
                                                        <td className="p-4 text-sm">{d.location}</td>
                                                        <td className="p-4 text-sm font-semibold text-green-800">{d.project || 'General'}</td>
                                                        <td className="p-4 text-green-700 font-bold">{d.pledge}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'volunteers' && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="p-6 border-b"><h3 className="text-xl font-bold">Team Signups</h3></div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left min-w-[800px]">
                                            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                                                <tr>
                                                    <th className="p-4">Name</th>
                                                    <th className="p-4">Email</th>
                                                    <th className="p-4">Phone</th>
                                                    <th className="p-4">Occupation</th>
                                                    <th className="p-4">Location</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {data.volunteers.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-gray-500">No volunteers found.</td></tr>}
                                                {data.volunteers.map(v => (
                                                    <tr key={v.id} className="hover:bg-gray-50">
                                                        <td className="p-4 font-medium">{v.name}</td>
                                                        <td className="p-4 text-blue-600 underline text-sm">{v.email}</td>
                                                        <td className="p-4 text-sm">{v.phone}</td>
                                                        <td className="p-4 text-sm">{v.occupation}</td>
                                                        <td className="p-4 text-gray-500">{v.location}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'projects' && (
                                <ProjectManager />
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div >
    );
};

export default AdminPanel;
