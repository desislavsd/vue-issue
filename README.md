# vue-issue
Vue services and components to deal with modals, toasts and like. 

The idea is to represent all mentioned obejcts as an __Issue__. An Issue is an instance of the `class Issue` and has an associated `promise` object, a state property `opened` and some optinal data. An Issue may be opened and then either __resolved__ or __rejected__. See [Issue](#Issue) section for more details. So modals are issues and toasts are issues, everything is an issue.

## Usage
```shell
$ npm install @desislavsd/vue-issue
```

```javascript
import '@desislavsd/vue-issue/dist/vue-issue.css'
import VueIssue from '@desislavsd/vue-issue'

Vue.use(VueIssue, {
    modal: { /* VueModal options */ },
    toast: { /* VueToast options */ }
})

// or

import { VueModal, VueToast, vDialog } from '@desislavsd/vue-issue'

Vue.use(VueModal, { /* check VueModal options */})

Vue.use(VueToast, { /* check VueToast options */})

Vue.$modal({ 
    component: vDialog, 
    props: {message: 'Hello world!'} 
}).then(console.log)

Vue.$toast.open('Hello world!')

```

## VueModal
The `VueModal` plugin exposes the `$modal` constructor. It is available at `Vue.$modal` and `this.$modal`. `$modal` extends `Issue`. Check [$modal](#$modal) for more details and [Issue](#Issue) for a list of inherited properties and methods.



#### Plugin options

| Property     | Type   | Default                      | Description                                 |
|--------------|--------|------------------------------|---------------------------------------------|
| eventsPrefix | String | `''`                         | Prefix for the resolve/reject events        |
| defaults     | Object | [$modal.defaults](#$modal)   | Defaults for the modal constructor          |
| dialog       | Object | [vDialog defaults](#vDialog) | Defaults for the dialog modal constructor   |



#### $modal

##### Options
| Property  | Type                | Default                   | Description                                                                                               |
|-----------|---------------------|---------------------------|-----------------------------------------------------------------------------------------------------------|
| name      | String              | ''                        | `.modal-[name]` css class will be added to the root element of the modal layou                              |
| component | String/Object       | [check vDialog](#vDialog) | Name or definition of component to be opened in modal.  The name must be of globally available components. |
| props     | Object              | [check vDialog](#vDialog) | Props that will be bound to the component                                                                 |
| listeners | Object              | [check vDialog](#vDialog) | Listeners that will be bound to the component                                                             |
| layout     | String/Object       | `v-modal-layout`          | Name or definition of the layout component for the modal                                                  |
| classes   | String/Array/Object | `['modal-center']`        | Classes to be added to the root element of the modal                                                      |

Check also [Issue](#Issue) for other inherited options and all the available properties and methods.

### VueToast

The `VueToast` plugin exposes the `$toast` constructor. It is available at `Vue.$toast` and `this.$toast`. `$toast` extends `Issue`. Check [$toast](#$toast) for more details and [Issue](#Issue) for a list of inherited properties and methods.

#### Plugin options

| Property     | Type   | Default                    | Description                          |
| ------------ | ------ | -------------------------- | ------------------------------------ |
| eventsPrefix | String | `''`                       | Prefix for the resolve/reject events |
| defaults     | Object | [$toast.defaults](#$toast) | Defaults for the modal constructor   |

#### $toast

##### Options

| Property  | Type          |     Default      | Description                                                  |
| --------- | ------------- | :--------------: | ------------------------------------------------------------ |
| component | String/Object |      vToast      | Name or definition of component to be used as a toast.  The name must be of globally available components. |
| position  | String        | `'bottom-right'` | Where to show the toast; Possible values: `'[top|bottom]-[left|right|center]'` |
| type      | String        |    'default'     | Used for theming only; Possible values: `'default|info|done|warn|error'` |
| classes   | Array         |       `[]`       | Additional css classes for the toast compnent                |
| timeout   | Number        |       3000       | Time in *ms* before toast is auto rejected. Use `0`or `Infinity` to disable |

##### Additional instance methods

| Method                                | Returns | Description                                         |
| ------------------------------------- | ------- | --------------------------------------------------- |
| timeout(duration = this.data.timeout) | `this`  | Starts/cancels the timeout. Pass `false`  to cancel |



## Issue

#### Options
| Property | Type    | Default | Description                                                                     |
|----------|---------|---------|---------------------------------------------------------------------------------|
| once     | Boolean | `true`    | If `true` removes the issue from the stack after its resolution.                |
| required | Boolean | `false`   | `rejectAll` static method won't reject this issue without the `force` parameter |

#### Properties and methods
| Property                | Type            | Description                                                                             |
|-------------------------|-----------------|-----------------------------------------------------------------------------------------|
| id                      | Number          | instance id                                                                             |
| opened                  | Boolean/Number  | Instance state. Holds opening date if opened and `false` if closed                      |
| promise                 | Promise         | `promise.resolve` and `promise.reject` are available                                    |
| date                    | Number          | Issue creation date                                                                     |
| data                    | Object          | All data passed to the constructor                                                      |
| _static_ instances        | Array           | List with all created instances that didn't call `.destroy()`                           |
| _static_ opened           | Array           | List with all currently opened instances.                                               |
| __Method__             | __Returns__     |                                                                                         |
| set(...objects)         | `this`          | Merges the provided objects with the current `data` and the defaults                    |
| open()                  | `this`          | Changes the state to opened and refreshes the promise. Arguments are passed to `.set()` |
| resolve()               | `this`          | Resolves the promise and goes back to closed state (opened == false).                   |
| reject()                | `this`          | Rejects the promise and goes back to closed state (opened == false).                    |
| then()                    | Function         | Alias for `this.promise.then`                                                           |
| destroy()               | `this`          | Removes the instance from the stack with all created instances                          |
| _static_ create(...args)  | $modal instance | Same as `new $modal(...args)`                                                           |
| _static_ open(...args)    | $modal instance | Same as `new $modal(...args).open()`                                                    |
| _static_ rejectAll(force) | `this`          | Calls `.reject()` on all opened instances that are not destroyed.                       |

## vDialog

**VueModal** comes out of the box with a build in lightweight dialog component to deal with alerts, confirms and prompts. It is the default component for the `$modal` constructor. Here is an example:

```javascript
let props = {},
    options = {};

// open dialog modal
Vue.$modal.dialog( props, options )
// sames as 
Vue.$modal.open( { props }, options )
```

Here is a list of props you may pass to `vDialog`

| Property |   Default   | Description                                                  |
| -------- | :---------: | ------------------------------------------------------------ |
| title    |    `''`     | Title of the dialog box                                      |
| message  | `'Confirm'` | Message to display. HTML is supported.                       |
| resolve  |   `'OK'`    | Text of the **resolve** button.                              |
| reject   | `'Cancel'`  | Text of the **reject** button.                               |
| type     |             | The type of the dialog: `alert|confirm|prompt`. By default the type is autodetected from the given parameters. |
| data     |     any     | This will be passed to the `resolve/reject` handlers **except in prompts**. |
| model    |             | This will be the initial **value** or the **bindings** of the `input` field in the prompt dialog. |

##### Aliases

There are some aliases available to make working with dialogs easier:

```javascript
let props = {},
    options = {};

Vue.$modal.open( { props }, options )
// sames as 
Vue.$modal.dialog( props, options )

// other aliases
Vue.$modal.alert(message|props, options) // sets `type:'alert'`
Vue.$modal.confirm(message|props, options) // sets `type:'confirm'`
Vue.$modal.prompt(model|props, options) // sets `type:'prompt'`
```

