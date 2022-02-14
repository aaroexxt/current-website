## Go to [https://ambecker.com](https://ambecker.com) to see it live!

My old aaronbecker.tech site needed a refresh, so I decided to make a new one with modern web technologies (React and Node).
Under the hood, I'm using Material UI (MUI) for element styling and react-markdown with some custom plugins to render markdown files, which are what each project's post is written in.

The goal is to show off some selected project's I've done over the years while making it easy to find my up to date contact information and resume.

For CDN-like content optimization so things load quickly, I'm using a custom script written in bash which has different compression algorithms for different file types. You can check that out [here](https://github.com/aaroexxt/Website-Content-Optimizer).