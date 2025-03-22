
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

// Mock data for locations
export const locations: Location[] = [
  {
    id: "loc1",
    stateName: "Karnataka",
    districtName: "Bangalore Urban",
    townName: "Bangalore",
    streetName: "MG Road",
    pincode: "560001",
    latitude: 12.9716,
    longitude: 77.5946
  },
  {
    id: "loc2",
    stateName: "Karnataka",
    districtName: "Bangalore Rural",
    townName: "Doddaballapur",
    streetName: "Main Street",
    pincode: "561203",
    latitude: 13.2968,
    longitude: 77.5377
  },
  {
    id: "loc3",
    stateName: "Tamil Nadu",
    districtName: "Chennai",
    townName: "Adyar",
    streetName: "Gandhi Road",
    pincode: "600020",
    latitude: 13.0012,
    longitude: 80.2565
  },
  {
    id: "loc4",
    stateName: "Maharashtra",
    districtName: "Mumbai",
    townName: "Dadar",
    streetName: "Ambedkar Road",
    pincode: "400014",
    latitude: 19.0170,
    longitude: 72.8478
  },
  {
    id: "loc5",
    stateName: "Kerala",
    districtName: "Ernakulam",
    townName: "Kochi",
    streetName: "Marine Drive",
    pincode: "682031",
    latitude: 9.9312,
    longitude: 76.2673
  },
  {
    id: "loc6",
    stateName: "Gujarat",
    districtName: "Ahmedabad",
    townName: "Navrangpura",
    streetName: "CG Road",
    pincode: "380009",
    latitude: 23.0225,
    longitude: 72.5714
  },
  {
    id: "loc7",
    stateName: "West Bengal",
    districtName: "Kolkata",
    townName: "Salt Lake",
    streetName: "Sector V",
    pincode: "700091",
    latitude: 22.5726,
    longitude: 88.4354
  },
  {
    id: "loc8",
    stateName: "Telangana",
    districtName: "Hyderabad",
    townName: "Gachibowli",
    streetName: "Financial District",
    pincode: "500032",
    latitude: 17.4410,
    longitude: 78.3619
  }
];

// Mock data for schools
export const schools: School[] = [
  {
    id: "school1",
    locationId: "loc1",
    name: "Government Primary School, MG Road",
    numberOfStudents: 250,
    category: "Primary",
    status: "Active",
    tapConnectionStatus: "Connected",
    updateDate: "2023-10-15"
  },
  {
    id: "school2",
    locationId: "loc2",
    name: "Rural High School",
    numberOfStudents: 350,
    category: "Secondary",
    status: "Active",
    tapConnectionStatus: "Pending",
    updateDate: "2023-11-20"
  },
  {
    id: "school3",
    locationId: "loc3",
    name: "Adyar Public School",
    numberOfStudents: 500,
    category: "Higher Secondary",
    status: "Active",
    tapConnectionStatus: "Connected",
    updateDate: "2023-09-05"
  },
  {
    id: "school4",
    locationId: "loc4",
    name: "Mumbai Central School",
    numberOfStudents: 420,
    category: "Secondary",
    status: "Active",
    tapConnectionStatus: "Rejected",
    updateDate: "2023-12-01"
  },
  {
    id: "school5",
    locationId: "loc5",
    name: "Kochi International School",
    numberOfStudents: 600,
    category: "Higher Secondary",
    status: "Active",
    tapConnectionStatus: "Connected",
    updateDate: "2024-01-10"
  },
  {
    id: "school6",
    locationId: "loc6",
    name: "Ahmedabad Primary School",
    numberOfStudents: 180,
    category: "Primary",
    status: "Inactive",
    tapConnectionStatus: "Not Required",
    updateDate: "2023-10-30"
  },
  {
    id: "school7",
    locationId: "loc7",
    name: "Salt Lake High School",
    numberOfStudents: 320,
    category: "Secondary",
    status: "Active",
    tapConnectionStatus: "Pending",
    updateDate: "2023-11-15"
  },
  {
    id: "school8",
    locationId: "loc8",
    name: "Tech City Public School",
    numberOfStudents: 450,
    category: "Higher Secondary",
    status: "Active",
    tapConnectionStatus: "Connected",
    updateDate: "2024-02-05"
  }
];

