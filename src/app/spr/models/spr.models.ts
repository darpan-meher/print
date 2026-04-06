export interface SprHeader {
  revNo: string;
  reference: string;
  date: string;
}

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

export interface EngDocItem {
  documentNo: string;
  currentRevisionNo: number | string;
  title: string;
  panelLd: string;
  firstSubmissionDueDate: string;
  actualSubmissionDate: string;
  status: 'Closed' | 'Open';
}

export interface OverallProgress {
  category: string;
  baselineStart: string;
  baselineFinish: string;
  forecastStart: string;
  forecastFinish: string;
  weightage: number;
  reportedPercent: number;
}

export interface ContractChange {
  no: number;
  category: string;
  referenceDoc: string;
  requestReceiveDate: string;
  impact: string;
  issueDescription: string;
  poLines: string;
}

export interface InspectionPoint {
  point: string;
  planned: string;
  actual: string;
  attendance: string;
  status: string;
}

export interface SubSupplier {
  item: string;
  subSupplier: string;
  orderPlanned: string;
  orderActual: string;
  deliveryPlanned: string;
  deliveryActual: string;
  comments: string;
}

export interface GevReview {
  no: number;
  date: string;
  comment: string;
  resp: string;
}

export interface AreaOfConcern {
  no: number;
  category: string;
  issueDescription: string;
}

export interface KeyAction {
  no: number;
  date: string;
  category: string;
  actionDescription: string;
  targetDate: string;
  resp: string;
  status: string;
}

export interface SprData {
  header: SprHeader;
  supplier: string;
  project: string;
  gevPo: string;
  supplierPo: string;
  supplierSummary: string;
  poLineItems: PoLineItem[];
  engDocItems: EngDocItem[];
  overallProgress: OverallProgress[];
  totalPoProgress: number;
  contractChanges: ContractChange[];
  inspectionPoints: InspectionPoint[];
  subSuppliers: SubSupplier[];
  gevReviews: GevReview[];
  areasOfConcern: AreaOfConcern[];
  keyActions: KeyAction[];
}
