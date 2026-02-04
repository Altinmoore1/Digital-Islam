import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLandingPageContent, updateLandingPageContent, getVolunteers, getDonors, getGallery, addGalleryItem as addGalleryItemService, deleteGalleryItem as deleteGalleryItemService, getProjects, addProject as addProjectService, updateProject as updateProjectService, deleteProject as deleteProjectService, seedProjects as seedProjectsService, getHeroCarousel, addHeroCarouselItem as addCarouselItemService, deleteHeroCarouselItem as deleteCarouselItemService, updateHeroCarouselItem as updateCarouselItemService } from '../services/contentService';
import { Project, CarouselItem } from '../types';

// Types based on the Admin Panel usage

interface GalleryItem {
    id: string; // Changed to string for Firestore ID
    title: string;
    thumbnail: string;
    url?: string;
    type?: 'image' | 'video';
    category?: string;
}

interface Donor {
    id: string;
    name: string;
    email: string;
    phone: string;
    occupation: string;
    location: string;
    project?: string;
    pledge: string;
}

interface Volunteer {
    id: string;
    name: string;
    email: string;
    phone: string;
    occupation: string;
    location: string;
}

interface AppData {
    gallery: GalleryItem[];
    donations: Donor[];
    volunteers: Volunteer[];
    projects: Project[];
    heroCarousel: CarouselItem[];
}

interface DataContextType {
    data: AppData;
    addGalleryItem: (item: GalleryItem) => void;
    removeGalleryItem: (id: string) => void;
    updateSector: (id: number, data: any) => void; // Placeholder
    setIsAdmin: (isAdmin: boolean) => void;
    addProject: (project: Omit<Project, 'id'>) => Promise<void>;
    updateProject: (id: string, project: Partial<Project>) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    seedProjects: () => Promise<void>;
    addCarouselItem: (item: Omit<CarouselItem, 'id'>) => Promise<void>;
    deleteCarouselItem: (id: string) => Promise<void>;
    updateCarouselItem: (id: string, data: Partial<CarouselItem>) => Promise<void>;
    isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initial Mock Data
    const [data, setData] = useState<AppData>({
        gallery: [],
        donations: [
            { id: 1, name: 'John Doe', amount: '$500', date: '2024-03-15', method: 'Stripe' },
            { id: 2, name: 'Sarah Smith', amount: '$1200', date: '2024-03-14', method: 'PayPal' },
        ],
        volunteers: [
            { id: '1', name: 'Mike Ross', email: 'mike@example.com', phone: '123-456-7890', occupation: 'Lawyer', location: 'New York' },
        ],
        projects: [],
        heroCarousel: []
    });

    const [isLoading, setIsLoading] = useState(false);

    // Fetch Admin Data (Volunteers & Donors)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [volunteersData, donorsData, galleryData, projectsData, carouselData] = await Promise.all([
                    getVolunteers(),
                    getDonors(),
                    getGallery(),
                    getProjects(),
                    getHeroCarousel()
                ]);

                setData(prev => ({
                    ...prev,
                    volunteers: volunteersData as Volunteer[],
                    donors: donorsData as Donor[],
                    gallery: galleryData as GalleryItem[],
                    projects: projectsData as Project[],
                    heroCarousel: carouselData as CarouselItem[],
                }));
            } catch (error) {
                console.error("Failed to fetch admin data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);


    const addGalleryItem = async (item: GalleryItem) => {
        // Optimistic update (with temporary ID if needed, but we essentially wait for ID usually or just fetch again)
        // For simplicity: Call service, then update local state with the returned ID
        try {
            const { id, ...rest } = item; // remove temp id if any
            const newId = await addGalleryItemService(rest);
            setData(prev => ({ ...prev, gallery: [{ ...item, id: newId }, ...prev.gallery] }));
        } catch (e) {
            console.error(e);
            alert("Failed to add media.");
        }
    };

    const removeGalleryItem = async (id: any) => { // id is string now
        try {
            await deleteGalleryItemService(id);
            setData(prev => ({ ...prev, gallery: prev.gallery.filter(item => item.id !== id) }));
        } catch (e) {
            console.error(e);
            alert("Failed to delete media.");
        }
    };

    const addProject = async (project: Omit<Project, 'id'>) => {
        try {
            const id = await addProjectService(project);
            setData(prev => ({
                ...prev,
                projects: [...prev.projects, { ...project, id }]
            }));
        } catch (e) {
            console.error("Failed to add project", e);
            throw e;
        }
    };

    const updateProject = async (id: string, project: Partial<Project>) => {
        try {
            await updateProjectService(id, project);
            setData(prev => ({
                ...prev,
                projects: prev.projects.map(p => p.id === id ? { ...p, ...project } : p)
            }));
        } catch (e) {
            console.error("Failed to update project", e);
            throw e;
        }
    };

    const deleteProject = async (id: string) => {
        try {
            await deleteProjectService(id);
            setData(prev => ({
                ...prev,
                projects: prev.projects.filter(p => p.id !== id)
            }));
        } catch (e) {
            console.error("Failed to delete project", e);
            throw e;
        }
    };

    const seedProjects = async () => {
        try {
            const success = await seedProjectsService();
            if (success) {
                const projects = await getProjects();
                setData(prev => ({ ...prev, projects: projects as Project[] }));
            }
        } catch (e) {
            console.error("Failed to seed projects", e);
        }
    };

    const addCarouselItem = async (item: Omit<CarouselItem, 'id'>) => {
        try {
            const id = await addCarouselItemService(item);
            setData(prev => ({
                ...prev,
                heroCarousel: [...prev.heroCarousel, { ...item, id }]
            }));
        } catch (e) {
            console.error("Failed to add carousel item", e);
            throw e;
        }
    };

    const deleteCarouselItem = async (id: string) => {
        try {
            await deleteCarouselItemService(id);
            setData(prev => ({
                ...prev,
                heroCarousel: prev.heroCarousel.filter(item => item.id !== id)
            }));
        } catch (e) {
            console.error("Failed to delete carousel item", e);
            throw e;
        }
    };

    const updateCarouselItem = async (id: string, data: Partial<CarouselItem>) => {
        try {
            await updateCarouselItemService(id, data);
            setData(prev => ({
                ...prev,
                heroCarousel: prev.heroCarousel.map(item => item.id === id ? { ...item, ...data } : item)
            }));
        } catch (e) {
            console.error("Failed to update carousel item", e);
            throw e;
        }
    };

    const updateSector = (id: number, sectorData: any) => {
        console.log("Update sector", id, sectorData);
    };

    const setIsAdmin = (isAdmin: boolean) => {
        // This could hook into the existing Auth logic or be a UI toggle
        if (!isAdmin) {
            window.location.href = '/'; // Simple redirect for logout
        }
    };

    return (
        <DataContext.Provider value={{
            data,
            addGalleryItem,
            removeGalleryItem,
            updateSector,
            setIsAdmin,
            isLoading,
            addProject,
            updateProject,
            deleteProject,
            seedProjects,
            addCarouselItem,
            deleteCarouselItem,
            updateCarouselItem
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useAppData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useAppData must be used within a DataProvider');
    }
    return context;
};
