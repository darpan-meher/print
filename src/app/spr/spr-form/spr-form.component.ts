import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder, FormGroup, FormArray, Validators, AbstractControl
} from '@angular/forms';
import { SprDataService } from '../spr/spr-data.service';
import { SprData } from '../spr/models/spr.model';

// ── Photo Report item ──────────────────────────────────────────────────────────
export interface PhotoItem {
  poLine:      string;
  date:        string;
  activity:    string;
  description: string;
  previewUrl:  string;
  fileName:    string;
}

@Component({
  selector: 'app-spr-form',
  templateUrl: './spr-form.component.html',
  styleUrls: ['./spr-form.component.scss']
})
export class SprFormComponent implements OnInit {

  form!: FormGroup;
  activeSection = 'header';
  submitted     = false;

  // ── Supplier Logo ──────────────────────────────────────────────────────────
  logoPreviewUrl: string | null = null;
  logoFileName   = '';
  @ViewChild('logoFileInput') logoFileInput!: ElementRef<HTMLInputElement>;

  // ── Attachment: Schedule ──────────────────────────────────────────────────
  schedulePreviewUrl: string | null = null;
  scheduleFileName   = '';
  scheduleFileType   = '';          // 'image' | 'pdf' | 'other'
  isDragOverSchedule = false;
  @ViewChild('scheduleFileInput') scheduleFileInput!: ElementRef<HTMLInputElement>;

  // ── Attachment: Other notes ───────────────────────────────────────────────
  otherNotes = '';

  // ── Attachment: Photo Report ──────────────────────────────────────────────
  photos: PhotoItem[] = [];
  MAX_PHOTOS = 8;
  dragOverPhotoIdx: number | null = null;

  // temp form state for the "add photo" dialog
  photoForm: Partial<PhotoItem> = {};
  showPhotoDialog = false;
  editPhotoIdx: number | null = null;

  @ViewChild('photoFileInput') photoFileInput!: ElementRef<HTMLInputElement>;

  readonly activityOptions  = ['Fabrication', 'Assembly', 'Inspection', 'Testing', 'Blast', 'Paint', 'Insulation', 'Dispatch'];
  readonly otdOptions       = ['Actual OT', 'Forecast OT', 'Forecasted Late'];
  readonly docStatuses      = ['Closed', 'Open'];
  readonly statusOpts       = ['Open', 'Closed'];
  readonly ncrDispositions  = ['Open', 'Accepted', 'Rejected', 'Use As Is', 'Repair', 'Rework', 'Scrap', 'Closed'];
  readonly ncrSeverities    = ['Minor', 'Major', 'Critical'];

  sections = [
    { id: 'header',      label: 'SPR Header'              },
    { id: 'poLines',     label: 'PO-Line Progress'        },
    { id: 'engDocs',     label: 'Engineering / Q Docs'    },
    { id: 'progress',    label: 'Overall Progress'        },
    { id: 'contracts',   label: 'Contract & Changes'      },
    { id: 'inspection',  label: 'Witness Points'          },
    { id: 'subSupplier', label: 'Sub-suppliers'           },
    { id: 'ncr',         label: 'NCR / Deviation'         },
    { id: 'gevReview',   label: 'GEV Review'              },
    { id: 'concern',     label: 'Area of Concern'         },
    { id: 'keyActions',  label: 'Key Actions'             },
    { id: 'attachment',  label: 'Attachment'              },  // ← new tab
  ];

  constructor(
    private fb: FormBuilder,
    private sprService: SprDataService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.prefillFromService();
  }

  // ── Form construction ──────────────────────────────────────────────────────

  buildForm(): void {
    this.form = this.fb.group({
      version: this.fb.group({
        revNo:     ['', Validators.required],
        reference: ['', Validators.required],
        date:      ['', Validators.required],
      }),
      supplier:        ['', Validators.required],
      project:         ['', Validators.required],
      gevPo:           ['', Validators.required],
      supplierPo:      ['', Validators.required],
      supplierSummary: [''],
      totalPoProgress: [0, [Validators.required, Validators.min(0), Validators.max(100)]],

      poLineItems:      this.fb.array([]),
      engineeringDocs:  this.fb.array([]),
      overallProgress:  this.fb.array([]),
      contractChanges:  this.fb.array([]),
      inspectionPoints: this.fb.array([]),
      subSuppliers:     this.fb.array([]),
      ncrReports:       this.fb.array([]),
      gevReviews:       this.fb.array([]),
      areasOfConcern:   this.fb.array([]),
      keyActions:       this.fb.array([]),
    });
  }

