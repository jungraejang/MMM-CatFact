Module.register("MMM-CatFact", {
  defaults: {
    category: "Programming",
    fetchInterval: 10 * 1000
  },
  getStyles() {
    return [this.file("style.css")];
  },
  fact: null,
  notificationReceived(notification, payload, sender) {
    if (notification === "MODULE_DOM_CREATED") {
      this.getFact();
      setInterval(() => {
        this.getFact();
      }, this.config.fetchInterval);
    }
  },
  getDom() {
    const wrapper = document.createElement("div");
    if (this.fact === null) return wrapper;
    this.setupHTMLStructure(wrapper);
    return wrapper;
  },
  setupHTMLStructure(wrapper) {
    if (this.fact) {
      const fact = document.createElement("h1");
      fact.className = "bright medium light fadeInFact";
      fact.innerHTML = this.fact.fact;
      wrapper.appendChild(fact);
    }
  },
  getFact() {
    fetch("https://catfact.ninja/fact").then(response => {
      response.json().then(fact => {
        this.fact = fact;
        this.updateDom();
      });
    });
  }
});
