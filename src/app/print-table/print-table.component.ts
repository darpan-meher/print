import { Component, OnInit } from '@angular/core';

export interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  email: string;
  salary: number;
  joinDate: string;
  status: string;
}

@Component({
  selector: 'app-print-table',
  templateUrl: './print-table.component.html',
  styleUrls: ['./print-table.component.scss']
})
export class PrintTableComponent implements OnInit {
  pageTitle = 'Employee Directory Report';
  companyName = 'Acme Corporation';
  reportDate = new Date().toLocaleDateString();

  employees: Employee[] = [];
  leftTableData: Employee[] = [];
  rightTableData: Employee[] = [];

  ngOnInit(): void {
    this.employees = this.generateData();
    this.splitTableData();
  }

  generateData(): Employee[] {
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
    const roles = ['Manager', 'Senior', 'Junior', 'Lead', 'Associate'];
    const statuses = ['Active', 'On Leave', 'Remote'];

    return Array.from({ length: 80 }, (_, i) => ({
      id: 1001 + i,
      name: `Employee ${i + 1}`,
      department: departments[i % departments.length],
      role: roles[i % roles.length],
      email: `emp${i + 1}@acme.com`,
      salary: 40000 + (i * 1500),
      joinDate: `2020-0${(i % 9) + 1}-15`,
      status: statuses[i % statuses.length]
    }));
  }

  splitTableData(): void {
    const mid = Math.ceil(this.employees.length / 2);
    this.leftTableData = this.employees.slice(0, mid);
    this.rightTableData = this.employees.slice(mid);
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }

  printPage(): void {
    window.print();
  }
}
