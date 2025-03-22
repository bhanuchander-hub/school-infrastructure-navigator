
// Location type
export type Location = {
  id: string;
  stateName: string;
  districtName: string;
  townName: string;
  streetName: string;
  pincode: string;
  latitude: number;
  longitude: number;
};

// School category type
export type SchoolCategory = "Primary" | "Secondary" | "Higher Secondary";

// School status type
export type SchoolStatus = "Active" | "Inactive";

// Tap connection status type
export type TapConnectionStatus = "Connected" | "Pending" | "Rejected" | "Not Required";

// Water source type
export type WaterSourceType = "Borewell" | "Municipality" | "Hand Pump";

// Project status type
export type ProjectStatus = "Planned" | "In Progress" | "Completed" | "Cancelled";

// Project type
export type ProjectType = "Tap Connection" | "Sanitation" | "Electricity" | "Classroom Renovation" | "Furniture";

// Approval status type
export type ApprovalStatus = "Approved" | "Pending" | "Rejected";

// School type
export type School = {
  id: string;
  locationId: string;
  name: string;
  numberOfStudents: number;
  category: SchoolCategory;
  status: SchoolStatus;
  tapConnectionStatus: TapConnectionStatus;
  updateDate: string;
  location?: Location;
  tapConnection?: TapConnection;
};

// Tap connection type
export type TapConnection = {
  id: string;
  schoolId: string;
  connectionDate: string | null;
  status: TapConnectionStatus;
  waterSourceType: WaterSourceType | null;
  lastInspectionDate: string | null;
  school?: School;
};

// Infrastructure project type
export type InfrastructureProject = {
  id: string;
  schoolId: string;
  projectType: ProjectType;
  status: ProjectStatus;
  startDate: string;
  completionDate: string | null;
  school?: School;
};

// Registration type
export type Registration = {
  id: string;
  schoolId: string;
  registrationDate: string;
  approvalStatus: ApprovalStatus;
  school?: School;
};

// Feedback type
export type Feedback = {
  id: string;
  schoolId: string;
  feedbackText: string;
  rating: number;
  submittedDate: string;
  school?: School;
};

// Activity type for the timeline
export type ActivityType = "Registration" | "Connection" | "Inspection" | "Project" | "Feedback";

// Activity entry type
export type Activity = {
  id: string;
  type: ActivityType;
  schoolId: string;
  schoolName: string;
  date: string;
  description: string;
  status?: string;
};

// Dashboard statistics type
export type DashboardStats = {
  totalSchools: number;
  activeSchools: number;
  connectedTaps: number;
  pendingTaps: number;
  rejectedTaps: number;
  notRequiredTaps: number;
  totalProjects: number;
  completedProjects: number;
};

// Generic status count type
export type StatusCount = {
  status: string;
  count: number;
};