// Mock data for tap connections
export const tapConnections: TapConnection[] = [
  {
    id: "tap1",
    schoolId: "school1",
    connectionDate: "2023-08-20",
    status: "Connected",
    waterSourceType: "Borewell",
    lastInspectionDate: "2024-01-15"
  },
  {
    id: "tap2",
    schoolId: "school2",
    connectionDate: null,
    status: "Pending",
    waterSourceType: "Municipality",
    lastInspectionDate: null
  },
  {
    id: "tap3",
    schoolId: "school3",
    connectionDate: "2023-07-10",
    status: "Connected",
    waterSourceType: "Municipality",
    lastInspectionDate: "2023-12-10"
  },
  {
    id: "tap4",
    schoolId: "school4",
    connectionDate: null,
    status: "Rejected",
    waterSourceType: null,
    lastInspectionDate: null
  },
  {
    id: "tap5",
    schoolId: "school5",
    connectionDate: "2023-11-05",
    status: "Connected",
    waterSourceType: "Borewell",
    lastInspectionDate: "2024-02-01"
  },
  {
    id: "tap6",
    schoolId: "school6",
    connectionDate: null,
    status: "Not Required",
    waterSourceType: null,
    lastInspectionDate: null
  },
  {
    id: "tap7",
    schoolId: "school7",
    connectionDate: null,
    status: "Pending",
    waterSourceType: "Hand Pump",
    lastInspectionDate: null
  },
  {
    id: "tap8",
    schoolId: "school8",
    connectionDate: "2024-01-15",
    status: "Connected",
    waterSourceType: "Municipality",
    lastInspectionDate: "2024-02-20"
  }
];

// Mock data for infrastructure projects
export const infrastructureProjects: InfrastructureProject[] = [
  {
    id: "project1",
    schoolId: "school1",
    projectType: "Tap Connection",
    status: "Completed",
    startDate: "2023-07-01",
    completionDate: "2023-08-20"
  },
  {
    id: "project2",
    schoolId: "school1",
    projectType: "Sanitation",
    status: "In Progress",
    startDate: "2023-11-15",
    completionDate: null
  },
  {
    id: "project3",
    schoolId: "school2",
    projectType: "Tap Connection",
    status: "In Progress",
    startDate: "2023-10-01",
    completionDate: null
  },
  {
    id: "project4",
    schoolId: "school3",
    projectType: "Tap Connection",
    status: "Completed",
    startDate: "2023-06-01",
    completionDate: "2023-07-10"
  },
  {
    id: "project5",
    schoolId: "school3",
    projectType: "Classroom Renovation",
    status: "Completed",
    startDate: "2023-08-10",
    completionDate: "2023-09-30"
  },
  {
    id: "project6",
    schoolId: "school4",
    projectType: "Tap Connection",
    status: "Cancelled",
    startDate: "2023-10-01",
    completionDate: null
  },
  {
    id: "project7",
    schoolId: "school5",
    projectType: "Tap Connection",
    status: "Completed",
    startDate: "2023-10-01",
    completionDate: "2023-11-05"
  },
  {
    id: "project8",
    schoolId: "school7",
    projectType: "Tap Connection",
    status: "In Progress",
    startDate: "2023-12-01",
    completionDate: null
  },
  {
    id: "project9",
    schoolId: "school8",
    projectType: "Tap Connection",
    status: "Completed",
    startDate: "2023-12-15",
    completionDate: "2024-01-15"
  },
  {
    id: "project10",
    schoolId: "school8",
    projectType: "Electricity",
    status: "In Progress",
    startDate: "2024-02-01",
    completionDate: null
  }
];

// Mock data for registrations
export const registrations: Registration[] = [
  {
    id: "reg1",
    schoolId: "school1",
    registrationDate: "2023-05-10",
    approvalStatus: "Approved"
  },
  {
    id: "reg2",
    schoolId: "school2",
    registrationDate: "2023-09-15",
    approvalStatus: "Approved"
  },
  {
    id: "reg3",
    schoolId: "school3",
    registrationDate: "2023-04-20",
    approvalStatus: "Approved"
  },
  {
    id: "reg4",
    schoolId: "school4",
    registrationDate: "2023-09-25",
    approvalStatus: "Rejected"
  },
  {
    id: "reg5",
    schoolId: "school5",
    registrationDate: "2023-08-10",
    approvalStatus: "Approved"
  },
  {
    id: "reg6",
    schoolId: "school6",
    registrationDate: "2023-10-05",
    approvalStatus: "Approved"
  },
  {
    id: "reg7",
    schoolId: "school7",
    registrationDate: "2023-11-01",
    approvalStatus: "Approved"
  },
  {
    id: "reg8",
    schoolId: "school8",
    registrationDate: "2023-11-20",
    approvalStatus: "Approved"
  }
];

// Mock data for feedback
export const feedbacks: Feedback[] = [
  {
    id: "feedback1",
    schoolId: "school1",
    feedbackText: "The tap connection has greatly improved access to clean water for our students.",
    rating: 5,
    submittedDate: "2023-09-10"
  },
  {
    id: "feedback2",
    schoolId: "school3",
    feedbackText: "Water pressure is sometimes low. Hope this can be addressed.",
    rating: 4,
    submittedDate: "2023-10-15"
  },
  {
    id: "feedback3",
    schoolId: "school5",
    feedbackText: "The installation was quick and professional. Highly satisfied.",
    rating: 5,
    submittedDate: "2023-12-20"
  },
  {
    id: "feedback4",
    schoolId: "school8",
    feedbackText: "Students now have access to clean drinking water. Thank you for the initiative.",
    rating: 5,
    submittedDate: "2024-02-25"
  }
];

