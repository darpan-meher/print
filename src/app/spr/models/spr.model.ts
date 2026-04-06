// ── SPR Version info ──────────────────────────────────────────────────────────
export interface SprVersion {
  revNo: string;
  reference: string;
  date: string;
}

// ── Page 1: PO-Line Progress ──────────────────────────────────────────────────
export interface PoLineItem {
  poLine: number;
  unitNo: string;
  itemDescription: string;
  erpPoNeedDate: string;
  promiseDate: string;
  currentStatus: string;
  percent: number;
  otdStatus: 'Actual OT' | 'Forecast OT' | 'Forecasted Late';
  isLate?: boolean;
}

// ── Page 1: Engineering / Quality Document Submission list ───────────────────
export interface EngineeringDoc {
  documentNo: string;
  currentRevisionNo: number;
  title: string;
  panelLd: string;
  firstSubmissionDueDate: string;
  actualSubmissionDate: string;
  status: 'Closed' | 'Open';
}

// ── Page 2: Overall Progress ──────────────────────────────────────────────────
export interface OverallProgress {
  category: string;
  baselineStart: string;
  baselineFinish: string;
  forecastStart: string;
  forecastFinish: string;
  weightage: number;
  reportedPercent: number;
  stageNo?: number;
}

// ── Page 2: Contract and Changes ──────────────────────────────────────────────
export interface ContractChange {
  no: number;
  category: string;
  referenceDoc: string;
  requestReceiveDate: string;
  impact: string;
  issueDescription: string;
  poLines: string;
}

// ── Page 2: GEV / End Customer Witness Points ─────────────────────────────────
export interface InspectionPoint {
  inspectionPoint: string;
  planned: string;
  actual: string;
  attendance: string;
  status: string;
}

// ── Page 2: Purchasing / Subcontracting ───────────────────────────────────────
export interface SubSupplier {
  item: string;
  subSupplier: string;
  orderDatePlanned: string;
  orderDateActual: string;
  deliveryDatePlanned: string;
  deliveryDateActual: string;
  comments: string;
}

// ── Page 2: GEV Review ────────────────────────────────────────────────────────
export interface GevReview {
  no: number;
  date: string;
  comment: string;
  resp: string;
}

// ── Page 2: Area of Concern ───────────────────────────────────────────────────
export interface AreaOfConcern {
  no: number;
  category: string;
  issueDescription: string;
}

// ── Page 2: Key Actions ───────────────────────────────────────────────────────
export interface KeyAction {
  no: number;
  date: string;
  category: string;
  actionDescription: string;
  targetDate: string;
  resp: string;
  status: string;
}

// ── Root data object ──────────────────────────────────────────────────────────
export interface SprData {
  version: SprVersion;
  supplier: string;
  project: string;
  gevPo: string;
  supplierPo: string;
  supplierSummary: string;
  poLineItems: PoLineItem[];
  engineeringDocs: EngineeringDoc[];
  overallProgress: OverallProgress[];
  totalPoProgress: number;
  contractChanges: ContractChange[];
  inspectionPoints: InspectionPoint[];
  subSuppliers: SubSupplier[];
  gevReviews: GevReview[];
  areasOfConcern: AreaOfConcern[];
  keyActions: KeyAction[];
}
