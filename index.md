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

- wizard: A step-by-step guide to set up Workbox for your project.
```
workbox wizard
```
- generateSW: Generates a complete service worker for you.
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


# Optimal Progressive Web App checklist
To create a truly great Progressive Web App, one that feels like a best-in-class app, you need more than just the core checklist. The optimal Progressive Web App checklist is about making your PWA feel like it's part of the device it's running on while taking advantage of what makes the web powerful.

## Provides an offline experience
Where connectivity isn't strictly required, your app works the same offline as it does online.

## Is fully accessible
All user interactions pass WCAG 2.0 accessibility requirements.

## Can be discovered through search
Your PWA can be easily discovered through search.

## Works with any input type
Your PWA is equally usable with a mouse, a keyboard, a stylus, or touch.

## Provides context for permission requests
When asking permission to use powerful APIs, provide context and ask only when the API is needed.

## Follows best practices for healthy code
Keeping your codebase healthy makes it easier to meet your goals and deliver new features.
