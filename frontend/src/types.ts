export interface Application {
  id: number;
  candidateName: string;
  email: string;
  fullName: string;
  position: string;
  cvFilename?: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateProfile {
  candidateName: string;
  email: string;
  fullName: string;
}

export type UserRole = 'candidate' | 'recruiter';
