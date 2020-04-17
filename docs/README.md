# vue-issue
Vue services and components to deal with modals, toasts and like. 

## Usage
```shell
$ npm install @desislavsd/vue-issue
```

```javascript
// import the styles
import '@desislavsd/vue-issue/dist/vue-issue.css'
```
```javascript
// install both Modal and Toast plugins
import VueIssue from '@desislavsd/vue-issue'

Vue.use(VueIssue, {
    modal: { /* VueModal options */ },
    toast: { /* VueToast options */ }
})

// or install the Modal and Toast plugins separately
import { VueModal, VueToast, vDialog } from '@desislavsd/vue-issue'

Vue.use(VueModal, { /* check VueModal options */})

Vue.use(VueToast, { /* check VueToast options */})

// now all instances have access to $modal & $toast service
```
```javascript
// or manually create a Modal/Toast service
import { createModalService, createToastService } from '@desislavsd/vue-issue'

let $modal = createModalService(/* options */);
let $toast = createToastService(/* options */);

$modal.open({ 
    component: vDialog, 
    props: {message: 'Hello world!'} 
}).then(console.log)

$toast.open('Hello world!')

```
## Issue

Issue is a simple javascript class that both Modal and Toast services extend. 
Therefore `$modal` and `$toast` are javascript classes ( constructors ) themselves.
The idea is to represent all mentioned objects as __Issue__ instances. 
Each Issue instance has an associated `promise` object, a state property `opened` and optional additional properties. 
An Issue may be opened and then either __resolved__ or __rejected__. Here are the constructor options and the class specification:

### Constructor options
| Property | Type    | Default | Description                                                                     |
|----------|---------|---------|---------------------------------------------------------------------------------|
| once     | Boolean | `true`    | If `true` removes the issue from the stack after its resolution.                |


?> Any additional properties you pass in the options object are considered meaningful to you and are also added to the instance itself.


### Properties and methods
| Property                | Type            | Description                                                                             |
|-------------------------|-----------------|-----------------------------------------------------------------------------------------|
| id                      | Number          | instance id                                                                             |
| opened                  | Boolean/Number  | Instance state. Holds opening date if opened and `false` if closed                      |
| promise                 | Promise         | `promise.resolve` and `promise.reject` are available                                    |
| date                    | Number          | Issue creation date                                                                     |
| _static_ instances        | Array           | List with all created instances that didn't call `.destroy()`                           |
| _static_ opened           | Array           | List with all currently opened instances.                                               |
| __Method__             | __Returns__     |                                                                                         |
| set(...objects)         | `this`          | Merges the provided objects with the defaults into the instance                    |
| open()                  | `this`          | Changes the state to opened and refreshes the promise. Arguments are passed to `.set()` |
| resolve()               | `undefined`          | Resolves the promise and goes back to closed state (opened == false).                   |
| reject()                | `undefined`      | Rejects the promise and goes back to closed state (opened == false).                    |
| then()                    | Promise         | Alias for `this.promise.then`                                                           |
| destroy()               | `this`          | Removes the instance from the stack with all created instances                          |
| _static_ create(...args)  | instance | Same as `new Issue(...args)`                                                           |
| _static_ open(...args)    | instance | Same as `new Issue(...args).open()`                                                    |
| _static async_ rejectAll() | Promise          | Calls `.rejectLast()` __until it fails__ or no opened instances are left.                       |
| _static async_ rejectLast() | Promise          | Calls `.reject()` on the last opened instance that is not destroyed.                       |


