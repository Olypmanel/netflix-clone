### THE PACKAGES I INSTALL IN ORDER TO MAKE THIS PROJECT A SUCCESS APART FROM THE DEFAULT PACKAGES OF CREATE-REACT-APP

### STYLED COMPONENTS

1. `npm install styled-components`
   This package allows me to write CSS in react. It was awesome.

### AXIOS

2. `npm install axios`
   This package allows me to get API from the API server.

### REACT-RESPONSIVE

3. `npm install react-responsive`
   This package allows me to make the app responsive to every screen sizes.

### REACT YOUTUBE

4. `npm install react-youtube`
   This package allows one to view the trailer of each video in the app.

### MOVIE TRAILER

5. `npm install movie-trailer`
   This package allows the app search the url to every movie underground.

### REACT ROUTER DOM

6. `npm install react-router-dom`
   This package allows multiple pages possible.

### GH-PAGES

7. `npm install gh-pages -save-dev`
   This allows me to deploy to react app and run the production build before the deployment.
   All i have to was :

   # Create a new repository on github [https://github.com](https://github.com)

# Run the above code _npm install gh-pages -save-dev_

# Edit the: [./package.json](./package.json)

write: _"homepage" : "https://yourUserName/github.io"_
to the object which contains `name`,`version`, `private` etc.

# Write to the `script` object: _"predeploy" : "npm run build"_

and _"deploy" : "gh-pages -d build"_

# On the terminal run: _git init_ and _git remote add origin https://github/yourUserName/yourGitHubRepository.git_

This adds your remote repository pathway to your local repository

# On the terminal run _npm run build_

Voila your production build is now on GITHUB. Now it can be hosted on `NETLIFY` or `FIREBASE`

# You might wanna run the following codes to add your source code to github repository, the above codes only push the production build to github

_git add ._ this add your programs in the working directory to staging area.
_git commit_ this commits your work and adds it to the local storage.
_git push -v -u origin <yourBranchName>_ this push your source code under the current branch name.
