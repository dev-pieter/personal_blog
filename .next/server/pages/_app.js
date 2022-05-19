"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 167:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(930);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(853);
;// CONCATENATED MODULE: external "react-icons/fa"
const fa_namespaceObject = require("react-icons/fa");
;// CONCATENATED MODULE: external "react-icons/fi"
const fi_namespaceObject = require("react-icons/fi");
;// CONCATENATED MODULE: external "react-icons/ai"
const ai_namespaceObject = require("react-icons/ai");
;// CONCATENATED MODULE: ./blog.config.jsx




const config = {
    blog_name: "dev-pieter",
    blog_description: "A blog for programmers.",
    blog_intro: "Welcome to my Developer Blog",
    blog_api_url: "https://api.devpieter.co.za",
    blog_categories: [
        {
            name: "home",
            path: "",
            icon: /*#__PURE__*/ jsx_runtime_.jsx(ai_namespaceObject.AiFillHome, {})
        },
        {
            name: "daily-dev",
            path: "posts?category=daily-dev",
            icon: /*#__PURE__*/ jsx_runtime_.jsx(fi_namespaceObject.FiCode, {})
        },
        {
            name: "tutorials",
            path: "posts?category=tutorials",
            icon: /*#__PURE__*/ jsx_runtime_.jsx(fa_namespaceObject.FaGraduationCap, {})
        }, 
    ]
};

;// CONCATENATED MODULE: ./shared/components/AppFrame.tsx





const AppFrame = ({ children  })=>{
    const router = (0,router_.useRouter)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Stack, {
        minH: "100vh",
        pb: "28px",
        spacing: 8,
        bg: "gray.800",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.HStack, {
                height: "80px",
                borderBottom: "1px solid white",
                position: "sticky",
                top: "0",
                bg: "gray.900",
                zIndex: "100",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
                        mx: 8,
                        p: "6px 12px",
                        border: "1px solid white",
                        boxShadow: "5px 5px white",
                        display: {
                            base: "none",
                            md: "block"
                        },
                        color: "white",
                        bg: "none",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Heading, {
                            fontFamily: "monospace",
                            fontSize: "2xl",
                            children: config.blog_name
                        })
                    }),
                    config.blog_categories.map((cat)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.HStack, {
                            pr: 4,
                            onClick: ()=>router.push(`/${cat.path}`)
                            ,
                            cursor: "pointer",
                            _hover: {
                                color: "orange",
                                textDecoration: "underline"
                            },
                            color: "white",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    children: cat.icon
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    children: cat.name
                                })
                            ]
                        }, cat.name)
                    )
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(react_.Center, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
                    width: {
                        base: "100%",
                        md: "768px"
                    },
                    p: {
                        base: "3",
                        md: "0"
                    },
                    color: "white",
                    children: children
                })
            })
        ]
    });
};
/* harmony default export */ const components_AppFrame = (AppFrame);

;// CONCATENATED MODULE: ./pages/_app.tsx




function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(react_.ChakraProvider, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(components_AppFrame, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        })
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(167));
module.exports = __webpack_exports__;

})();