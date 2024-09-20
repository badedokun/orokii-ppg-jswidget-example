# orokii-ppg-jswidget-example
A repo to show JS widgets examples for Vanilla (html,css and Js), React JS and Angular 


## Example guide for Angular

### Orokiipay Widget Integration Guide
This guide will walk you through how to dynamically load the Orokiipay widget script in your Angular application using the setup provided.

1. Prerequisites
- Basic understanding of Angular components.
- Angular 14+ installed in your project.

2. Step-by-Step Instructions
**Create a Standalone Angular Component**
First, create a standalone component that will handle the display and loading of the Orokiipay widget.

Import Renderer2 and ElementRef from Angular modules
```ts
import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
```
Declare a toplevel boolean to check if the widget is loaded successfully
```ts
 private scriptLoaded: boolean = false;
 ```
Next inject it into your UI component constructor 
```ts
constructor(private renderer: Renderer2, private el: ElementRef) {}
```
Below is an example code on how you can use Renderer2 and ElememtRef to load the widget script 

```ts
  private loadWidgetScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://orokiipay-js-widget.web.app/bundle.js'; 
    script.async = true;
    script.onload = () => {
      const container = this.el.nativeElement.querySelector('#widget-container');
      const widget = (window as any).OrokiipayWidget.createWidget(this.total.toString());
      container.appendChild(widget);
      this.scriptLoaded = true;
    };
    this.renderer.appendChild(document.body, script);
  }
  ```
In your component html file you can then declare the `#widget-container` div anywhere in your UI
```html
 <div id="widget-container"></div>
 ```