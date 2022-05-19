"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 186:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_components_BlogComponents_PostBody__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(479);
/* harmony import */ var _shared_components_BlogComponents_PostCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(254);
/* harmony import */ var _shared_controllers_postController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(152);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_components_BlogComponents_PostBody__WEBPACK_IMPORTED_MODULE_4__]);
_shared_components_BlogComponents_PostBody__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const Blog = ({ post , latestPosts  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Center, {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Center, {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                        spacing: "20px",
                        color: "black",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_shared_components_BlogComponents_PostBody__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                content: post.content
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                fontSize: "20px",
                                color: "white",
                                fontWeight: "bold",
                                children: "Latest Post"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_shared_components_BlogComponents_PostCard__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                history: router,
                                postLink: `posts/${latestPosts[0].tags[0]}/${latestPosts[0].slug}`,
                                heading: latestPosts[0].title,
                                url: latestPosts[0].imageUrl,
                                renderIntroBody: ()=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                        children: latestPosts[0].description
                                    })
                                ,
                                readTime: `${latestPosts[0].timeReading.minutes} min`,
                                author: "Pieter Nortje",
                                date: latestPosts[0].date
                            })
                        ]
                    })
                })
            })
        })
    });
};
const getServerSideProps = ()=>{
    const post = _shared_controllers_postController__WEBPACK_IMPORTED_MODULE_6__/* .api.getArticleBySlug */ .h.getArticleBySlug("home", [
        "content",
        "title"
    ]);
    const latestPosts = _shared_controllers_postController__WEBPACK_IMPORTED_MODULE_6__/* .api.getAllArticles */ .h.getAllArticles([
        "content",
        "title",
        "description",
        "imageUrl",
        "timeReading",
        "date",
        "slug",
        "tags", 
    ]);
    return {
        props: {
            post,
            latestPosts
        }
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Blog);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 76:
/***/ ((module) => {

module.exports = require("gray-matter");

/***/ }),

/***/ 853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 727:
/***/ ((module) => {

module.exports = require("react-syntax-highlighter");

/***/ }),

/***/ 794:
/***/ ((module) => {

module.exports = require("react-syntax-highlighter/dist/cjs/styles/prism");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 956:
/***/ ((module) => {

module.exports = require("reading-time");

/***/ }),

/***/ 135:
/***/ ((module) => {

module.exports = import("react-markdown");;

/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [152,254,479], () => (__webpack_exec__(186)));
module.exports = __webpack_exports__;

})();