
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  setDoc
} from "firebase/firestore";
import { db } from "./firebase";
import { 
  School, 
  Location, 
  TapConnection, 
  InfrastructureProject, 
  Registration,
  Feedback,
  Activity,
  DashboardStats,
  StatusCount,
  TapConnectionStatus
} from './types';

// Collection names
const COLLECTIONS = {
  LOCATIONS: 'locations',
  SCHOOLS: 'schools',
  TAP_CONNECTIONS: 'tapConnections',
  INFRASTRUCTURE_PROJECTS: 'infrastructureProjects',
  REGISTRATIONS: 'registrations',
  FEEDBACKS: 'feedbacks',
  ACTIVITIES: 'activities'
};

// Initializes the database with mock data if it doesn't exist
export const initializeFirestore = async (mockData: {
  locations: Location[],
  schools: School[],
  tapConnections: TapConnection[],
  infrastructureProjects: InfrastructureProject[],
  registrations: Registration[],
  feedbacks: Feedback[],
  recentActivities: Activity[]
}) => {
  try {
    // Check if data already exists
    const schoolsSnapshot = await getDocs(collection(db, COLLECTIONS.SCHOOLS));
    
    if (schoolsSnapshot.empty) {
      console.log("Initializing Firestore with mock data...");
      
      // Add locations
      const locationPromises = mockData.locations.map(location => 
        setDoc(doc(db, COLLECTIONS.LOCATIONS, location.id), location)
      );
      await Promise.all(locationPromises);
      
      // Add schools
      const schoolPromises = mockData.schools.map(school => 
        setDoc(doc(db, COLLECTIONS.SCHOOLS, school.id), school)
      );
      await Promise.all(schoolPromises);
      
      // Add tap connections
      const tapConnectionPromises = mockData.tapConnections.map(tapConnection => 
        setDoc(doc(db, COLLECTIONS.TAP_CONNECTIONS, tapConnection.id), tapConnection)
      );
      await Promise.all(tapConnectionPromises);
      
      // Add infrastructure projects
      const projectPromises = mockData.infrastructureProjects.map(project => 
        setDoc(doc(db, COLLECTIONS.INFRASTRUCTURE_PROJECTS, project.id), project)
      );
      await Promise.all(projectPromises);
      
      // Add registrations
      const registrationPromises = mockData.registrations.map(registration => 
        setDoc(doc(db, COLLECTIONS.REGISTRATIONS, registration.id), registration)
      );
      await Promise.all(registrationPromises);
      
      // Add feedbacks
      const feedbackPromises = mockData.feedbacks.map(feedback => 
        setDoc(doc(db, COLLECTIONS.FEEDBACKS, feedback.id), feedback)
      );
      await Promise.all(feedbackPromises);
      
      // Add activities
      const activityPromises = mockData.recentActivities.map(activity => 
        setDoc(doc(db, COLLECTIONS.ACTIVITIES, activity.id), activity)
      );
      await Promise.all(activityPromises);
      
      console.log("Firestore initialization complete");
    } else {
      console.log("Firestore already contains data, skipping initialization");
    }
  } catch (error) {
    console.error("Error initializing Firestore:", error);
    throw error;
  }
};

