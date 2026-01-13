import React, { useState, useEffect } from 'react';
import { useAppData } from '../../context/DataContext';
import { Project } from '../../types';

const ProjectManager: React.FC = () => {
    const { data, addProject, updateProject, deleteProject, seedProjects } = useAppData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({
        title: '',
        description: '',
        category: '',
        thumbnail: '',
        goal: '',
        raised: ''
    });

    const categories = ['Infrastructure', 'Charity', 'Education', 'Health', 'General'];

    const resetForm = () => {
        setCurrentProject({
            title: '',
            description: '',
            category: categories[0],
            thumbnail: '',
            goal: '',
            raised: ''
        });
        setIsEditing(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && currentProject.id) {
                await updateProject(currentProject.id, currentProject);
                alert("Project updated successfully!");
            } else {
                await addProject(currentProject as Omit<Project, 'id'>);
                alert("Project added successfully!");
            }
            resetForm();
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Failed to save project.");
        }
    };

    const handleEdit = (project: Project) => {
        setCurrentProject(project);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            await deleteProject(id);
        }
    };

    const handleSeed = async () => {
        if (window.confirm("This will add default projects. Continue?")) {
            await seedProjects();
            alert("Projects seeded!");
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100/50">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {isEditing ? 'Edit Project' : 'Add New Project'}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                            {isEditing ? 'Update existing project details.' : 'Create a new fundraising campaign.'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-bold mb-2 text-gray-700">Project Title</label>
                        <input
                            required
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none font-medium"
                            value={currentProject.title}
                            onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
                            placeholder="e.g. Build a Mosque"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-bold mb-2 text-gray-700">Description</label>
                        <textarea
                            required
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none h-32"
                            value={currentProject.description}
                            onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
                            placeholder="Describe the project goal and impact..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700">Category</label>
                        <select
                            className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none"
                            value={currentProject.category}
                            onChange={e => setCurrentProject({ ...currentProject, category: e.target.value })}
                        >
                            <option value="" disabled>Select Category</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700">Thumbnail URL</label>
                        <input
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none"
                            value={currentProject.thumbnail || ''}
                            onChange={e => setCurrentProject({ ...currentProject, thumbnail: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700">Goal Amount ($)</label>
                        <input
                            type="number"
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none"
                            value={currentProject.goal || ''}
                            onChange={e => setCurrentProject({ ...currentProject, goal: e.target.value })}
                            placeholder="50000"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700">Raised Amount ($)</label>
                        <input
                            type="number"
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none"
                            value={currentProject.raised || ''}
                            onChange={e => setCurrentProject({ ...currentProject, raised: e.target.value })}
                            placeholder="0"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-800 transition-all shadow-lg hover:shadow-green-700/20 active:scale-95"
                        >
                            {isEditing ? 'Update Project' : 'Create Project'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-8 py-4 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Current Projects</h3>
                        <p className="text-sm text-gray-500 mt-1">Manage active fundraising campaigns</p>
                    </div>
                    {data.projects.length === 0 && (
                        <button
                            onClick={handleSeed}
                            className="text-sm text-green-700 font-bold hover:underline"
                        >
                            Seed Defaults
                        </button>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold tracking-wider">
                            <tr>
                                <th className="p-6">Title</th>
                                <th className="p-6">Category</th>
                                <th className="p-6">Goal / Raised</th>
                                <th className="p-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.projects.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-gray-500">
                                        No projects found. Create one above or seed defaults.
                                    </td>
                                </tr>
                            ) : (
                                data.projects.map(project => (
                                    <tr key={project.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="p-6">
                                            <div className="font-bold text-gray-900">{project.title}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="text-sm font-medium text-gray-900">
                                                ${parseInt(project.raised || '0').toLocaleString()}
                                                <span className="text-gray-400 mx-1">/</span>
                                                <span className="text-gray-500">${parseInt(project.goal || '0').toLocaleString()}</span>
                                            </div>
                                            <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 rounded-full"
                                                    style={{ width: `${Math.min(100, (parseInt(project.raised || '0') / parseInt(project.goal || '1')) * 100)}%` }}
                                                ></div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-center">
                                            <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(project)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProjectManager;
