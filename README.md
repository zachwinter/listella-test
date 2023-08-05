# listella-test

> *"But all we asked for is a Dashboard design..."*

This is an experiment with React, TypeScript, Next, Sass, and Recoil. I planned on using the front-end stack as described in the job description, but I hate Redux (and think you probably should too).

All in all, this was as much for me as it was for my potential candidacy with Listella. After years of primarily working with Vue and getting spoiled by the Vite ecosystem, I wanted to see if I'd resent working with Next.

Stay tuned to find out!

To begin, let's talk about state.

## State Conventions

Recoil is an experimental open source state management library for React, created by Dave McCabe at Meta. It's centered around the idea of Atoms and Selectors, which you can use to compose a state graph that's independent from your application tree. It addresses several historical pain points for state management in the React ecosystem, including reduced ceremony and improved performance characteristics. 

After shopping around for which state management library to use for this project (my React was rusty), it was [this video](https://www.youtube.com/watch?v=_ISAA_Jt9kI) by Recoil's creator that sold me. 


Based on my initial impressions, Recoil (not unlike React itself) feels like an unopinionated collection of primitives. I decided to embrace this impression with some experimentation. 

### Architecture

To implement shared / global state in a component with Recoil, first you must import an Atom to subscribe to, then import and invoke a hook with that Atom's reference. Taking note that the shape of shared application state is generally fixed (though it's possible and totally reasonable to create Atoms on the fly), I imagined a simpler way. 

Application state is described using namespaced `modules`. These modules are created using a helper called `createModule` in `/src/util/recoil.ts`.

Let's look at the `Viewport` store in `/src/store/viewport.ts`:

> NOTE: the viewport store keeps track of the window size, resolution, and route transitions; these values are being initialized within a `useEffect` in the `RecoilBootstrap` provider to avoid SSR / hydration bugs. 

```js
import { createModule } from '@/util/recoil';

const STATE = {
  width: 1,
  height: 1,
  dpr: 1,
  transition: 'FADE',
} 

export default createModule('viewport', STATE) as typeof STATE

```

Under the hood, `createModule` walks through the state object you provide it, creating an `Atom` for the value of each key. The unique `key` of each Atom is namespaced according to the provided string, but the keys of the reduced object are not – so it retains its original shape.

Each module is imported in `/src/store/index.ts` and exported as a single object. 

```js
import viewport from './viewport';
import ui from './ui';
import user from './user';
import map from './map';

const STORE = {
  viewport,
  ui,
  user,
  map,
};

export default STORE;
```
With all of our references neatly packed in a single location, there's no need to explicitly import an Atom if we want to subscribe to its value. Instead, we have several hooks to select Atoms from the root store: each with a familiar API (and a little sugar for your health).

```jsx
import { useGlobalState } from '@/store'

export default () => {
  const [zoom, setZoom] = useGlobalState('map.zoom')

  return (
    <>
      <p>Map zoom level is {zoom}.</p>
      <button onClick={() => setZoom(zoom - 1)}> - </button>
      <button onClick={() => setZoom(zoom + 1)}> + </button>
    </>
  )
}
```

Don't need to set the value? It gets even simpler.

```jsx
import { useGlobalValue } from '@/store'

export default () => {
  const zoom = useGlobalValue('map.zoom')

  return <p>Map zoom level is {zoom}.</p>
}
```

