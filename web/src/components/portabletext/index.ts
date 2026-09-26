import MathInline from "./MathInline.astro";
import MathBlock from "./MathBlock.astro";
import Working from "./Working.astro";
import CommonMistake from "./CommonMistake.astro";
import Callout from "./Callout.astro";
import ImageWithAlt from "./ImageWithAlt.astro";
import YoutubeEmbed from "./YoutubeEmbed.astro";
import Heading from "./Heading.astro";

// docs/CONTENT-MODEL.md §2 portableBlock allowed custom objects, matching
// studio/schemaTypes/objects/portableTextObjects.ts's portableBodyOf array member types exactly.
export const postBodyComponents = {
	type: {
		mathInline: MathInline,
		mathBlock: MathBlock,
		working: Working,
		commonMistake: CommonMistake,
		callout: Callout,
		imageWithAlt: ImageWithAlt,
		youtubeEmbed: YoutubeEmbed,
	},
	// H2–H4 carry anchor ids for the table of contents (lib/content/postHeadings.ts).
	block: {
		h2: Heading,
		h3: Heading,
		h4: Heading,
	},
};
