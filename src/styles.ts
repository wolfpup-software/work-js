interface StylesInterface {
	adoptedStyleSheets: CSSStyleSheet[];
}

class Styles implements StylesInterface {
	#root: DocumentOrShadowRoot;

	constructor(
		sr: DocumentOrShadowRoot,
		stylesheetTemplates: (CSSStyleSheet | string)[],
	) {
		this.#root = sr;
		this.adoptedStyleSheets = stylesheetTemplates;
	}

	get adoptedStyleSheets(): CSSStyleSheet[] {
		return this.#root.adoptedStyleSheets;
	}

	set adoptedStyleSheets(stylesheetTemplates: (CSSStyleSheet | string)[]) {
		this.#root.adoptedStyleSheets = getStylesheets(stylesheetTemplates);
	}
}

function getStylesheets(
	stylesheetTemplates: (CSSStyleSheet | string)[],
): CSSStyleSheet[] {
	let stylesheets: CSSStyleSheet[] = [];
	for (let stylesheetTemplate of stylesheetTemplates) {
		if (stylesheetTemplate instanceof CSSStyleSheet) {
			stylesheets.push(stylesheetTemplate);
		}

		if (typeof stylesheetTemplate === "string") {
			const sheet = new CSSStyleSheet();
			sheet.replaceSync(stylesheetTemplate);
			stylesheets.push(sheet);
		}
	}

	return stylesheets;
}

export type { StylesInterface };

export { Styles };
