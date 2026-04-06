import { Injectable } from '@angular/core';
import { SprData } from './models/spr.model';

@Injectable({ providedIn: 'root' })
export class SprDataService {
  getData(): SprData {
    return {
      version: { revNo: '08', reference: '2025-June', date: '13-Jun-25' },
      supplier: '10780000 -Sisu Energy & Environmental, LLC - TULSA-OK-USA',
      project: 'IPS - Project name - Project country',
      gevPo: '4102574305',
      supplierPo: 'XXXXXXXXXXX',
      supplierSummary: "Stack anchor bolt templates for all 16 units complete in WMSA; possibly ship in September. Fabrication in process on unit #'s 1-12 (various stages of production). Will start coordinating final inspections of completed units in August. May try to batch several units together to minimize travel for inspections.",
      poLineItems: [
        { poLine: 20,  unitNo: 'Units 1-8',  itemDescription: 'Upper & Lower Stac', erpPoNeedDate: '1-May-25',  promiseDate: '1-Apr-25',  currentStatus: 'RTS Declared',  percent: 100, otdStatus: 'Actual OT' },
        { poLine: 30,  unitNo: 'Units 9-16', itemDescription: 'Upper & Lower Stac', erpPoNeedDate: '1-Jul-25',  promiseDate: '1-May-25',  currentStatus: 'RTS Declared',  percent: 100, otdStatus: 'Actual OT' },
        { poLine: 40,  unitNo: '1',          itemDescription: 'Gas Path Ducts',     erpPoNeedDate: '1-Oct-25',  promiseDate: '1-Oct-25',  currentStatus: 'Manufacturing', percent: 80,  otdStatus: 'Forecast OT' },
        { poLine: 50,  unitNo: '1',          itemDescription: 'Stack',              erpPoNeedDate: '1-Oct-25',  promiseDate: '1-Oct-25',  currentStatus: 'Manufacturing', percent: 25,  otdStatus: 'Forecast OT' },
        { poLine: 60,  unitNo: '1',          itemDescription: 'CO Catalyst Ready',  erpPoNeedDate: '1-Dec-25',  promiseDate: '1-Nov-25',  currentStatus: 'Procurement',   percent: 0,   otdStatus: 'Forecasted Late', isLate: true },
        { poLine: 70,  unitNo: '1',          itemDescription: 'NOx Catalyst Ready', erpPoNeedDate: '1-Dec-25',  promiseDate: '1-Nov-25',  currentStatus: 'Procurement',   percent: 0,   otdStatus: 'Forecasted Late', isLate: true },
        { poLine: 80,  unitNo: '1',          itemDescription: 'Tempering Air Fan',  erpPoNeedDate: '1-Oct-25',  promiseDate: '1-Oct-25',  currentStatus: 'Manufacturing', percent: 50,  otdStatus: 'Forecast OT' },
        { poLine: 90,  unitNo: '1',          itemDescription: 'Filters/Silencers',  erpPoNeedDate: '1-Oct-25',  promiseDate: '1-Oct-25',  currentStatus: 'Manufacturing', percent: 50,  otdStatus: 'Forecast OT' },
        { poLine: 100, unitNo: '2',          itemDescription: 'Gas Path Ducts',     erpPoNeedDate: '15-Oct-25', promiseDate: '15-Oct-25', currentStatus: 'Manufacturing', percent: 70,  otdStatus: 'Forecast OT' },
        { poLine: 110, unitNo: '2',          itemDescription: 'Stack',              erpPoNeedDate: '15-Oct-25', promiseDate: '15-Oct-25', currentStatus: 'Manufacturing', percent: 25,  otdStatus: 'Forecast OT' },
        { poLine: 120, unitNo: '2',          itemDescription: 'CO Catalyst Ready',  erpPoNeedDate: '15-Dec-25', promiseDate: '1-Nov-25',  currentStatus: 'Procurement',   percent: 0,   otdStatus: 'Forecasted Late', isLate: true },
        { poLine: 130, unitNo: '2',          itemDescription: 'NOx Catalyst Ready', erpPoNeedDate: '15-Dec-25', promiseDate: '1-Nov-25',  currentStatus: 'Procurement',   percent: 0,   otdStatus: 'Forecasted Late', isLate: true },
        { poLine: 140, unitNo: '2',          itemDescription: 'Tempering Air Fan',  erpPoNeedDate: '15-Oct-25', promiseDate: '15-Oct-25', currentStatus: 'Manufacturing', percent: 50,  otdStatus: 'Forecast OT' },
        { poLine: 150, unitNo: '2',          itemDescription: 'Filters/Silencers',  erpPoNeedDate: '15-Oct-25', promiseDate: '15-Oct-25', currentStatus: 'Manufacturing', percent: 50,  otdStatus: 'Forecast OT' },
        { poLine: 160, unitNo: '3',          itemDescription: 'Gas Path Ducts',     erpPoNeedDate: '1-Nov-25',  promiseDate: '1-Nov-25',  currentStatus: 'Manufacturing', percent: 80,  otdStatus: 'Forecast OT' },
        { poLine: 170, unitNo: '3',          itemDescription: 'Stack',              erpPoNeedDate: '1-Nov-25',  promiseDate: '1-Nov-25',  currentStatus: 'Manufacturing', percent: 20,  otdStatus: 'Forecast OT' },
        { poLine: 180, unitNo: '3',          itemDescription: 'CO Catalyst Ready',  erpPoNeedDate: '5-Jan-26',  promiseDate: '1-Dec-25',  currentStatus: 'Procurement',   percent: 0,   otdStatus: 'Forecasted Late', isLate: true },
        { poLine: 190, unitNo: '3',          itemDescription: 'NOx Catalyst Ready', erpPoNeedDate: '5-Jan-26',  promiseDate: '1-Dec-25',  currentStatus: 'Procurement',   percent: 0,   otdStatus: 'Forecasted Late', isLate: true },
        { poLine: 200, unitNo: '3',          itemDescription: 'Tempering Air Fan',  erpPoNeedDate: '1-Nov-25',  promiseDate: '1-Nov-25',  currentStatus: 'Manufacturing', percent: 50,  otdStatus: 'Forecast OT' },
        { poLine: 210, unitNo: '3',          itemDescription: 'Filters/Silencers',  erpPoNeedDate: '1-Nov-25',  promiseDate: '1-Nov-25',  currentStatus: 'Manufacturing', percent: 50,  otdStatus: 'Forecast OT' },
        { poLine: 220, unitNo: '4',          itemDescription: 'Gas Path Ducts',     erpPoNeedDate: '15-Nov-25', promiseDate: '15-Nov-25', currentStatus: 'Manufacturing', percent: 50,  otdStatus: 'Forecast OT' },
        { poLine: 230, unitNo: '4',          itemDescription: 'Stack',              erpPoNeedDate: '15-Nov-25', promiseDate: '15-Nov-25', currentStatus: 'Manufacturing', percent: 15,  otdStatus: 'Forecast OT' },
        { poLine: 240, unitNo: '4',          itemDescription: 'CO Catalyst Ready',  erpPoNeedDate: '15-Jan-26', promiseDate: '1-Dec-25',  currentStatus: 'Procurement',   percent: 0,   otdStatus: 'Forecasted Late', isLate: true },
        { poLine: 250, unitNo: '4',          itemDescription: 'NOx Catalyst Ready', erpPoNeedDate: '19-Jan-26', promiseDate: '1-Dec-25',  currentStatus: 'Procurement',   percent: 0,   otdStatus: 'Forecasted Late', isLate: true },
        { poLine: 260, unitNo: '4',          itemDescription: 'Tempering Air Fan',  erpPoNeedDate: '15-Nov-25', promiseDate: '15-Nov-25', currentStatus: 'Manufacturing', percent: 50,  otdStatus: 'Forecast OT' },
        { poLine: 270, unitNo: '4',          itemDescription: 'Filters/Silencers',  erpPoNeedDate: '15-Nov-25', promiseDate: '15-Nov-25', currentStatus: 'Manufacturing', percent: 50,  otdStatus: 'Forecast OT' },
        { poLine: 280, unitNo: '5',          itemDescription: 'Gas Path Ducts',     erpPoNeedDate: '1-Dec-25',  promiseDate: '1-Dec-25',  currentStatus: 'Manufacturing', percent: 25,  otdStatus: 'Forecast OT' },
        { poLine: 290, unitNo: '5',          itemDescription: 'Stack',              erpPoNeedDate: '1-Dec-25',  promiseDate: '1-Dec-25',  currentStatus: 'Manufacturing', percent: 10,  otdStatus: 'Forecast OT' },
        { poLine: 300, unitNo: '5',          itemDescription: 'CO Catalyst Ready',  erpPoNeedDate: '2-Feb-26',  promiseDate: '1-Jan-27',  currentStatus: 'Procurement',   percent: 0,   otdStatus: 'Forecasted Late', isLate: true },
        { poLine: 310, unitNo: '5',          itemDescription: 'NOx Catalyst Ready', erpPoNeedDate: '2-Feb-26',  promiseDate: '1-Jan-27',  currentStatus: 'Procurement',   percent: 0,   otdStatus: 'Forecasted Late', isLate: true },
        { poLine: 320, unitNo: '5',          itemDescription: 'Tempering Air Fan',  erpPoNeedDate: '1-Dec-25',  promiseDate: '1-Dec-25',  currentStatus: 'Manufacturing', percent: 10,  otdStatus: 'Forecast OT' },
        { poLine: 330, unitNo: '5',          itemDescription: 'Filters/Silencers',  erpPoNeedDate: '1-Dec-25',  promiseDate: '1-Dec-25',  currentStatus: 'Manufacturing', percent: 10,  otdStatus: 'Forecast OT' },
        { poLine: 340, unitNo: '6',          itemDescription: 'Gas Path Ducts',     erpPoNeedDate: '15-Dec-25', promiseDate: '15-Dec-25', currentStatus: 'Manufacturing', percent: 25,  otdStatus: 'Forecast OT' },
      ],
      engineeringDocs: [
        { documentNo: '24016-0001A', currentRevisionNo: 3, title: 'General Arrangement', panelLd: 'No', firstSubmissionDueDate: '30-Jul-24', actualSubmissionDate: '2-Jun-25',  status: 'Closed' },
        { documentNo: '24016-0002A', currentRevisionNo: 2, title: 'General Arrangement', panelLd: 'No', firstSubmissionDueDate: '30-Jul-24', actualSubmissionDate: '10-Feb-25', status: 'Closed' },
        { documentNo: '24016-0003A', currentRevisionNo: 3, title: 'General Arrangement', panelLd: 'No', firstSubmissionDueDate: '30-Jul-24', actualSubmissionDate: '2-Jun-25',  status: 'Closed' },
        { documentNo: '24016-0004',  currentRevisionNo: 2, title: 'General Arrangement', panelLd: 'No', firstSubmissionDueDate: '30-Jul-24', actualSubmissionDate: '2-Jun-25',  status: 'Closed' },
        { documentNo: '24016-0006',  currentRevisionNo: 1, title: 'General Arrangement', panelLd: 'No', firstSubmissionDueDate: '30-Jul-24', actualSubmissionDate: '11-Feb-25', status: 'Closed' },
        { documentNo: '24016-0010',  currentRevisionNo: 0, title: 'Foundation Loading Plan', panelLd: 'No', firstSubmissionDueDate: '30-Jul-24', actualSubmissionDate: '28-Oct-24', status: 'Closed' },
        { documentNo: '24016-0013',  currentRevisionNo: 1, title: 'Foundation Installation', panelLd: 'No', firstSubmissionDueDate: '30-Jul-24', actualSubmissionDate: '13-Dec-34', status: 'Closed' },
        { documentNo: '24016-0020',  currentRevisionNo: 0, title: 'Piping & Instrument Dia', panelLd: 'No', firstSubmissionDueDate: '30-Jul-24', actualSubmissionDate: '10-Oct-24', status: 'Open' },
        { documentNo: '24016-0021A', currentRevisionNo: 2, title: 'Simple Cycle, Emission', panelLd: 'No', firstSubmissionDueDate: '30-Jul-24', actualSubmissionDate: '28-Jan-25', status: 'Open' },
        { documentNo: '24016-0022A', currentRevisionNo: 1, title: 'Ammonia Metering Rack', panelLd: 'No', firstSubmissionDueDate: '30-Jul-24', actualSubmissionDate: '28-Jan-25', status: 'Open' },
      ],
      overallProgress: [
        { category: 'Engineering',              baselineStart: '18-Jun-24', baselineFinish: '1-May-25',  forecastStart: '18-Jun-24', forecastFinish: '1-May-25',  weightage: 10,   reportedPercent: 100 },
        { category: 'Material / Procurement',   baselineStart: '21-Aug-24', baselineFinish: '1-May-25',  forecastStart: '21-Aug-24', forecastFinish: '1-May-25',  weightage: 30,   reportedPercent: 100 },
        { category: 'Mfg / Fab / Assembly 25%', baselineStart: '15-Jan-25', baselineFinish: '4-Nov-25',  forecastStart: '15-Jan-25', forecastFinish: '4-Nov-25',  weightage: 12.5, reportedPercent: 31 },
        { category: 'Mfg / Fab / Assembly 50%', baselineStart: '9-Apr-25',  baselineFinish: '20-Jan-26', forecastStart: '9-Apr-25',  forecastFinish: '20-Jan-26', weightage: 12.5, reportedPercent: 8 },
        { category: 'Mfg / Fab / Assembly 75%', baselineStart: '4-Jun-25',  baselineFinish: '7-Jul-26',  forecastStart: '4-Jun-25',  forecastFinish: '7-Jul-26',  weightage: 12.5, reportedPercent: 2 },
        { category: 'Mfg / Fab / Assembly 100%',baselineStart: '30-Jul-25', baselineFinish: '1-Sep-26',  forecastStart: '30-Jul-25', forecastFinish: '1-Sep-26',  weightage: 12.5, reportedPercent: 0 },
        { category: 'Testing',                  baselineStart: '15-Sep-25', baselineFinish: '11-Sep-26', forecastStart: '15-Sep-25', forecastFinish: '11-Sep-26', weightage: 5,    reportedPercent: 0 },
        { category: 'Packing / Dispatch',        baselineStart: '22-Sep-25', baselineFinish: '15-Sep-26', forecastStart: '22-Sep-25', forecastFinish: '15-Sep-26', weightage: 5,    reportedPercent: 0 },
      ],
      totalPoProgress: 45,
      contractChanges: [
        { no: 1, category: 'GEV request for changing delivery date', referenceDoc: 'ICO xxxxxxx', requestReceiveDate: '19/Feb/2025', impact: 'Schedule / Delivery', issueDescription: 'Change order submitted on 2/19 for change in catalyst RTS dates. (cost for storage and/or production changes at each catalyst mfg.)', poLines: '60; 70; 120; 130; —' }
      ],
      inspectionPoints: [
        { inspectionPoint: 'Final Insp. Unit #1 (**tentative**)', planned: '15-Sep-25', actual: '15-Sep-25', attendance: 'GEV SQE / End Customer', status: 'Provide 20 days notice per inspection' }
      ],
      subSuppliers: [
        { item: "Stacks/L&P's", subSupplier: 'Fox Equip.', orderDatePlanned: '18-Jun-24', orderDateActual: '1-May-25',  deliveryDatePlanned: '', deliveryDateActual: '', comments: 'See production schedule' },
        { item: 'Ducts/Modules', subSupplier: 'Elite',     orderDatePlanned: '21-Aug-24', orderDateActual: '21-Aug-24', deliveryDatePlanned: '', deliveryDateActual: '', comments: '' },
      ],
      gevReviews: [
        { no: 1, date: '13-Jun-25', comment: 'MPR-June version approved without comment', resp: 'Raphael Bellini' }
      ],
      areasOfConcern: [
        { no: 1, category: 'Logistics', issueDescription: 'GE to provide info on schedule slippage (if necessary) so shops can plan production or prepare for storage options.' }
      ],
      keyActions: [
        { no: 1, date: '19-Feb-25', category: 'Commercial', actionDescription: "Amend PO-lines' CDD for Catalysts", targetDate: '25-Jun-25', resp: 'Grant Quesnell', status: 'Open' }
      ]
    };
  }
}
