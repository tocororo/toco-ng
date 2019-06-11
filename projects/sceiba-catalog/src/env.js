(function (window) {
    window.__env = window.__env || {};

    // API url
    window.__env.sceibaApi = "https://localhost:5000/api";
    window.__env.sceibaHost = "https://localhost:5000";

    // window.__env.sceibaApi = "https://sceiba-lab.upr.edu.cu/api";
    // window.__env.sceibaHost = "https://sceiba-lab.upr.edu.cu";

    window.__env.appHost = '';
    window.__env.appName = '';
    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
  }(this));
