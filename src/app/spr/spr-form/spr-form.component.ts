import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder, FormGroup, FormArray, Validators, AbstractControl
} from '@angular/forms';
import { SprDataService } from '../spr/spr-data.service';
import { SprData } from '../spr/models/spr.model';

@Component({
  selector: 'app-spr-form',
  templateUrl: './spr-form.component.html',
  styleUrls: ['./spr-form.component.scss']
})
export class SprFormComponent implements OnInit {

  form!: FormGroup;
  activeSection = 'header';
  submitted = false;

  // ── Supplier Logo ──────────────────────────────────────────────────────────
  logoPreviewUrl: string | null = null;
  logoFileName   = '';

  @ViewChild('logoFileInput') logoFileInput!: ElementRef<HTMLInputElement>;

  readonly otdOptions  = ['Actual OT', 'Forecast OT', 'Forecasted Late'];
  readonly docStatuses = ['Closed', 'Open'];
  readonly statusOpts  = ['Open', 'Closed'];

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

      // ── SPR Header / version ─────────────────────────────────────
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

      // ── FormArrays for each table ─────────────────────────────────
      poLineItems:     this.fb.array([]),
      engineeringDocs: this.fb.array([]),
      overallProgress: this.fb.array([]),
      contractChanges: this.fb.array([]),
      inspectionPoints:this.fb.array([]),
      subSuppliers:    this.fb.array([]),
      gevReviews:      this.fb.array([]),
      areasOfConcern:  this.fb.array([]),
      keyActions:      this.fb.array([]),
    });
  }

  // ── Row-builder helpers (one per FormArray) ────────────────────────────────

  buildPoLineRow(d?: any): FormGroup {
    return this.fb.group({
      poLine:          [d?.poLine          ?? '',  Validators.required],
      unitNo:          [d?.unitNo          ?? '',  Validators.required],
      itemDescription: [d?.itemDescription ?? '',  Validators.required],
      erpPoNeedDate:   [d?.erpPoNeedDate   ?? ''],
      promiseDate:     [d?.promiseDate     ?? ''],
      currentStatus:   [d?.currentStatus   ?? ''],
      percent:         [d?.percent         ?? 0,   [Validators.min(0), Validators.max(100)]],
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
      weightage:       [d?.weightage       ?? 0,  [Validators.min(0), Validators.max(100)]],
      reportedPercent: [d?.reportedPercent ?? 0,  [Validators.min(0), Validators.max(100)]],
    });
  }

  buildContractRow(d?: any): FormGroup {
    return this.fb.group({
      no:                 [d?.no                 ?? '',  Validators.required],
      category:           [d?.category           ?? '',  Validators.required],
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
      no:      [d?.no      ?? '',  Validators.required],
      date:    [d?.date    ?? ''],
      comment: [d?.comment ?? ''],
      resp:    [d?.resp    ?? ''],
    });
  }

  buildConcernRow(d?: any): FormGroup {
    return this.fb.group({
      no:               [d?.no               ?? '',  Validators.required],
      category:         [d?.category         ?? '',  Validators.required],
      issueDescription: [d?.issueDescription ?? ''],
    });
  }

  buildKeyActionRow(d?: any): FormGroup {
    return this.fb.group({
      no:                [d?.no                ?? '',  Validators.required],
      date:              [d?.date              ?? ''],
      category:          [d?.category          ?? '',  Validators.required],
      actionDescription: [d?.actionDescription ?? ''],
      targetDate:        [d?.targetDate        ?? ''],
      resp:              [d?.resp              ?? ''],
      status:            [d?.status            ?? 'Open'],
    });
  }

  // ── Prefill from service data ──────────────────────────────────────────────

  prefillFromService(): void {
    const d: SprData = this.sprService.getData();

    this.form.patchValue({
      version:         d.version,
      supplier:        d.supplier,
      project:         d.project,
      gevPo:           d.gevPo,
      supplierPo:      d.supplierPo,
      supplierSummary: d.supplierSummary,
      totalPoProgress: d.totalPoProgress,
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
  get gevReviews():      FormArray { return this.form.get('gevReviews')       as FormArray; }
  get areasOfConcern():  FormArray { return this.form.get('areasOfConcern')   as FormArray; }
  get keyActions():      FormArray { return this.form.get('keyActions')       as FormArray; }

  rowGroup(arr: FormArray, i: number): FormGroup {
    return arr.at(i) as FormGroup;
  }

  // ── Add / Remove row helpers ───────────────────────────────────────────────

  addPoLine()       { this.poLineItems.push(this.buildPoLineRow()); }
  addEngDoc()       { this.engineeringDocs.push(this.buildEngDocRow()); }
  addProgress()     { this.overallProgress.push(this.buildProgressRow()); }
  addContract()     { this.contractChanges.push(this.buildContractRow()); }
  addInspection()   { this.inspectionPoints.push(this.buildInspectionRow()); }
  addSubSupplier()  { this.subSuppliers.push(this.buildSubSupplierRow()); }
  addGevReview()    { this.gevReviews.push(this.buildGevReviewRow()); }
  addConcern()      { this.areasOfConcern.push(this.buildConcernRow()); }
  addKeyAction()    { this.keyActions.push(this.buildKeyActionRow()); }

  removeRow(arr: FormArray, i: number): void { arr.removeAt(i); }

  // ── Navigation ─────────────────────────────────────────────────────────────

  setSection(id: string): void { this.activeSection = id; }

  // ── Logo upload ────────────────────────────────────────────────────────────

  triggerLogoUpload(): void {
    this.logoFileInput.nativeElement.click();
  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) { this.readLogoFile(file); }
  }

  onLogoDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) { this.readLogoFile(file); }
  }

  private readLogoFile(file: File): void {
    this.logoFileName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.logoPreviewUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeLogo(): void {
    this.logoPreviewUrl = null;
    this.logoFileName   = '';
    if (this.logoFileInput) {
      this.logoFileInput.nativeElement.value = '';
    }
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('SPR Form Value:', this.form.getRawValue());
    alert('Form submitted successfully! Check console for data.');
  }

  onReset(): void {
    this.submitted = false;
    this.poLineItems.clear();
    this.engineeringDocs.clear();
    this.overallProgress.clear();
    this.contractChanges.clear();
    this.inspectionPoints.clear();
    this.subSuppliers.clear();
    this.gevReviews.clear();
    this.areasOfConcern.clear();
    this.keyActions.clear();
    this.form.reset();
  }

  // ── Validation helpers ─────────────────────────────────────────────────────

  isInvalid(ctrl: AbstractControl | null): boolean {
    return !!ctrl && ctrl.invalid && (ctrl.touched || this.submitted);
  }

  ctrl(path: string): AbstractControl | null {
    return this.form.get(path);
  }
}