  // ── Row builders ──────────────────────────────────────────────────────────

  buildPoLineRow(d?: any): FormGroup {
    return this.fb.group({
      poLine:          [d?.poLine          ?? '', Validators.required],
      unitNo:          [d?.unitNo          ?? '', Validators.required],
      itemDescription: [d?.itemDescription ?? '', Validators.required],
      erpPoNeedDate:   [d?.erpPoNeedDate   ?? ''],
      promiseDate:     [d?.promiseDate     ?? ''],
      currentStatus:   [d?.currentStatus   ?? ''],
      percent:         [d?.percent         ?? 0, [Validators.min(0), Validators.max(100)]],
      otdStatus:       [d?.otdStatus       ?? 'Forecast OT'],
      isLate:          [d?.isLate          ?? false],
    });
  }

  buildEngDocRow(d?: any): FormGroup {
    return this.fb.group({
      documentNo:             [d?.documentNo             ?? '', Validators.required],
      currentRevisionNo:      [d?.currentRevisionNo      ?? 0],
      title:                  [d?.title                  ?? '', Validators.required],
      panelLd:                [d?.panelLd                ?? 'No'],
      firstSubmissionDueDate: [d?.firstSubmissionDueDate ?? ''],
      actualSubmissionDate:   [d?.actualSubmissionDate   ?? ''],
      status:                 [d?.status                 ?? 'Open'],
    });
  }

  buildProgressRow(d?: any): FormGroup {
    return this.fb.group({
      category:        [d?.category        ?? '', Validators.required],
      baselineStart:   [d?.baselineStart   ?? ''],
      baselineFinish:  [d?.baselineFinish  ?? ''],
      forecastStart:   [d?.forecastStart   ?? ''],
      forecastFinish:  [d?.forecastFinish  ?? ''],
      weightage:       [d?.weightage       ?? 0, [Validators.min(0), Validators.max(100)]],
      reportedPercent: [d?.reportedPercent ?? 0, [Validators.min(0), Validators.max(100)]],
    });
  }

  buildContractRow(d?: any): FormGroup {
    return this.fb.group({
      no:                 [d?.no                 ?? '', Validators.required],
      category:           [d?.category           ?? '', Validators.required],
      referenceDoc:       [d?.referenceDoc       ?? ''],
      requestReceiveDate: [d?.requestReceiveDate ?? ''],
      impact:             [d?.impact             ?? ''],
      issueDescription:   [d?.issueDescription   ?? ''],
      poLines:            [d?.poLines            ?? ''],
    });
  }

  buildInspectionRow(d?: any): FormGroup {
    return this.fb.group({
      inspectionPoint: [d?.inspectionPoint ?? '', Validators.required],
      planned:         [d?.planned         ?? ''],
      actual:          [d?.actual          ?? ''],
      attendance:      [d?.attendance      ?? ''],
      status:          [d?.status          ?? ''],
    });
  }

  buildSubSupplierRow(d?: any): FormGroup {
    return this.fb.group({
      item:                [d?.item                ?? '', Validators.required],
      subSupplier:         [d?.subSupplier         ?? '', Validators.required],
      orderDatePlanned:    [d?.orderDatePlanned    ?? ''],
      orderDateActual:     [d?.orderDateActual     ?? ''],
      deliveryDatePlanned: [d?.deliveryDatePlanned ?? ''],
      deliveryDateActual:  [d?.deliveryDateActual  ?? ''],
      comments:            [d?.comments            ?? ''],
    });
  }