// Mock data for recent activities
export const recentActivities: Activity[] = [
  {
    id: "activity1",
    type: "Registration",
    schoolId: "school8",
    schoolName: "Tech City Public School",
    date: "2023-11-20",
    description: "School registered for infrastructure development program",
    status: "Approved"
  },
  {
    id: "activity2",
    type: "Connection",
    schoolId: "school8",
    schoolName: "Tech City Public School",
    date: "2024-01-15",
    description: "Tap connection installed and operational",
    status: "Connected"
  },
  {
    id: "activity3",
    type: "Inspection",
    schoolId: "school8",
    schoolName: "Tech City Public School",
    date: "2024-02-20",
    description: "Routine inspection of tap connection",
    status: "Completed"
  },
  {
    id: "activity4",
    type: "Project",
    schoolId: "school8",
    schoolName: "Tech City Public School",
    date: "2024-02-01",
    description: "Electricity infrastructure project initiated",
    status: "In Progress"
  },
  {
    id: "activity5",
    type: "Feedback",
    schoolId: "school8",
    schoolName: "Tech City Public School",
    date: "2024-02-25",
    description: "Feedback submitted regarding tap connection",
    status: "Rating: 5/5"
  },
  {
    id: "activity6",
    type: "Connection",
    schoolId: "school5",
    schoolName: "Kochi International School",
    date: "2023-11-05",
    description: "Tap connection installed and operational",
    status: "Connected"
  },
  {
    id: "activity7",
    type: "Inspection",
    schoolId: "school5",
    schoolName: "Kochi International School",
    date: "2024-02-01",
    description: "Routine inspection of tap connection",
    status: "Completed"
  },
  {
    id: "activity8",
    type: "Registration",
    schoolId: "school7",
    schoolName: "Salt Lake High School",
    date: "2023-11-01",
    description: "School registered for infrastructure development program",
    status: "Approved"
  },
  {
    id: "activity9",
    type: "Project",
    schoolId: "school7",
    schoolName: "Salt Lake High School",
    date: "2023-12-01",
    description: "Tap connection project initiated",
    status: "In Progress"
  },
  {
    id: "activity10",
    type: "Connection",
    schoolId: "school1",
    schoolName: "Government Primary School, MG Road",
    date: "2023-08-20",
    description: "Tap connection installed and operational",
    status: "Connected"
  }
];

// Calculate dashboard statistics
export const getDashboardStats = (): DashboardStats => {
  const activeSchools = schools.filter(school => school.status === "Active").length;
  const connectedTaps = schools.filter(school => school.tapConnectionStatus === "Connected").length;
  const pendingTaps = schools.filter(school => school.tapConnectionStatus === "Pending").length;
  const rejectedTaps = schools.filter(school => school.tapConnectionStatus === "Rejected").length;
  const notRequiredTaps = schools.filter(school => school.tapConnectionStatus === "Not Required").length;
  const totalProjects = infrastructureProjects.length;
  const completedProjects = infrastructureProjects.filter(project => project.status === "Completed").length;

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
};

// Get connection status counts for charts
export const getConnectionStatusCounts = (): StatusCount[] => {
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
};

// Get school with its related location
export const getSchoolWithLocation = (schoolId: string): School | undefined => {
  const school = schools.find(s => s.id === schoolId);
  if (!school) return undefined;

  const location = locations.find(l => l.id === school.locationId);
  return { ...school, location };
};

// Get school with its tap connection
export const getSchoolWithTapConnection = (schoolId: string): School | undefined => {
  const school = schools.find(s => s.id === schoolId);
  if (!school) return undefined;

  const tapConnection = tapConnections.find(t => t.schoolId === school.id);
  return { ...school, tapConnection };
};

// Get infrastructure projects for a school
export const getProjectsForSchool = (schoolId: string): InfrastructureProject[] => {
  return infrastructureProjects.filter(project => project.schoolId === schoolId);
};

// Get feedback for a school
export const getFeedbackForSchool = (schoolId: string): Feedback[] => {
  return feedbacks.filter(feedback => feedback.schoolId === schoolId);
};

// Get activities for a school
export const getActivitiesForSchool = (schoolId: string): Activity[] => {
  return recentActivities.filter(activity => activity.schoolId === schoolId);
};

// Enrich schools with location data
export const getSchoolsWithLocations = (): (School & { location: Location })[] => {
  return schools.map(school => {
    const location = locations.find(loc => loc.id === school.locationId);
    return {
      ...school,
      location: location!
    };
  });
};