## VueModal
The `VueModal` plugin exposes the `$modal` constructor. It is available at `Vue.$modal` and `this.$modal`. `$modal` extends `Issue`. Check [$modal](#$modal) for more details and [Issue](#Issue) for a list of inherited properties and methods.



### Plugin options

| Property     | Type   | Default                      | Description                                 |
|--------------|--------|------------------------------|---------------------------------------------|
| eventsPrefix | String | `''`                         | Prefix for the resolve/reject events        |
| defaults     | Object | [$modal.defaults](#$modal)   | Defaults for the modal constructor          |
| dialog       | Object | [vDialog defaults](#vDialog) | Defaults for the dialog modal constructor   |



### $modal
This service is used for rendering Vue components, specified in the `component` prop of the constructor options, in a modal. 
The rendered component may access the modal instance as a prop `modal` and can resolve or reject it 
using `modal.resolve()` and `modal.reject()` or by emitting the corresponding events: `$emit('resolve')` & `$emit('reject')`.

#### Constructor options
| Property  | Type                | Default                   | Description                                                                                               |
|-----------|---------------------|---------------------------|-----------------------------------------------------------------------------------------------------------|
| name      | String              | `''`                       | `.vi-modal-[name]` css class will be added to the root element of the modal layout                              |
| component | String/Object       | [check vDialog](#vDialog) | Name or definition of component to be opened in modal.  The name must be of globally available components. |
| props     | Object              | [check vDialog](#vDialog) | Props that will be bound to the component                                                                 |
| listeners | Object              | [check vDialog](#vDialog) | Listeners that will be bound to the component                                                             |
| layout     | String/Object       | `v-modal-layout`          | Name or definition of the layout component for the modal                                                  |
| position   | String | `center`  | Determines the modal position/style; one of: `center, left, right, full` |
| classes   | String/Array/Object | `[]`        | Classes to be added to the root element of the modal (modal-layout)                                      |
| required | Boolean | `false`   | If `true` the default modal layout component won't display the close button; Also clicking on the modal overlay won't reject the modal |

#### Instance methods

| Method                                | Returns | Description                                         |
| ------------------------------------- | ------- | --------------------------------------------------- |
| get(name)                             | instance| Finds a created instance by its name                |

Check also [Issue](#Issue) for other inherited options and all the available properties and methods.

## VueToast

The `VueToast` plugin exposes the `$toast` constructor. It is available at `Vue.$toast` and `this.$toast`. `$toast` extends `Issue`. Check [$toast](#$toast) for more details and [Issue](#Issue) for a list of inherited properties and methods.

### Plugin options

| Property     | Type   | Default                    | Description                          |
| ------------ | ------ | -------------------------- | ------------------------------------ |
| eventsPrefix | String | `''`                       | Prefix for the resolve/reject events |
| defaults     | Object | [$toast.defaults](#$toast) | Defaults for the modal constructor   |

### $toast

#### Constructor options

| Property  | Type          |     Default      | Description                                                  |
| --------- | ------------- | :--------------: | ------------------------------------------------------------ |
| component | String/Object |      vToast      | Name or definition of component to be used as a toast.  The name must be of globally available components. |
| position  | String        | `'bottom-right'` | Where to show the toast; Possible values: `'[top|bottom]-[left|right|center]'` |
| type      | String        |    'default'     | Used for theming only; Possible values: `'default|info|done|warn|error'` |
| classes   | Array         |       `[]`       | Additional css classes for the toast compnent                |
| duration  | Number        |       3000       | Time in *ms* before toast is auto rejected. Use `0`or `Infinity` to disable |

#### Instance methods

| Method                                | Returns | Description                                         |
| ------------------------------------- | ------- | --------------------------------------------------- |
| timeout(duration = this.duration)     | `this`  | Starts/cancels the timeout. Pass `false`  to cancel |

Check also [Issue](#Issue) for other inherited options and all the available properties and methods.

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

### Aliases

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

## Examples

### Confirm modal rejection
Often when the end user tries to close a modal you might want to 
prompt a confirmation dialog and continue the rejection only after
a successful confirmation. For that purpose we can override the 
`prototype.reject` method during instance creation 
since all constructor options are merged into the instance:

```javascript
let modal = $modal.open({
    component,
    props,

    async reject(){

        // ask for confirmation
        await $modal.confirm();

        // call the default rejection method
        this.constructor.prototype.reject.apply(this, arguments)
    }
})

// a confirmation dialog will pop in any of the following scenarios:
modal.reject();
$modal.rejectLast();
$modal.rejectAll();
```

We can even make this a default behavior if no `force` parameter is provided to the `reject` method:

```javascript
let originalReject = $modal.prototype.reject;

$modal.prototype.reject = async function( force = false ){

    // show the confirmation modal if `force != true` 
    // and if this is not the confirmation modal itself 😜
    if(!force && this.component.name != 'Dialog')
        await $modal.confirm()
    
    originalReject.apply(this, arguments)
}

// open any modal
let modal = $modal.open({/* ... */});

// a confirmation dialog will pop in any of the following scenarios:
modal.reject();
$modal.rejectLast();
$modal.rejectAll();

// a confirmation dialog will NOT pop in any of the following scenarios:
modal.reject(true);
$modal.rejectLast(true);
$modal.rejectAll(true);
```