export interface ActionResponse {
  classification: string;
  formalComplaint: string;
  recommendedAuthority: string;
  actionSteps: string[];
}

export interface ComplaintState {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: ActionResponse | null;
  error: string | null;
}
