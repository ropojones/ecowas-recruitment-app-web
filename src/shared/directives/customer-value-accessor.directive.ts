
import { Directive, ElementRef, HostListener, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'textarea[customValueAccessor]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomValueAccessorDirective),
    multi: true
  }]
})
export class CustomValueAccessorDirective implements ControlValueAccessor {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  // Placeholder for the callback functions
  onChange = (_: any) => { };
  onTouched = () => { };

  // Write value to the textarea
  writeValue(value: any): void {
    this.renderer.setProperty(this.el.nativeElement, 'value', value);
  }

  // Register change event listener and propagate changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register touched event listener
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Listen for input event and propagate changes
  @HostListener('input', ['$event.target.value'])
  input(value: any): void {
    this.onChange(value);
    this.onTouched();
  }
}
