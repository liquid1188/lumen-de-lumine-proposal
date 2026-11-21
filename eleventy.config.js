export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/media");

  // Path for a page in a language, e.g. purl(lang, "institute") -> "/it/istituto/"
  eleventyConfig.addFilter("purl", (lang, key) => {
    const slug = lang.slugs[key];
    return lang.prefix + "/" + (slug ? slug + "/" : "");
  });
  // The other language (the site has two)
  eleventyConfig.addFilter("otherLang", (langs, code) => langs.find((l) => l.code !== code));

  return {
    dir: { input: "src", output: "_site" },
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}