  buildGevReviewRow(d?: any): FormGroup {
    return this.fb.group({
      no:      [d?.no      ?? '', Validators.required],
      date:    [d?.date    ?? ''],
      comment: [d?.comment ?? ''],
      resp:    [d?.resp    ?? ''],
    });
  }

  buildConcernRow(d?: any): FormGroup {
    return this.fb.group({
      no:               [d?.no               ?? '', Validators.required],
      category:         [d?.category         ?? '', Validators.required],
      issueDescription: [d?.issueDescription ?? ''],
    });
  }

  buildNcrRow(d?: any): FormGroup {
    return this.fb.group({
      ncrNo:             [d?.ncrNo             ?? '', Validators.required],
      detailOfNc:        [d?.detailOfNc        ?? '', Validators.required],
      dispositionStatus: [d?.dispositionStatus ?? 'Open'],
      targetClosureDate: [d?.targetClosureDate ?? ''],
      raisedBy:          [d?.raisedBy          ?? ''],
      raisedDate:        [d?.raisedDate         ?? ''],
      severity:          [d?.severity           ?? 'Minor'],
      poLine:            [d?.poLine             ?? ''],
      description:       [d?.description        ?? ''],
    });
  }

  buildKeyActionRow(d?: any): FormGroup {
    return this.fb.group({
      no:                [d?.no                ?? '', Validators.required],
      date:              [d?.date              ?? ''],
      category:          [d?.category          ?? '', Validators.required],
      actionDescription: [d?.actionDescription ?? ''],
      targetDate:        [d?.targetDate        ?? ''],
      resp:              [d?.resp              ?? ''],
      status:            [d?.status            ?? 'Open'],
    });
  }

  // ── Prefill ────────────────────────────────────────────────────────────────

  prefillFromService(): void {
    const d: SprData = this.sprService.getData();
    this.form.patchValue({
      version: d.version, supplier: d.supplier, project: d.project,
      gevPo: d.gevPo, supplierPo: d.supplierPo,
      supplierSummary: d.supplierSummary, totalPoProgress: d.totalPoProgress,
    });
    d.poLineItems.forEach(r      => this.poLineItems.push(this.buildPoLineRow(r)));
    d.engineeringDocs.forEach(r  => this.engineeringDocs.push(this.buildEngDocRow(r)));
    d.overallProgress.forEach(r  => this.overallProgress.push(this.buildProgressRow(r)));
    d.contractChanges.forEach(r  => this.contractChanges.push(this.buildContractRow(r)));
    d.inspectionPoints.forEach(r => this.inspectionPoints.push(this.buildInspectionRow(r)));
    d.subSuppliers.forEach(r     => this.subSuppliers.push(this.buildSubSupplierRow(r)));
    d.gevReviews.forEach(r       => this.gevReviews.push(this.buildGevReviewRow(r)));
    d.areasOfConcern.forEach(r   => this.areasOfConcern.push(this.buildConcernRow(r)));
    d.keyActions.forEach(r       => this.keyActions.push(this.buildKeyActionRow(r)));
  }

  // ── FormArray accessors ────────────────────────────────────────────────────

  get poLineItems():      FormArray { return this.form.get('poLineItems')      as FormArray; }
  get engineeringDocs(): FormArray { return this.form.get('engineeringDocs')  as FormArray; }
  get overallProgress(): FormArray { return this.form.get('overallProgress')  as FormArray; }
  get contractChanges(): FormArray { return this.form.get('contractChanges')  as FormArray; }
  get inspectionPoints():FormArray { return this.form.get('inspectionPoints') as FormArray; }
  get subSuppliers():    FormArray { return this.form.get('subSuppliers')     as FormArray; }
  get ncrReports():      FormArray { return this.form.get('ncrReports')       as FormArray; }
  get gevReviews():      FormArray { return this.form.get('gevReviews')       as FormArray; }
  get areasOfConcern():  FormArray { return this.form.get('areasOfConcern')   as FormArray; }
  get keyActions():      FormArray { return this.form.get('keyActions')       as FormArray; }

  rowGroup(arr: FormArray, i: number): FormGroup { return arr.at(i) as FormGroup; }

  // ── Add / Remove rows ─────────────────────────────────────────────────────

