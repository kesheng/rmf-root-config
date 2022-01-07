import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

// Delay starting the layout engine until the components CSS is loaded
const layoutEngine = constructLayoutEngine({
  routes,
  applications,
  active: false,
});

applications.forEach(registerApplication);

System.import("@ks/components").then(() => {
  // Activate the layout engine once the components CSS is loaded
  layoutEngine.activate();
  start();
});
