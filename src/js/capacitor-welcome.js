import { SplashScreen } from '@capacitor/splash-screen';
import { Intercom } from '@capacitor-community/intercom';

Intercom.registerUnidentifiedUser()

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
      <main>
        <div style="margin: 100px">
          <button class="button" style="width: 100%; height: 100px;" id="take-photo">Open Intercom</button>
        </div>
        <p>
          <img id="image" style="max-width: 100%">
        </p>
      </main>
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot.querySelector('#take-photo').addEventListener('click', async function (e) {
        try {
          await Intercom.displayMessenger();
        } catch (e) {
          alert(e.toString())
          console.error(e);
        }
      });
    }
  },
);
