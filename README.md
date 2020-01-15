# Content 

Several web apps in Tocororo Project. 
Using sceiba API.

# TocoNg

Later, the project was refactoried and was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

This project was originally generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve --project=ProjectName` for a dev server. Navigate to `http://localhost:4200/` and the `ProjectName` will be showed. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Steps to create a project from the beginning

(1) Create a new workspace: 
`ng new angular-project-name --createApplication=false --interactive=false`

(2) Create a new project of application type: 
`ng generate application app-example-name --routing --style=scss`

(3) Create a new project of library type: 
`ng generate library lib-example-name`

(4) Add the angular material dependencies: 
`ng add @angular/material --save --project=app-example-name`
If the previous command does NOT work because it gave the error "Cannot find module '@angular-devkit/schematics/tasks'", then execute this command first: 
   (4.1) `npm install --save @angular/material @angular/cdk @angular/animations hammerjs`
   and then execute the command (4). 
   If it still does NOT work, then execute the following two commands: 
      `npm i @angular-devkit/schematics`
      `npm i @angular-devkit/core`
      and then execute the commands beginning by (4). 

(5) Add the angular-in-memory-web-api dependency (it is used to simulate a data server in angular and to test the HTTP request/response protocol): 
`npm install angular-in-memory-web-api --save --project=app-example-name`