  addPoLine()      { this.poLineItems.push(this.buildPoLineRow()); }
  addEngDoc()      { this.engineeringDocs.push(this.buildEngDocRow()); }
  addProgress()    { this.overallProgress.push(this.buildProgressRow()); }
  addContract()    { this.contractChanges.push(this.buildContractRow()); }
  addInspection()  { this.inspectionPoints.push(this.buildInspectionRow()); }
  addSubSupplier() { this.subSuppliers.push(this.buildSubSupplierRow()); }
  addNcr()         { this.ncrReports.push(this.buildNcrRow()); }
  addGevReview()   { this.gevReviews.push(this.buildGevReviewRow()); }
  addConcern()     { this.areasOfConcern.push(this.buildConcernRow()); }
  addKeyAction()   { this.keyActions.push(this.buildKeyActionRow()); }
  removeRow(arr: FormArray, i: number): void { arr.removeAt(i); }

  // ── Navigation — Next / Back / Go to section ─────────────────────────────

  get currentSectionIndex(): number {
    return this.sections.findIndex(s => s.id === this.activeSection);
  }

  get isFirstSection(): boolean { return this.currentSectionIndex === 0; }
  get isLastSection():  boolean { return this.currentSectionIndex === this.sections.length - 1; }

  setSection(id: string): void {
    this.activeSection = id;
    this.clearFormMessages();
  }

  goNext(): void {
    if (!this.isLastSection) {
      this.activeSection = this.sections[this.currentSectionIndex + 1].id;
      this.clearFormMessages();
    }
  }

  goBack(): void {
    if (!this.isFirstSection) {
      this.activeSection = this.sections[this.currentSectionIndex - 1].id;
      this.clearFormMessages();
    }
  }

  // ── Supplier Logo ──────────────────────────────────────────────────────────

  triggerLogoUpload(): void { this.logoFileInput.nativeElement.click(); }

  onLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.readLogoFile(file);
  }

  onLogoDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file?.type.startsWith('image/')) this.readLogoFile(file);
  }

  private readLogoFile(file: File): void {
    this.logoFileName = file.name;
    const reader = new FileReader();
    reader.onload = e => { this.logoPreviewUrl = e.target?.result as string; };
    reader.readAsDataURL(file);
  }

  removeLogo(): void {
    this.logoPreviewUrl = null; this.logoFileName = '';
    if (this.logoFileInput) this.logoFileInput.nativeElement.value = '';
  }

  // ══════════════════════════════════════════════════════════════════════════
  //  ATTACHMENT — Schedule upload
  // ══════════════════════════════════════════════════════════════════════════

  triggerScheduleUpload(): void { this.scheduleFileInput.nativeElement.click(); }

  onScheduleSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.processScheduleFile(file);
  }

  onScheduleDragOver(event: DragEvent): void {
    event.preventDefault(); this.isDragOverSchedule = true;
  }

  onScheduleDragLeave(): void { this.isDragOverSchedule = false; }

  onScheduleDrop(event: DragEvent): void {
    event.preventDefault(); this.isDragOverSchedule = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) this.processScheduleFile(file);
  }

  private processScheduleFile(file: File): void {
    this.scheduleFileName = file.name;
    if (file.type.startsWith('image/')) {
      this.scheduleFileType = 'image';
      const reader = new FileReader();
      reader.onload = e => { this.schedulePreviewUrl = e.target?.result as string; };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      this.scheduleFileType  = 'pdf';
      this.schedulePreviewUrl = null;
    } else {
      this.scheduleFileType  = 'other';
      this.schedulePreviewUrl = null;
    }
  }

  removeSchedule(): void {
    this.schedulePreviewUrl = null; this.scheduleFileName = ''; this.scheduleFileType = '';
    if (this.scheduleFileInput) this.scheduleFileInput.nativeElement.value = '';
  }

  // ══════════════════════════════════════════════════════════════════════════
  //  ATTACHMENT — Photo Report
  // ══════════════════════════════════════════════════════════════════════════

  // Open add dialog
  openAddPhotoDialog(): void {
    this.editPhotoIdx  = null;
    this.photoForm     = { poLine: '', date: '', activity: 'Fabrication', description: '' };
    this.showPhotoDialog = true;
  }

  // Open edit dialog
  openEditPhoto(i: number): void {
    this.editPhotoIdx   = i;
    this.photoForm      = { ...this.photos[i] };
    this.showPhotoDialog = true;
  }

  closePhotoDialog(): void { this.showPhotoDialog = false; this.photoForm = {}; }

  // Trigger hidden file input inside the dialog
  triggerPhotoUpload(): void { this.photoFileInput.nativeElement.click(); }

  onPhotoFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        this.photoForm.previewUrl = e.target?.result as string;
        this.photoForm.fileName   = file.name;
      };
      reader.readAsDataURL(file);
    }
  }

  onPhotoCellDrop(event: DragEvent, slotIndex: number): void {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (!file?.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = e => {
      const url = e.target?.result as string;
      if (slotIndex < this.photos.length) {
        // Drop onto existing photo — replace its image
        this.photos[slotIndex] = { ...this.photos[slotIndex], previewUrl: url, fileName: file.name };
      } else {
        // Drop onto empty slot — open dialog pre-filled with image
        this.photoForm = { previewUrl: url, fileName: file.name, poLine: '', date: '', activity: 'Fabrication', description: '' };
        this.editPhotoIdx   = null;
        this.showPhotoDialog = true;
      }
    };
    reader.readAsDataURL(file);
  }

  savePhotoDialog(): void {
    const photo: PhotoItem = {
      poLine:      this.photoForm.poLine      ?? '',
      date:        this.photoForm.date        ?? '',
      activity:    this.photoForm.activity    ?? '',
      description: this.photoForm.description ?? '',
      previewUrl:  this.photoForm.previewUrl  ?? '',
      fileName:    this.photoForm.fileName    ?? '',
    };
    if (this.editPhotoIdx !== null) {
      this.photos[this.editPhotoIdx] = photo;
    } else {
      this.photos.push(photo);
    }
    this.closePhotoDialog();
    if (this.photoFileInput) this.photoFileInput.nativeElement.value = '';
  }

  removePhoto(i: number): void { this.photos.splice(i, 1); }

  // Row/col helpers for 2-column photo grid rendered as table
  get photoRows(): PhotoItem[][] {
    const rows: PhotoItem[][] = [];
    for (let i = 0; i < this.MAX_PHOTOS; i += 2) {
      rows.push([this.photos[i], this.photos[i + 1]]);
    }
    return rows;
  }

  photoAt(i: number): PhotoItem | null { return this.photos[i] ?? null; }
  canAddPhoto(): boolean { return this.photos.length < this.MAX_PHOTOS; }

  // ── Form status messages ───────────────────────────────────────────────────

  formMessage: { type: 'success' | 'error' | 'draft' | 'warning'; text: string } | null = null;
  showSubmitConfirm = false;
  private messageTimer: any;

  clearFormMessages(): void {
    this.formMessage = null;
    clearTimeout(this.messageTimer);
  }

  private showMessage(type: 'success' | 'error' | 'draft' | 'warning', text: string, autoClear = true): void {
    clearTimeout(this.messageTimer);
    this.formMessage = { type, text };
    if (autoClear) {
      this.messageTimer = setTimeout(() => { this.formMessage = null; }, 4000);
    }
  }

  // ── Save Draft (persists to localStorage) ─────────────────────────────────

  saveDraft(): void {
    try {
      const draft = {
        formValue:      this.form.getRawValue(),
        scheduleFileName: this.scheduleFileName,
        scheduleFileType: this.scheduleFileType,
        otherNotes:     this.otherNotes,
        savedAt:        new Date().toISOString(),
      };
      localStorage.setItem('spr_draft', JSON.stringify(draft));
      this.showMessage('draft', `Draft saved — ${new Date().toLocaleTimeString()}`);
    } catch {
      this.showMessage('error', 'Could not save draft. Storage may be full.');
    }
  }

  loadDraft(): void {
    try {
      const raw = localStorage.getItem('spr_draft');
      if (!raw) { this.showMessage('warning', 'No saved draft found.'); return; }
      const draft = JSON.parse(raw);
      this.form.patchValue(draft.formValue ?? {});
      this.scheduleFileName = draft.scheduleFileName ?? '';
      this.scheduleFileType = draft.scheduleFileType ?? '';
      this.otherNotes       = draft.otherNotes ?? '';
      const saved = draft.savedAt ? new Date(draft.savedAt).toLocaleString() : '';
      this.showMessage('success', `Draft loaded — saved ${saved}`);
    } catch {
      this.showMessage('error', 'Could not load draft.');
    }
  }

  clearDraft(): void {
    localStorage.removeItem('spr_draft');
  }

  get hasDraft(): boolean {
    try { return !!localStorage.getItem('spr_draft'); } catch { return false; }
  }

  // ── Submit (with confirmation modal) ──────────────────────────────────────

  openSubmitConfirm(): void {
    this.submitted = true;
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.showMessage('error', 'Please fix the highlighted required fields before submitting.', false);
      // Jump to first section that has errors
      const firstInvalid = this.findFirstInvalidSection();
      if (firstInvalid) this.activeSection = firstInvalid;
      return;
    }
    this.showSubmitConfirm = true;
  }

  closeSubmitConfirm(): void { this.showSubmitConfirm = false; }

  onSubmit(): void {
    this.showSubmitConfirm = false;
    try {
      const payload = {
        ...this.form.getRawValue(),
        scheduleFileName: this.scheduleFileName,
        otherNotes:       this.otherNotes,
        photos:           this.photos,
        submittedAt:      new Date().toISOString(),
      };
      console.log('SPR Submitted:', payload);
      this.clearDraft();
      this.showMessage('success', '✓ SPR submitted successfully!');
    } catch {
      this.showMessage('error', 'Submission failed. Please try again.');
    }
  }

  /** Find the id of the first section with an invalid control */
  private findFirstInvalidSection(): string | null {
    const sectionControlMap: { sectionId: string; paths: string[] }[] = [
      { sectionId: 'header',      paths: ['version.revNo','version.reference','version.date','supplier','project','gevPo','supplierPo'] },
      { sectionId: 'poLines',     paths: ['poLineItems'] },
      { sectionId: 'engDocs',     paths: ['engineeringDocs'] },
      { sectionId: 'progress',    paths: ['overallProgress'] },
      { sectionId: 'contracts',   paths: ['contractChanges'] },
      { sectionId: 'inspection',  paths: ['inspectionPoints'] },
      { sectionId: 'subSupplier', paths: ['subSuppliers'] },
      { sectionId: 'ncr',         paths: ['ncrReports'] },
      { sectionId: 'gevReview',   paths: ['gevReviews'] },
      { sectionId: 'concern',     paths: ['areasOfConcern'] },
      { sectionId: 'keyActions',  paths: ['keyActions'] },
    ];
    for (const entry of sectionControlMap) {
      for (const path of entry.paths) {
        const ctrl = this.form.get(path);
        if (ctrl && ctrl.invalid) return entry.sectionId;
      }
    }
    return null;
  }

  // ── Reset ─────────────────────────────────────────────────────────────────

  onReset(): void {
    this.submitted = false;
    [
      this.poLineItems, this.engineeringDocs, this.overallProgress,
      this.contractChanges, this.inspectionPoints, this.subSuppliers,
      this.ncrReports, this.gevReviews, this.areasOfConcern, this.keyActions
    ].forEach(a => a.clear());
    this.form.reset();
    this.schedulePreviewUrl = null; this.scheduleFileName = ''; this.scheduleFileType = '';
    this.photos = []; this.otherNotes = '';
    this.showSubmitConfirm = false;
    this.clearFormMessages();
  }

  // ── Validation helpers ─────────────────────────────────────────────────────

  isInvalid(ctrl: AbstractControl | null): boolean {
    return !!ctrl && ctrl.invalid && (ctrl.touched || this.submitted);
  }

  ctrl(path: string): AbstractControl | null { return this.form.get(path); }
}
