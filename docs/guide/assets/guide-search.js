(() => {
  const root = document.querySelector("[data-guide-search]");
  if (!root) return;

  const input = root.querySelector("[data-guide-search-input]");
  const results = root.querySelector("[data-guide-search-results]");
  const status = root.querySelector("[data-guide-search-status]");
  const chips = root.querySelectorAll("[data-guide-search-query]");

  let documents = [];
  let activeIndex = -1;
  let timer = null;

  const cleanText = (value = "") =>
    value
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const normalise = (value = "") =>
    cleanText(value)
      .toLocaleLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "");

  const escapeRegExp = (value) =>
    value.replace(/[.*+?^$(){}|[\]\\]/g, "\\$&");

  const appendHighlighted = (element, text, terms) => {
    if (!terms.length) {
      element.textContent = text;
      return;
    }
    const pattern = new RegExp(
      "(" + terms.map(escapeRegExp).filter(Boolean).join("|") + ")",
      "ig"
    );
    let cursor = 0;
    text.replace(pattern, (match, _group, offset) => {
      if (offset > cursor) {
        element.append(document.createTextNode(text.slice(cursor, offset)));
      }
      const mark = document.createElement("mark");
      mark.textContent = match;
      element.append(mark);
      cursor = offset + match.length;
      return match;
    });
    if (cursor < text.length) {
      element.append(document.createTextNode(text.slice(cursor)));
    }
  };

  const makeSnippet = (text, terms) => {
    const source = cleanText(text);
    if (!source) return "";
    const lower = source.toLocaleLowerCase();
    let first = -1;
    for (const term of terms) {
      const pos = lower.indexOf(term.toLocaleLowerCase());
      if (pos !== -1 && (first === -1 || pos < first)) first = pos;
    }
    const start = Math.max(0, first === -1 ? 0 : first - 70);
    const end = Math.min(source.length, start + 220);
    return (start > 0 ? "…" : "") + source.slice(start, end) + (end < source.length ? "…" : "");
  };

  const scoreDocument = (doc, phrase, terms) => {
    const title = normalise(doc.title);
    const text = normalise(doc.text);
    const location = normalise(doc.location);
    let score = 0;

    if (title.includes(phrase)) score += 40;
    if (text.includes(phrase)) score += 14;
    if (location.includes(phrase)) score += 8;

    for (const term of terms) {
      if (title === term) score += 20;
      else if (title.includes(term)) score += 10;
      if (text.includes(term)) score += 3;
      if (location.includes(term)) score += 2;
    }

    return score;
  };

  const setActive = (index) => {
    const items = [...results.querySelectorAll(".guide-search-result")];
    if (!items.length) {
      activeIndex = -1;
      input.removeAttribute("aria-activedescendant");
      return;
    }

    activeIndex = Math.max(0, Math.min(index, items.length - 1));
    items.forEach((item, i) => {
      item.classList.toggle("is-active", i === activeIndex);
      item.setAttribute("aria-selected", i === activeIndex ? "true" : "false");
    });
    input.setAttribute("aria-activedescendant", items[activeIndex].id);
    items[activeIndex].scrollIntoView({ block: "nearest" });
  };

  const render = (query) => {
    const phrase = normalise(query);
    const terms = phrase.split(/\s+/).filter(Boolean);
    results.replaceChildren();
    activeIndex = -1;

    if (phrase.length < 2) {
      status.textContent = "Type at least two characters to search the guide.";
      root.classList.remove("has-results");
      return;
    }

    const matches = documents
      .map((doc) => ({ doc, score: scoreDocument(doc, phrase, terms) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
      .slice(0, 8);

    if (!matches.length) {
      status.textContent = `No guide pages found for “${query}”. Try a shorter term or the header search.`;
      root.classList.remove("has-results");
      return;
    }

    const list = document.createElement("div");
    list.className = "guide-search-result-list";
    list.setAttribute("role", "listbox");

    matches.forEach(({ doc }, index) => {
      const link = document.createElement("a");
      link.className = "guide-search-result";
      link.href = doc.location;
      link.id = `guide-search-result-${index}`;
      link.setAttribute("role", "option");
      link.setAttribute("aria-selected", "false");

      const title = document.createElement("strong");
      appendHighlighted(title, cleanText(doc.title) || "Untitled page", terms);

      const snippet = document.createElement("span");
      snippet.className = "guide-search-result__snippet";
      appendHighlighted(snippet, makeSnippet(doc.text, terms), terms);

      link.append(title, snippet);
      list.append(link);
    });

    results.append(list);
    root.classList.add("has-results");
    status.textContent = `${matches.length} result${matches.length === 1 ? "" : "s"} shown. Use the arrow keys to move through them.`;
  };

  const loadIndex = async () => {
    try {
      const url = new URL("search/search_index.json", document.baseURI);
      const response = await fetch(url, { credentials: "same-origin" });
      if (!response.ok) throw new Error(`Search index returned ${response.status}`);
      const payload = await response.json();
      documents = Array.isArray(payload.docs) ? payload.docs : [];
      status.textContent = "Search is ready. Try “backup”, “OIDC”, “CFS” or “.env”.";
    } catch (error) {
      console.warn("MakerVault guide quick search could not load:", error);
      status.textContent = "Quick search is unavailable. Use the search icon in the header instead.";
      input.disabled = true;
    }
  };

  input.addEventListener("input", () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => render(input.value), 90);
  });

  input.addEventListener("keydown", (event) => {
    const items = [...results.querySelectorAll(".guide-search-result")];
    if (event.key === "ArrowDown" && items.length) {
      event.preventDefault();
      setActive(activeIndex < 0 ? 0 : activeIndex + 1);
    } else if (event.key === "ArrowUp" && items.length) {
      event.preventDefault();
      setActive(activeIndex < 0 ? items.length - 1 : activeIndex - 1);
    } else if (event.key === "Enter" && items.length) {
      event.preventDefault();
      const target = items[activeIndex >= 0 ? activeIndex : 0];
      window.location.assign(target.href);
    } else if (event.key === "Escape") {
      input.value = "";
      render("");
      input.blur();
    }
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      input.value = chip.dataset.guideSearchQuery || "";
      input.focus();
      render(input.value);
    });
  });

  document.addEventListener("keydown", (event) => {
    const tag = document.activeElement?.tagName?.toLowerCase();
    const typing = tag === "input" || tag === "textarea" || document.activeElement?.isContentEditable;
    if (event.key === "/" && !typing) {
      event.preventDefault();
      input.focus();
      input.select();
    }
  });

  loadIndex();
})();
