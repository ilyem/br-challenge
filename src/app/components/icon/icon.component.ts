import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  template: `<div [innerHTML]="svgIcon"></div>`,
  styleUrls: ['./icon.component.css'],
})
export class IconComponent implements OnInit {
  @Input()
  public name?: string;

  public svgIcon: any;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.httpClient
      .get(`assets/${this.name}.svg`, { responseType: 'text' })
      .subscribe((value) => {
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
      });
  }
}
