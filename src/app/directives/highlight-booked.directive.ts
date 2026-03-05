import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightBooked]',
  standalone: true
})
export class HighlightBookedDirective implements OnInit {
  @Input() appHighlightBooked: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appHighlightBooked) {
      this.el.nativeElement.style.backgroundColor = '#ffebee';
      this.el.nativeElement.style.borderLeft = '4px solid #e74c3c';
      this.el.nativeElement.style.opacity = '0.6';
      this.el.nativeElement.style.pointerEvents = 'none';
      const badge = document.createElement('span');
      badge.className = 'booked-badge';
      badge.textContent = 'FULLY BOOKED';
      badge.style.position = 'absolute';
      badge.style.top = '10px';
      badge.style.right = '10px';
      badge.style.backgroundColor = '#e74c3c';
      badge.style.color = 'white';
      badge.style.padding = '4px 8px';
      badge.style.borderRadius = '4px';
      badge.style.fontSize = '12px';
      badge.style.fontWeight = 'bold';
      this.el.nativeElement.style.position = 'relative';
      this.el.nativeElement.appendChild(badge);
    }
  }
}
