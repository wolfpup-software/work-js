# Web Component Tool Kit

Reactive web components without inheritance.

## About

`Wctk` is a compositional approach to web components.

It is designed to work _up until_ a developer needs to take control. Usually `control` can be defined by gathering state, listening for state, and creating DOM.

There is no inheritance other than initially extending an `HtmlElement`! (which is required by a browser anyways)

Instead a `controllers` are used.

## Controllers

Only a handful of controllers are needed to provide:

- reactivity -> the [Render](./render/README.md) controller
- declarative or imperative shadow dom -> the [Shadow](./shadow/README.md) controller
- styles -> the [Styles](./styles/README.md) controller

## Example component

### Custom elements

Start with the web component properties required to create a new custom element.

The code below is all standard browser web apis.

```ts
class MyElement extends HTMLElement {
	// create reactive attributes
	static observerdAttributes = ["message", "color"];

	attributeChangedCallback() {}
}

customElements.define("my-element", MyElement);

export { MyElement };
```

### Shadow Dom

Add a `Shadow` controller to wrangle the shadow dom.

Check if the shadow dom is `declarative` in the `constructor`. Then add event listeners to the existing shadow dom or create a new shadow dom.

```ts
import { Shadow } from "https://raw.githubusercontent.com/wolfpup-software/wctk-js/main/wctk/dist/wctk.js";

class MyElement extends HTMLElement {
    static observerdAttributes = ["message", "color"];

    // add controllers
	#sd = new Shadow(this, { mode: "closed" });

    // first render
    constructor() {
        super();

        if this.#sd.declarative {
            // add event listeners to #this.sd.shadowRoot
        } else {
            // compose DOM and append to #this.sd.shadowRoot
        }
    }
}

customElements.define('my-element', MyElement);

export { MyElement };
```

### Reactivity

Add a `Render` controller for reactivity. This isn't always necessary but useful for integrating external state into an application.

The example below queues a render everytime an `observedAttribute` value changes.

```ts
import { Render, Shadow } from "https://raw.githubusercontent.com/wolfpup-software/wctk-js/main/wctk/dist/wctk.js";

class MyElement extends HTMLElement {
    static observerdAttributes = ["message", "color"];

    // add controllers
    #rc = new Render(this);
	#sd = new Shadow(this, { mode: "closed" });

    constructor() {
        super();

        if this.#sd.declarative {
            // ...
        } else {
            // ...
        }
    }

    // queue render on attribute changes
	attributeChangedCallback() {
		this.#rc.render();
	}

    // get state and apply changes to shadowRoot
	render() {
        if (this.#rc.queued) return;
        // do something here!
	}
}

customElements.define('my-element', MyElement);

export { MyElement };
```

## Details

`Wctk` weighs in at 350 bytes minified and zipped.

There are no DOM managers included in `wctk`.

Wolfpup doesn't know _how_ you will integrate a library like `preact` or `lit` into your application. Is your external library bundled? Modular, asynchronously imported?

Either way it doesn't matter, Wolfpup considers libraries and modules shared across components to exist as application data.

Assuming _how_ a developer imports their libraries puts `wctk` at risk of polluiting the application space by unintentionally importing preact or lit several times into a single web app.

Devs are savvy. They'll figure it out <3

## License

`Wctk` is released under the BSD-3 Clause License.
