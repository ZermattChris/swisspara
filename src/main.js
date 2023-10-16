import Button from "primevue/button";
import PrimeVue from "primevue/config";


export default (app) => {
  app.use(PrimeVue, { unstyled: true });

  app.component("Button", Button);

  // app.component("InputText", InputText);
};
