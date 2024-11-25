# orokii-ppg-jswidget-example
A repo to show JS widgets examples for Vanilla (html,css and Js), React JS and Angular 

## Importing the widget
the widget url is 
```ts 
https://orokiipay-js-widget.web.app/bundle.js
```
and should be imported using the script tag

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

Payload structure 

1. Example For multiple merchants and a user with saved payment option
```json
{
    "ServiceKey":"Oro788675ds",
    "totalAmount": 600,
    "merchants": [
      { "merchantId": 87766786, "amount": 100, "tax": 2 },
      { "merchantId": 87766786, "amount": 150, "tax": 12 },
      { "merchantId": 87766786, "amount": 350, "tax": 15 },
                ],
      "userACHToken": { "userTokenId": "c3e453aa-c917-4ca0-ad0d-8a3d9492cc86", "userPaymentOptionId": "132005098", },
      "userCardToken": { "userTokenId": "78f6c3cd-d05e-40e6-8f3f-274031cc5135", "userPaymentOptionId": "132047678", }
 }
```

2. Example For multiple merchants and a user with no saved payment option
```json
{
    "ServiceKey":"Oro788675ds",
    "totalAmount": 600,
    "merchants": [
      { "merchantId": 87766786, "amount": 200, "tax": 5 },
      { "merchantId": 12766786, "amount": 70, "tax": 5 },
      { "merchantId": 87766786, "amount": 330, "tax": 5 },
                ],
      "userACHToken": null,
      "userCardToken": null
 }
```

3. Example For single merchant purchase and a user with no saved payment option
```json
{
    "ServiceKey":"Oro788675ds",
    "totalAmount": 100,
    "merchants": [
      { "merchantId": 87766786, "amount": 100, "tax": 5 }
                ],
      "userACHToken": null,
      "userCardToken": null
 }
```
4. Example For single merchant purchase and a user with saved card payment option
```json
{
    "ServiceKey":"Oro788675ds",
    "totalAmount": 600,
    "merchants": [
      { "merchantId": 87766786, "amount": 600, "tax": 5 }
                ],
      "userACHToken": null,
      "userCardToken": { "userTokenId": "78f6c3cd-d05e-40e6-8f3f-274031cc5135", "userPaymentOptionId": "132047678", }
 }
```

Below is an example code on how you can use Renderer2 and ElememtRef to load the widget script 

```ts
  private loadWidgetScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://orokiipay-js-widget.web.app/bundle.js'; 
    script.async = true;
    script.onload = () => {
      const container = this.el.nativeElement.querySelector('#widget-container');
      const widget = (window as any).OrokiipayWidget.createWidget(payload);
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

**Working with the cryptocurrency payment method**
To get started you need to ensure you have metamask extension added to your browser plugin

1. Visit the Chrome Web Store and search for MetaMask or use this direct [link](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)
2. Click "Add to Chrome"
3. Click "Add Extension"
4. Pin the extension to your browser for easy access

  - Click the puzzle piece icon in your browser
  - Find MetaMask
  - Click the pin icon



### Creating Your Wallet

1. Click the MetaMask icon in your browser
2. Click "Get Started"
3. Choose between importing an existing wallet or creating a new one
  - For new wallet:

    1. Create a strong password (minimum 8 characters)
    2. Accept the terms of use
    3. Click "Create"



### Viewing Account Details

Account address: Located at the top of the wallet
Balance: Displayed prominently in the main view
Transaction history: Available in the "Activity" tab
Get testnet tokens from [here](https://faucets.chain.link/polygon-amoy)


### Test Card
"cardNumber": 4761344136141390
"cardHolderName": Solomon Ayo
"expirationMonth": 12
"expirationYear": 25
"CVV": 217

*cards*
- Visa
4761344136141390
4761201381475297
4159129252458086
4123407439043051
4001888687412469
4444493318246892

- Mastercard
5101081046006034
5101084411423750
5333304500657872
5333308664112277
5550345228382224
5550347471347813
2222755234426838
2221004483162815

- American Express
375510513169537
375510288656924
375510379996452
375510082116984

- Discover
6509821665351005
6221267465440274
6500217278165735
6522231777286524
6523077546008353
6011494585241663

- Diner
361253433727425
386009540225286
369116638070887
386000330170758
364096288088485
365650577650527

- China Union Pay
6221272566426206
6233050545583578


### Test ACH Details
"AccountNumber": 111111111
"RoutingNumber": 999999992

-Note  for billing you can use your own defined information
