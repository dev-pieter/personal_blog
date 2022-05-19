"use strict";
exports.id = 152;
exports.ids = [152];
exports.modules = {

/***/ 152:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ api)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76);
/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gray_matter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reading_time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(956);
/* harmony import */ var reading_time__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(reading_time__WEBPACK_IMPORTED_MODULE_3__);




const articlesDirectory = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(process.cwd(), "articles");
function getRawArticleBySlug(slug) {
    const fullPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(articlesDirectory, `${slug}.md`);
    const fileContents = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(fullPath, "utf8");
    return gray_matter__WEBPACK_IMPORTED_MODULE_2___default()(fileContents);
}
function getAllSlugs() {
    return fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(articlesDirectory);
}
function getArticleBySlug(slug, fields = []) {
    const realSlug = slug.replace(/\.md$/, "");
    const { data , content  } = getRawArticleBySlug(realSlug);
    const timeReading = reading_time__WEBPACK_IMPORTED_MODULE_3___default()(content);
    const items = {};
    fields.forEach((field)=>{
        if (field === "slug") {
            items[field] = realSlug;
        }
        if (field === "content") {
            items[field] = content;
        }
        if (field === "timeReading") {
            items[field] = timeReading;
        }
        if (data[field]) {
            items[field] = data[field];
        }
    });
    return items;
}
function getAllArticles(fields = []) {
    return getAllSlugs().map((slug)=>getArticleBySlug(slug, fields)
    ).sort((article1, article2)=>article1.date > article2.date ? -1 : 1
    );
}
function getArticlesByTag(tag, fields = []) {
    return getAllArticles(fields.concat([
        "tags"
    ])).filter((article)=>{
        var _tags;
        const tags = (_tags = article.tags) !== null && _tags !== void 0 ? _tags : [];
        return tags.includes(tag);
    });
}
function getArticlesByCategory(category, fields = []) {
    return getAllArticles(fields.concat([
        "category"
    ])).filter((article)=>{
        var _category;
        const cat = (_category = article.category) !== null && _category !== void 0 ? _category : "";
        return cat === category;
    });
}
function getAllTags() {
    const articles = getAllArticles([
        "tags"
    ]);
    const allTags = new Set();
    articles.forEach((article)=>{
        const tags = article.tags;
        tags.forEach((tag)=>allTags.add(tag)
        );
    });
    return Array.from(allTags);
}
const api = {
    getRawArticleBySlug,
    getAllSlugs,
    getAllArticles,
    getArticlesByTag,
    getArticleBySlug,
    getAllTags,
    getArticlesByCategory
};


/***/ })

};
;