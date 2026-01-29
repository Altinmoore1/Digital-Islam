import { app } from './firebaseConfig';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc, updateDoc, QueryDocumentSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const db = getFirestore(app);
const storage = getStorage(app);

export interface LandingPageContent {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroMediaType: 'image' | 'video';
    heroMediaUrl: string;
}

const CONTENT_DOC_ID = 'main';
const CONTENT_COLLECTION = 'hero_content';

export const getLandingPageContent = async (): Promise<LandingPageContent | null> => {
    try {
        const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as LandingPageContent;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        return null;
    }
};

export const updateLandingPageContent = async (data: Partial<LandingPageContent>) => {
    try {
        const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID);
        await setDoc(docRef, data, { merge: true });
        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error writing document: ", error);
        throw error;
    }
};

export const uploadMedia = async (file: File): Promise<string> => {
    try {
        const storageRef = ref(storage, `landing_page/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading file: ", error);
        throw error;
    }
};

export const getVolunteers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'volunteers'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching volunteers:", error);
        return [];
    }
};

export const getDonors = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'donors'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching donors:", error);
        return [];
    }
};

export const addVolunteer = async (data: any) => {
    try {
        const docRef = await addDoc(collection(db, 'volunteers'), data);
        console.log("Volunteer written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding volunteer: ", e);
        throw e;
    }
};

export const addDonor = async (data: any) => {
    try {
        const docRef = await addDoc(collection(db, 'donors'), data);
        console.log("Donor written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding donor: ", e);
        throw e;
    }
};

export const getGallery = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'gallery'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching gallery:", error);
        return [];
    }
};

export const addGalleryItem = async (data: any) => {
    try {
        const docRef = await addDoc(collection(db, 'gallery'), data);
        return docRef.id;
    } catch (e) {
        console.error("Error adding gallery item: ", e);
        throw e;
    }
};

export const deleteGalleryItem = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'gallery', id));
    } catch (e) {
        console.error("Error deleting gallery item: ", e);
        throw e;
    }
};

export const uploadGalleryMedia = async (file: File): Promise<string> => {
    try {
        const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading gallery file: ", error);
        throw error;
    }
};

// --- Projects CRUD ---

export const getProjects = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};

export const addProject = async (data: any) => {
    try {
        const docRef = await addDoc(collection(db, 'projects'), data);
        console.log("Project written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding project: ", e);
        throw e;
    }
};

export const updateProject = async (id: string, data: any) => {
    try {
        const docRef = doc(db, 'projects', id);
        await updateDoc(docRef, data);
        console.log("Project updated with ID: ", id);
    } catch (e) {
        console.error("Error updating project: ", e);
        throw e;
    }
};

export const deleteProject = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'projects', id));
        console.log("Project deleted with ID: ", id);
    } catch (e) {
        console.error("Error deleting project: ", e);
        throw e;
    }
};


export const seedProjects = async () => {
    const initialProjects = [
        {
            title: "Build a Mosque",
            description: "Help us build a mosque in the rural area to provide a place of worship for the community.",
            category: "Infrastructure",
            thumbnail: "https://images.unsplash.com/photo-1542456073-678082987c69?q=80&w=2788&auto=format&fit=crop",
            goal: "50000",
            raised: "12500"
        },
        {
            title: "Ramadan Food Drive",
            description: "Providing food packages to families in need during the holy month of Ramadan.",
            category: "Charity",
            thumbnail: "https://images.unsplash.com/photo-1594901047683-9b1604a11c1d?q=80&w=2835&auto=format&fit=crop",
            goal: "10000",
            raised: "8500"
        },
        {
            title: "Education for All",
            description: "Sponsoring education for orphans and underprivileged children.",
            category: "Education",
            thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2604&auto=format&fit=crop",
            goal: "25000",
            raised: "5000"
        }
    ];

    try {
        for (const project of initialProjects) {
            await addProject(project);
        }
        console.log("Projects seeded successfully");
        return true;
    } catch (e) {
        console.error("Error seeding projects:", e);
        return false;
    }
};

// --- Hero Carousel CRUD ---

export const getHeroCarousel = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'hero_carousel'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching hero carousel:", error);
        return [];
    }
};

export const addHeroCarouselItem = async (data: any) => {
    try {
        const docRef = await addDoc(collection(db, 'hero_carousel'), data);
        console.log("Hero Carousel item written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding hero carousel item: ", e);
        throw e;
    }
};

export const updateHeroCarouselItem = async (id: string, data: any) => {
    try {
        const docRef = doc(db, 'hero_carousel', id);
        await updateDoc(docRef, data);
        console.log("Hero Carousel item updated with ID: ", id);
    } catch (e) {
        console.error("Error updating hero carousel item: ", e);
        throw e;
    }
};

export const deleteHeroCarouselItem = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'hero_carousel', id));
        console.log("Hero Carousel item deleted with ID: ", id);
    } catch (e) {
        console.error("Error deleting hero carousel item: ", e);
        throw e;
    }
};
