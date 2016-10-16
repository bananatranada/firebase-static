'use strict';
var path = require('path')
var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('projectName', { type: String, required: false, desc: 'The project name' })
    this.option('staging') // (this.options.staging ? x : y)
    this.option('production')
  },

  prompting: function () {
    // var prompts = [{
    //   type: 'input',
    //   name: 'projectName',
    //   message: 'Your project name',
    //   default: this.appname
    // }, {
    //   type: 'input',
    //   name: 'stagingID',
    //   message: 'Your Firebase Hosting staging ID',
    //   default: this.appname + '-staging',
    // }, {
    //   type: 'input',
    //   name: 'productionID',
    //   message: 'Your Firebase Hosting production ID',
    //   default: this.appname + '-production',
    // }];
    var prompts = []

    if (!this.projectName) {
      prompts.push({
        type: 'input',
        name: 'projectName',
        message: 'Your project name',
        default: this.appname
      })
    } 

    if (!this.options.staging) {
      prompts.push({
        type: 'input',
        name: 'staging',
        message: 'Your Firebase Hosting staging ID',
        default: (this.projectName || this.appname) + '-staging',
      })
    } 

    if (!this.options.production) {
      prompts.push({
        type: 'input',
        name: 'production',
        message: 'Your Firebase Hosting production ID',
        default: (this.projectName || this.appname) + '-production',
      })
    } 

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    // change templates path (it defaults to app/templates)
    this.sourceRoot(path.join(__dirname, '../templates'));

    console.log(this.templatePath('base'))
    console.log(this.destinationPath())

    // copy base directory and hidden files
    this.fs.copy(
      this.templatePath('base'),
      this.destinationPath()
    );
    this.fs.copy(
      this.templatePath('base/**/.*'),
      this.destinationPath()
    );
    
    // overrides

    // .firebaserc
    this.fs.copyTpl(
      this.templatePath('firebase/.firebaserc'),
      this.destinationPath('.firebaserc'),
      { 
        staging: this.options.staging || this.props.staging, 
        production: this.options.production || this.props.production 
      }
    )

    // package.json
    this.fs.copyTpl(
      this.templatePath('npm/package.json'),
      this.destinationPath('package.json'),
      { projectName: this.projectName || this.appname }
    )
  },

  install: function () {
    this.installDependencies();
  }
});
