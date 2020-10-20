# Progressive Web Apps
This guide details the steps needed to transform a web application into a Progressive Web App

**NOTE:** Current webpage satisfy the requirements (the basic ones and most of the advanced optional ones) for a PWA.

# Testing website's PWA capabilities

There are multiple ways of checking if a website is PWA compatible.

## Lighthouse PWA Analysis Tool
[Lighthouse](https://developers.google.com/web/tools/lighthouse) is an open-source tool from Google that audits a web app for PWA features. It provides a set of metrics to help guide you in building a PWA with a full application-like experience for your users.

Running Lighthouse
- Running Lighthouse as a Chrome extension
  1. Download the [Lighthouse Chrome extension](http://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) from the Chrome Web Store.
  2. Run Lighthouse on your application by selecting the Lighhouse icon from the taskbar and choosing Generate report (with your app open in the browser page).
- Run Lighthouse in Chrome DevTools
1. In Google Chrome, go to the URL you want to audit. You can audit any URL on the web.
2. Open Chrome DevTools.
3. Click the Audits tab.
4. Click Perform an audit. DevTools shows you a list of audit categories. Leave them all enabled or just check "Progressive Web App" for testing only PWA capabilities.
5. Click Run audit. After 30 to 60 seconds, Lighthouse gives you a report on the page.

# Core Progressive Web App checklist
<br />

The Progressive Web App Checklist describes what makes an app installable and usable by all users, regardless of size or input type.
<br />

## Starts fast, stays fast
Performance plays a significant role in the success of any online experience, because high performing sites engage and retain users better than poorly performing ones. Sites should focus on optimizing for user-centric performance metrics.

Follow [this guide](https://web.dev/fast/) on fast load times to learn how to make your PWA start fast and stay fast.

## Works in any browser
Users can use any browser they choose to access your web app before it's installed.

## Responsive to any screen size
Users can use your PWA on any screen size and all of the content is available at any viewport size.

## Provides a custom offline page
When users are offline, keeping them in your PWA provides a more seamless experience than dropping back to the default browser offline page.

### How
[Workbox](https://web.dev/workbox/) is the recommended approach for adding service workers to websites because it automates a lot of boilerplate, makes it easier to follow best practices, and prevents subtle bugs that are common when using the low-level ServiceWorker API directly.
1. Add a service worker to your app.
2. Use the service worker to cache files locally.
3. When offline, use the service worker as a network proxy to return the locally cached version of the file.

#### Workbox CLI
The Workbox command line interface (contained in the workbox-cli package) consists of a Node.js program called workbox that can be run from a Windows, macOS, of UNIX-compatible command line environment. Under the hood, workbox-cli wraps the workbox-build module, and provides an easy way of integrating Workbox into a command line build process, with flexible configurations.

Install the CLI
```
npm install workbox-cli --global
```


CLI Modes
The CLI has four different modes:

- wizard: A step-by-step guide to set up Workbox for your project. (it's usually only used one time only)
```
workbox wizard
```
- generateSW: Generates a complete service worker for you. (should be called anytime there are url changes, in order to update the server worker)
```
workbox generateSW path/to/config.js
```
- injectManifest: Injects the assets to precache into your project.
- copyLibraries: Copy the Workbox libraries into a directory.


Build Process Integration

After installing workbox-cli as a development dependency for your local project, you can add the call to workbox at the end of your existing build process's npm script:

From package.json:
```
{
  "scripts": {
    "build": "my-build-script && workbox <mode> <path/to/config.js>"
  }
}
```

## Add a web app manifest
The web app manifest is a JSON file that tells the browser about your Progressive Web App and how it should behave when installed on the user's desktop or mobile device. A typical manifest file includes the app name, the icons the app should use, and the URL that should be opened when the app is launched.

### How
1. Create the manifest.webmanifest file - The manifest file can have any name, but is commonly named manifest.webmanifest and served from the root (your website's top-level directory).
2. Add the web app manifest to your pages - After creating the manifest, add a <link> tag to all the pages of your Progressive Web App. For example:

```
<link rel="manifest" href="/manifest.webmanifest">
```

Sample:

```
{
  "short_name": "Weather",
  "name": "Weather: Do I need an umbrella?",
  "description": "Weather forecast information",
  "icons": [
    {
      "src": "/images/icons-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/images/icons-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/?source=pwa",
  "background_color": "#3367D6",
  "display": "standalone",
  "scope": "/",
  "theme_color": "#3367D6",
  "shortcuts": [
    {
      "name": "How's weather today?",
      "short_name": "Today",
      "description": "View weather information for today",
      "url": "/today?source=pwa",
      "icons": [{ "src": "/images/today.png", "sizes": "192x192" }]
    },
    {
      "name": "How's weather tomorrow?",
      "short_name": "Tomorrow",
      "description": "View weather information for tomorrow",
      "url": "/tomorrow?source=pwa",
      "icons": [{ "src": "/images/tomorrow.png", "sizes": "192x192" }]
    }
  ]
}
```

Key manifest properties
- short_name and/or name: You must provide at least the **short_name** or **name** property. If both are provided, **short_name** is used on the user's home screen, launcher, or other places where space may be limited. **name** is used when the app is installed.
- icons: 
  - When a user installs your PWA, you can define a set of icons for the browser to use on the home screen, app launcher, task switcher, splash screen, and so on.
  - The icons property is an array of image objects. Each object must include the src, a sizes property, and the type of image. To use maskable icons, sometimes referred to as adaptive icons on **Android**, you'll also need to add "purpose": "any maskable" to the icon property.
  - For **Chrome**, you must provide at least a 192x192 pixel icon, and a 512x512 pixel icon. If only those two icon sizes are provided, **Chrome** will automatically scale the icons to fit the device. If you'd prefer to scale your own icons, and adjust them for pixel-perfection, provide icons in increments of 48dp.
- start_url: 
  - The start_url is required and tells the browser where your application should start when it is launched, and prevents the app from starting on whatever page the user was on when they added your app to their home screen.
  - Your start_url should direct the user straight into your app, rather than a product landing page. Think about what the user will want to do once they open your app, and place them there.
- background_color: The background_color property is used on the splash screen when the application is first launched on mobile.
- display: You can customize what browser UI is shown when your app is launched. For example, you can hide the address bar and browser chrome. Games can even be made to launch full screen.

## Is installable
Users who install or add apps to their device tend to engage with those apps more.

### How

- Uses HTTPS
  - All sites should be protected with HTTPS, even ones that don't handle sensitive data. This includes avoiding mixed content, where some resources are loaded over HTTP despite the initial request being servedover HTTPS. HTTPS prevents intruders from tampering with or passively listening in on the communications between your app and your users, and is a prerequisite for HTTP/2 and many new web platform APIs. 
- Registers a service worker that controls page and **start_url**
  - The service worker is the technology that enables your app to use many Progressive Web App features, such as offline, add to homescreen, and push notifications. 
- Web app manifest meets the installability requirements
  - Browsers can proactively prompt users to add your app to their homescreen, which can lead to higher engagement. 
  - The page's manifest must include the following properties:
    - A short_name or name property
    - An icons property that includes a 192x192 px and a 512x512 px icon
    - A start_url property
    - A display property set to fullscreen, standalone, or minimal-ui
    - A prefer_related_applications property set to a value other than true.



# Optimal Progressive Web App checklist
To create a truly great Progressive Web App, one that feels like a best-in-class app, you need more than just the core checklist. The optimal Progressive Web App checklist is about making your PWA feel like it's part of the device it's running on while taking advantage of what makes the web powerful.

## Redirects HTTP traffic to HTTPS
If you've already set up HTTPS, make sure that you redirect all HTTP traffic to HTTPS in order to enable secure web features for all your users.

## Configured for a custom splash screen
A themed splash screen ensures a high-quality experience when users launch your app from their homescreens.

### How
Chrome for Android automatically shows your custom splash screen as long as you meet the following requirements in your web app manifest:

- The **name** property is set to the name of your PWA.
- The **background_color** property is set to a valid CSS color value.
- The **icons** array specifies an icon that is at least 512x512 px.
- The specified icon exists and is a PNG.


## Sets a theme color for the address bar.
The browser address bar can be themed to match your site.

### How
1. Add a theme-color meta tag to every page you want to brand

The theme-color meta tag ensures that the address bar is branded when a user visits your site as a normal webpage. Set the tag's content attribute to any valid CSS color value:

```
<meta name="theme-color" content="#317EFB"/>
```

2. Add the theme_color property to your web app manifest

The **theme_color** property in your web app manifest ensures that the address bar is branded when a user launches your PWA from the home screen. Unlike the theme-color meta tag, you only need to define this once, in the manifest. Set the property to any valid CSS color value.


## Content is sized correctly for the viewport
If the width of your app's content doesn't match the width of the viewport, your app might not be optimized for mobile screens.


## Has a <meta name="viewport"> tag with width or initial-scale

### How
Add a `<meta name="viewport">` tag to optimize your app for mobile screens.

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## Contains some content when JavaScript is not available
Your app should display some content when JavaScript is disabled, even if it's just a warning to the user that JavaScript is required to use the app.

### How
For pages that absolutely must rely on JavaScript, one approach is to use a `<noscript>` element to alert the user that JavaScript is required for the page. This is better than a blank page because the blank page leaves users uncertain about whether there's a problem with the page, their browsers, or their computers.


## Provide a valid apple-touch-icon
For ideal appearance on iOS when users add a progressive web app to the home screen, define an `apple-touch-icon`. It must point to a non-transparent 192px (or 180px) square PNG.

### How
1. Add `<link rel="apple-touch-icon" href="/example.png">` to the `<head>` of your page
2. Replace `/example.png` with the actual path to your icon.


## Manifest must provide a maskable icon
A maskable icon ensures that the image fills the entire shape without being letterboxed when installing the app on a device.

### How
1. Use [Maskable.app Editor](https://maskable.app/editor) to convert an existing icon to a maskable icon.
2. Add the purpose property to one of the icons objects in your web app manifest. Set the value of purpose to maskable or any maskable. See [Values](https://developer.mozilla.org/docs/Web/Manifest/icons#Values).

```
{
  …
  "icons": [
    …
    {
      "src": "path/to/maskable_icon.png",
      "sizes": "196x196",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
  …
}
```

3. Use Chrome DevTools to verify that the maskable icon is displaying correctly. See [Are my current icons ready](https://web.dev/maskable-icon/#are-my-current-icons-ready)?



## Provides an offline experience
Where connectivity isn't strictly required, your app works the same offline as it does online.


## Is fully accessible
All user interactions pass WCAG 2.0 accessibility requirements.

W3C's [Introduction to Web Accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/) is a good place to start. A majority of accessibility testing must be done manually. Tools like the [Accessibility](https://web.dev/lighthouse-accessibility/) audits in Lighthouse, [axe](https://github.com/dequelabs/axe-core), and [Accessibility Insights](https://accessibilityinsights.io/) can help you automate some accessibility testing. 


## Can be discovered through search
Your PWA can be easily discovered through search.

### How
Start by ensuring that each URL has a unique, descriptive title and meta description. Then you can use the [Google Search Console](https://search.google.com/search-console/about) and the [Search Engine Optimization audits](https://web.dev/lighthouse-seo/) in Lighthouse to help you debug and fix discoverability issues with your PWA. You can also use [Bing](https://www.bing.com/toolbox/webmaster)'s or [Yandex](https://webmaster.yandex.com/welcome/)'s webmaster tools, and consider including [structured data](https://goo.gle/search-gallery) via schemas from [Schema.org](https://schema.org/) in your PWA.


## Works with any input type
Your PWA is equally usable with a mouse, a keyboard, a stylus, or touch.

### How
The [Pointer Events API](https://developers.google.com/web/updates/2016/10/pointer-events) provides a unified interface for working with various input options, and is especially good for adding stylus support. For supporting both touch and keyboard, ensure that you're using the correct semantic elements (anchors, buttons, form controls, etc.) and not rebuilding these with non-semantic HTML (which is good for accessibility). When including interactions that activate on hover, ensure they can activate on click or tap, too.


## Provides context for permission requests
When asking permission to use powerful APIs, provide context and ask only when the API is needed.

### How
The [Permission UX](https://developers.google.com/web/fundamentals/push-notifications/permission-ux) article and UX Planet's [The Right Ways to Ask Users for Permissions](https://uxplanet.org/mobile-ux-design-the-right-ways-to-ask-users-for-permissions-6cdd9ab25c27) are good resources to understand how to design permission prompts that, while focused on mobile, apply to all PWAs.


## Follows best practices for healthy code
Keeping your codebase healthy makes it easier to meet your goals and deliver new features.

### How
There are a number of high-priority checks to ensure a healthy codebase: avoiding using libraries with known vulnerabilities, ensuring you're not using deprecated APIs, removing web anti-patterns from your codebase (like using document.write() or having non-passive scroll event listeners), and even coding defensively to ensure your PWA doesn't break if analytics or other third party libraries fail to load. Consider requiring static code analysis, like linting, as well as automated testing, in multiple browsers and release channels. These techniques can help catch errors before they make it into production.


# How to provide your own in-app install experience
In addition to the [browser provided install experience](https://web.dev/promote-install/#browser-promotion), it's possible to [provide your own custom install flow](https://web.dev/customize-install/), directly within your app.


## Chrome and Edge
The Chromium project has the best progressive web application homescreen prompt mechanism, the *beforeinstallprompt* event and a native prompt banner.

**NOTE:** The *beforeinstallprompt* event will trigger if the browser determines the site meets its minimal PWA requirements.

**NOTE:** Each browser determines its own criteria of what exactly are the minimum PWA and PWA installability requirements.

The way the prompt is supposed to work is you capture the event and keep it from triggering until you want it to prompt the user.

```
let installButton = ... // button which the user should press in order to trigger the instalation process (usually hidden at first)
if ("onbeforeinstallprompt" in window) {
  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA

    installButton.style.display = 'block';
    installButton.addEventListener("click", () => {
      deferredPrompt
          .prompt()
          .then(function (evt) {         
            // Wait for the user to respond to the prompt
            return deferredPrompt.userChoice;
          })
          .then(function (choiceResult) {
            if (choiceResult.outcome === "accepted") {
              console.log("User accepted the install prompt");
            } else {
              console.log("User dismissed the install prompt");
            }
          })
          .catch(function (err) {    
            if (err.message.indexOf("user gesture") > -1) {
              //recycle, but make sure there is a user gesture involved
            } else if (err.message.indexOf("The app is already installed") > -1) {
              //the app is installed, no need to prompt
              alert("The app is already installed")
            } else {
              alert("Error")
              return err;
            }
          });
    });
  });
}
```

**NOTE:** Beware, just because the event fires does not mean the prompt will trigger. The published rule requires the prompt to be displayed in response to a user action. This means the user should click a button or some other action.


## iPhone or iPad
Apple has supported this add to homescreen installation flow with touch icons and the ability to open installed web apps full screen.

The real issue with the experience is they never added any native prompting experience. Instead the user has to walk through a collection of steps to install the application:
- Open up Safari and load a web site.
- At the bottom of the screen is the share icon (It is an arrow pointing up from a square).
- At this point the share sheet is rendering. You will need to slide the icons to the left to reveal the 'Add to Homescreen' button.
- You'll be asked to choose a name for the homescreen icon. So, you know, pick a good one and save it. When you're done it'll show up on your homescreen.

## FireFox, Opera, Samsung and other browsers
Last, the other browsers. Other than Chrome and the new Edge most browsers don't really support an add to desktop on laptops, so the add to homescreen experience in other browsers is largely limited to Android.

Right now, these browsers don't support the beforeinstallprompt, so the experience is sort of like iOS, manual.