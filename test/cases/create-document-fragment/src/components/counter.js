class Counter extends HTMLElement {
  #count;

  constructor(props = {}) {
    super();

    this.props = props;
    this.#count = 0;

    if (this.shadowRoot) {
      this.hydrate();
    }
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.setCount();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = this.render();

      // After juggling content, element should still render
      const fragment = document.createDocumentFragment();
      fragment.innerHTML = this.shadowRoot.innerHTML;
      this.shadowRoot.innerHTML = fragment.innerHTML;
    }
  }

  setCount() {
    this.#count = this.hasAttribute('count')
      ? parseInt(this.getAttribute('count'), 10)
      : this.props.count
        ? this.props.count
        : this.#count;
  }

  inc() {
    this.#count += 1;
    this.update();
  }

  dec() {
    this.#count -= 1;
    this.update();
  }

  hydrate() {
    this.count = parseInt(JSON.parse(this.shadowRoot.querySelector('script[type="application/json"]').text).count, 10);

    const buttonDec = this.shadowRoot.querySelector('button#dec');
    const buttonInc = this.shadowRoot.querySelector('button#inc');

    buttonDec.addEventListener('click', this.dec.bind(this));
    buttonInc.addEventListener('click', this.inc.bind(this));
  }

  update() {
    this.shadowRoot.querySelector('span#count').textContent = this.#count;
  }

  render() {
    return `
        <div>
          <button id="inc">Increment</button>
          <span>Current Count: <span id="count">${this.#count}</span></span>
          <button id="dec">Decrement</button>
        </div>
    `;
  }
}

export {
  Counter
};

customElements.define('wcc-counter', Counter);