The dot notation is walks through the top-level `STORE` object to find a reference to an Atom, then returns an invoked Recoil hook with that reference. Thanks to [recursive conditional & variadic tuple types](https://stackoverflow.com/questions/47057649/typescript-string-dot-notation-of-nested-object/47058976#47058976), selectors are typed according to the shape of the `STORE` object: not only does a TypeScript error surface when your dot notation points to a key that doesn't exist, but each hook benefits from IDE autocompletion according to the shape of your store.


We also have hooks that are explicitly meant to handle multiple selectors. We can select as many values – from as many stores – as we'd like.

```jsx
import { useGlobalValues } from '@/store'

export default () => {
  const [width, height] = useGlobalValues([
    'viewport.width', 
    'viewport.height'
  ])

  return <p>Viewport size is {width}px by {height}px.</p>
}
```

The full list of hooks is as follows:

```js
// Retrieve a getter & setter for an Atom.
useGlobalState(selector: Selector<T>): [T, SetterOrUpdater<T>]

// Retrieve a getter for an Atom.
useGlobalValue(selector: Selector<T>): T

// Retrieve a setter for an Atom.
useGlobalSetter(selector: Selector<T>): SetterOrUpdater<T>

// Retrieve getters for multiple Atoms.
useGlobalValues(selectors: Selector<T>[]): T[]

// Retrieve getters & setters for multiple Atoms.
useGlobalStates(selectors: Selector<T>[]): [T, SetterOrUpdater<T>][]

// Retrieve setters for multiple Atoms.
useGlobalSetters(selectors: Selector<T>[]): SetterOrUpdater<T>[]
```


There are two gotchas.

First, you currently have to cast anything returned by the hooks yourself:

```ts
const [
  [center, setCenter],
  [bearing, setBearing],
  [pitch, setPitch],
  [zoom, setZoom],
] = useGlobalStates([
  'map.center',
  'map.pitch',
  'map.bearing',
  'map.zoom',
]) as any; // boo hiss

const [width, height] = useGlobalValues([
  'viewport.width',
  'viewport.height',
]) as [number, number]; // man, what a bummer
```

I have a feeling it's possible for the types to be inferred by the selectors, but I haven't figured it out yet. 

Lastly, the selector system is recursive: you can walk down into an object of arbitrary depth. `createModule`'s current implementation, though, is not – and as such, reactivity in modules is limited to top-level keys. This isn't a limitation of Recoil, and can be fixed. 

## Styling

This project uses component-scoped Sass modules, written in the `.scss` syntax. Each stylesheet begins with a `@use` statement that exposes several utility mixins, functions, the Sass `math` library, colors and more: none of which compile to CSS unless you explicitly use a piece of it. 

```scss
@use '@/styles/imports' as *;

.main {
  @include size(100vw, 100vh);
}
```

Component-scoped Sass has several benefits:

* Our markup remains incredibly clean, free of utility class clutter.
* Reusability is abstracted away from the actual styles you write.
* We almost never run into surprise specificity collisions. Ever. 
* We can programatically approach styling problems.

Global styles, including runtime CSS variables, live in `/src/styles/global.scss`.

## View System

I've implemented view transitions on the router-level using [Framer Motion](https://www.framer.com/motion/), a declaritve animation library for React. This library contains a component called `AnimatePresence`, which allows you to define enter and exit animations for elements that enter and exit the component tree. You can see the implementation in `/src/components/common/View.tsx` and `/src/pages/_app.tsx`.

Each view is positioned `absolute`, is the size of the viewport, and contains its own scroll state. This allows for the overlaying of two views simultaneously without them affecting the other's document flow.

Performance is critical for view transitions; each view is promoted to its own composite layer using the `will-change` property. This, combined with limiting transitions to properties that can be animated in the composite layer (e.g. `transform` and `opacity`), results in fluid, jank-free transitions – even on older mobile devices. 

## Maps

I've implemented [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) with a custom theme I created with [MapTiler](https://www.maptiler.com/). Not only is MapLibre free, open-sourced, customizable and wildly performant, but it's also self-hostable, removing the necessity to share all of your user data with one of our giant map overlords (which you may or may not mind). 

A `Map` instance, once instantiated, is so lightweight that I'm persisting it in the background – even when the user navigates away from the Map view. This ensures navigation remains nearly instant to and from the Map view, preserving that "native" feel. 


## Final Thoughts

Given your existing investment in React, I'll spare you proselytization about Vue (which I still believe to be the superior tool, for a number of reasons).

That said, it's very hard not to proselytize the [Vite](https://vitejs.dev/) ecosystem as an alternative for Next.

It's not just possbile, but quite reasonable to [build your own framework](https://vike.land/) that benefits from build tools that feel like they came from a decade into the future. And while switching UI libraries might be outrageous, I believe incrementally transitioning a Next project to a home-grown Vite framework would be quite reasonable to stomach (and more than worth it).

Thank you coming to my TED talk. 🖖