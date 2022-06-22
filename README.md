## Go to [https://ambecker.com](https://ambecker.com) to see it live!

My old aaronbecker.tech site needed a refresh, so I decided to make a new one with modern web technologies (React and Node).
Under the hood, I'm using Material UI (MUI) for element styling and react-markdown with some custom plugins to render markdown files, which are what each project's post is written in.

The goal is to show off some selected project's I've done over the years while making it easy to find my up to date contact information and resume.

For CDN-like content optimization so things load quickly, I'm using a custom script written in bash which has different compression algorithms for different file types. You can check that out [here](https://github.com/aaroexxt/Website-Content-Optimizer).

# Installation and Setup

Simply run `npm install` to download all dependencies. Full dependency list can be viewed inside of [package.json](package.json)

## Building for Development

Run `npm start`, and the server will start itself and redirect you to [localhost:3000](http://localhost:3000), where you can edit the local copy of the site.

## Building For Deployment

All finalized deployment files are built to `/static` when finished. To build, run `npm run build` or `npm run build`, which will first optimize the content using the custom script and then build.

If you do not want to run the optimization script, you can also do `npm run build-only`, although note that you need to run it in order to get the URL resolution to work correctly, as the site expects optimized versions of the images to exist.

Finally, if you wish to undo a optimization run, `npm run unoptimize` will do what you want. This will delete all the optimized images and move the sources back to their original locations.

In all cases, this will automatically download the latest version of the [optimization script](https://github.com/aaroexxt/Website-Content-Optimizer), run it on all the content, and then build the finished files statically. Pretty neat!

### Note for Windows

Windows is extra funky because of how annoying WSL is to use, and how some NPM tools (such as react-app-rewired) only break sometimes.
However, after much pain I was able to get it to work by developing locally using cmd.exe and `npm start`, and then when I wanted to run the optimization script (which depends on bash/zsh), I ran that inside Ubuntu in WSL. This is hacky, and ideally at some point in the future I could use just one to do everything (like _every other_ operating system).

## Configuration

All of the project data is stored under the [pages directory](public/content/pages).

If you want to add a project, first add its folder to public/content/pages (with a .md file inside), then modify [portfolioData.json](src/portfolioData.json)