// Fetch all locations
export const getLocations = async (): Promise<Location[]> => {
  try {
    const locationsSnapshot = await getDocs(collection(db, COLLECTIONS.LOCATIONS));
    return locationsSnapshot.docs.map(doc => doc.data() as Location);
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

// Fetch all schools
export const getSchools = async (): Promise<School[]> => {
  try {
    const schoolsSnapshot = await getDocs(collection(db, COLLECTIONS.SCHOOLS));
    return schoolsSnapshot.docs.map(doc => doc.data() as School);
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
};

// Fetch all tap connections
export const getTapConnections = async (): Promise<TapConnection[]> => {
  try {
    const tapConnectionsSnapshot = await getDocs(collection(db, COLLECTIONS.TAP_CONNECTIONS));
    return tapConnectionsSnapshot.docs.map(doc => doc.data() as TapConnection);
  } catch (error) {
    console.error("Error fetching tap connections:", error);
    throw error;
  }
};

// Fetch all infrastructure projects
export const getInfrastructureProjects = async (): Promise<InfrastructureProject[]> => {
  try {
    const projectsSnapshot = await getDocs(collection(db, COLLECTIONS.INFRASTRUCTURE_PROJECTS));
    return projectsSnapshot.docs.map(doc => doc.data() as InfrastructureProject);
  } catch (error) {
    console.error("Error fetching infrastructure projects:", error);
    throw error;
  }
};

// Fetch all registrations
export const getRegistrations = async (): Promise<Registration[]> => {
  try {
    const registrationsSnapshot = await getDocs(collection(db, COLLECTIONS.REGISTRATIONS));
    return registrationsSnapshot.docs.map(doc => doc.data() as Registration);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    throw error;
  }
};

// Fetch all feedbacks
export const getFeedbacks = async (): Promise<Feedback[]> => {
  try {
    const feedbacksSnapshot = await getDocs(collection(db, COLLECTIONS.FEEDBACKS));
    return feedbacksSnapshot.docs.map(doc => doc.data() as Feedback);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    throw error;
  }
};

// Fetch all activities
export const getActivities = async (): Promise<Activity[]> => {
  try {
    const activitiesSnapshot = await getDocs(collection(db, COLLECTIONS.ACTIVITIES));
    return activitiesSnapshot.docs.map(doc => doc.data() as Activity);
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

// Fetch a school by ID
export const getSchoolById = async (id: string): Promise<School | null> => {
  try {
    const schoolDoc = await getDoc(doc(db, COLLECTIONS.SCHOOLS, id));
    if (!schoolDoc.exists()) return null;
    return schoolDoc.data() as School;
  } catch (error) {
    console.error(`Error fetching school with ID ${id}:`, error);
    throw error;
  }
};

// Fetch a location by ID
export const getLocationById = async (id: string): Promise<Location | null> => {
  try {
    const locationDoc = await getDoc(doc(db, COLLECTIONS.LOCATIONS, id));
    if (!locationDoc.exists()) return null;
    return locationDoc.data() as Location;
  } catch (error) {
    console.error(`Error fetching location with ID ${id}:`, error);
    throw error;
  }
};

// Fetch a tap connection by school ID
export const getTapConnectionBySchoolId = async (schoolId: string): Promise<TapConnection | null> => {
  try {
    const tapConnectionQuery = query(
      collection(db, COLLECTIONS.TAP_CONNECTIONS),
      where("schoolId", "==", schoolId)
    );
    
    const querySnapshot = await getDocs(tapConnectionQuery);
    if (querySnapshot.empty) return null;
    
    return querySnapshot.docs[0].data() as TapConnection;
  } catch (error) {
    console.error(`Error fetching tap connection for school ${schoolId}:`, error);
    throw error;
  }
};

// Fetch infrastructure projects by school ID
export const getProjectsBySchoolId = async (schoolId: string): Promise<InfrastructureProject[]> => {
  try {
    const projectsQuery = query(
      collection(db, COLLECTIONS.INFRASTRUCTURE_PROJECTS),
      where("schoolId", "==", schoolId)
    );
    
    const querySnapshot = await getDocs(projectsQuery);
    return querySnapshot.docs.map(doc => doc.data() as InfrastructureProject);
  } catch (error) {
    console.error(`Error fetching projects for school ${schoolId}:`, error);
    throw error;
  }
};

// Fetch feedback by school ID
export const getFeedbackBySchoolId = async (schoolId: string): Promise<Feedback[]> => {
  try {
    const feedbackQuery = query(
      collection(db, COLLECTIONS.FEEDBACKS),
      where("schoolId", "==", schoolId)
    );
    
    const querySnapshot = await getDocs(feedbackQuery);
    return querySnapshot.docs.map(doc => doc.data() as Feedback);
  } catch (error) {
    console.error(`Error fetching feedback for school ${schoolId}:`, error);
    throw error;
  }
};

// Fetch activities by school ID
export const getActivitiesBySchoolId = async (schoolId: string): Promise<Activity[]> => {
  try {
    const activitiesQuery = query(
      collection(db, COLLECTIONS.ACTIVITIES),
      where("schoolId", "==", schoolId)
    );
    
    const querySnapshot = await getDocs(activitiesQuery);
    return querySnapshot.docs.map(doc => doc.data() as Activity);
  } catch (error) {
    console.error(`Error fetching activities for school ${schoolId}:`, error);
    throw error;
  }
};

// Calculate dashboard statistics
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const schools = await getSchools();
    const projects = await getInfrastructureProjects();
    
    const activeSchools = schools.filter(school => school.status === "Active").length;
    const connectedTaps = schools.filter(school => school.tapConnectionStatus === "Connected").length;
    const pendingTaps = schools.filter(school => school.tapConnectionStatus === "Pending").length;
    const rejectedTaps = schools.filter(school => school.tapConnectionStatus === "Rejected").length;
    const notRequiredTaps = schools.filter(school => school.tapConnectionStatus === "Not Required").length;
    const totalProjects = projects.length;
    const completedProjects = projects.filter(project => project.status === "Completed").length;

    return {
      totalSchools: schools.length,
      activeSchools,
      connectedTaps,
      pendingTaps,
      rejectedTaps,
      notRequiredTaps,
      totalProjects,
      completedProjects
    };
  } catch (error) {
    console.error("Error calculating dashboard stats:", error);
    throw error;
  }
};

// Get connection status counts for charts
export const getConnectionStatusCounts = async (): Promise<StatusCount[]> => {
  try {
    const schools = await getSchools();
    
    const statusCounts: Record<TapConnectionStatus, number> = {
      Connected: 0,
      Pending: 0,
      Rejected: 0,
      "Not Required": 0
    };

    schools.forEach(school => {
      statusCounts[school.tapConnectionStatus]++;
    });

    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count
    }));
  } catch (error) {
    console.error("Error calculating connection status counts:", error);
    throw error;
  }
};

// Get school with its related location
export const getSchoolWithLocation = async (schoolId: string): Promise<School | null> => {
  try {
    const school = await getSchoolById(schoolId);
    if (!school) return null;
    
    const location = await getLocationById(school.locationId);
    if (!location) return school;
    
    return { ...school, location };
  } catch (error) {
    console.error(`Error fetching school with location for ID ${schoolId}:`, error);
    throw error;
  }
};

// Get school with its tap connection
export const getSchoolWithTapConnection = async (schoolId: string): Promise<School | null> => {
  try {
    const school = await getSchoolById(schoolId);
    if (!school) return null;
    
    const tapConnection = await getTapConnectionBySchoolId(schoolId);
    if (!tapConnection) return school;
    
    return { ...school, tapConnection };
  } catch (error) {
    console.error(`Error fetching school with tap connection for ID ${schoolId}:`, error);
    throw error;
  }
};

// Enrich schools with location data
export const getSchoolsWithLocations = async (): Promise<(School & { location: Location })[]> => {
  try {
    const schools = await getSchools();
    const locations = await getLocations();
    
    return schools.map(school => {
      const location = locations.find(loc => loc.id === school.locationId);
      if (!location) {
        throw new Error(`Location not found for school: ${school.id}`);
      }
      return {
        ...school,
        location
      };
    });
  } catch (error) {
    console.error("Error fetching schools with locations:", error);
    throw error;
  }
};
