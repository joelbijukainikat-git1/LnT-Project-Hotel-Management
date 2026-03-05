import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightDiscount]',
  standalone: true
})
export class HighlightDiscountDirective implements OnInit {
  @Input() appHighlightDiscount: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appHighlightDiscount > 0) {
      this.el.nativeElement.style.backgroundColor = '#e8f5e9';
      this.el.nativeElement.style.borderLeft = '4px solid #27ae60';
      const badge = document.createElement('span');
      badge.className = 'discount-badge';
      badge.textContent = `${this.appHighlightDiscount}% OFF`;
      badge.style.position = 'absolute';
      badge.style.top = '10px';
      badge.style.right = '10px';
      badge.style.backgroundColor = '#27ae60';
      badge.style.color = 'white';
      badge.style.padding = '6px 12px';
      badge.style.borderRadius = '20px';
      badge.style.fontSize = '12px';
      badge.style.fontWeight = 'bold';
      this.el.nativeElement.style.position = 'relative';
      this.el.nativeElement.appendChild(badge);
    }
  }
}
