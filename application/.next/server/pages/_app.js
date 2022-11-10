/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./context/TwitterContext.js":
/*!***********************************!*\
  !*** ./context/TwitterContext.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TwitterContext\": () => (/* binding */ TwitterContext),\n/* harmony export */   \"TwitterProvider\": () => (/* binding */ TwitterProvider)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/client */ \"./lib/client.js\");\n\n\n\n\nconst TwitterContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst TwitterProvider = ({ children  })=>{\n    const { 0: appStatus , 1: setAppStatus  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const { 0: currentAccount , 1: setCurrentAccount  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const { 0: currentUser , 1: setCurrentUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    const { 0: tweets , 1: setTweets  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        checkIfWalletIsConnected();\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!currentAccount && appStatus == 'connected') return;\n        getCurrentUserDetails(currentAccount);\n        fetchTweets();\n    }, [\n        currentAccount,\n        appStatus\n    ]);\n    /**\n   * Checks if there is an active wallet connection\n   */ const checkIfWalletIsConnected = async ()=>{\n        if (!window.ethereum) return setAppStatus('noMetaMask');\n        try {\n            const addressArray = await window.ethereum.request({\n                method: 'eth_accounts'\n            });\n            if (addressArray.length > 0) {\n                setAppStatus('connected');\n                setCurrentAccount(addressArray[0]);\n                createUserAccount(addressArray[0]);\n            } else {\n                router.push('/');\n                setAppStatus('notConnected');\n            }\n        } catch (err) {\n            router.push('/');\n            setAppStatus('error');\n        }\n    };\n    /**\n   * Initiates MetaMask wallet connection\n   */ const connectWallet = async ()=>{\n        if (!window.ethereum) return setAppStatus('noMetaMask');\n        try {\n            setAppStatus('loading');\n            const addressArray = await window.ethereum.request({\n                method: 'eth_requestAccounts'\n            });\n            if (addressArray.length > 0) {\n                setCurrentAccount(addressArray[0]);\n                createUserAccount(addressArray[0]);\n            } else {\n                router.push('/');\n                setAppStatus('notConnected');\n            }\n        } catch (err) {\n            setAppStatus('error');\n        }\n    };\n    /**\n   * Creates an account in Sanity DB if the user does not already have one\n   * @param {String} userAddress Wallet address of the currently logged in user\n   */ const createUserAccount = async (userAddress = currentAccount)=>{\n        if (!window.ethereum) return setAppStatus('noMetaMask');\n        try {\n            const userDoc = {\n                _type: 'users',\n                _id: userAddress,\n                name: 'Unnamed',\n                isProfileImageNft: false,\n                profileImage: 'https://mashtag.net/image/meshtag1-bg.png',\n                walletAddress: userAddress\n            };\n            await _lib_client__WEBPACK_IMPORTED_MODULE_3__.client.createIfNotExists(userDoc);\n            setAppStatus('connected');\n        } catch (error) {\n            router.push('/');\n            setAppStatus('error');\n        }\n    };\n    /**\n   * Generates NFT profile picture URL or returns the image URL if it's not an NFT\n   * @param {String} imageUri If the user has minted a profile picture, an IPFS hash; if not then the URL of their profile picture\n   * @param {Boolean} isNft Indicates whether the user has minted a profile picture\n   * @returns A full URL to the profile picture\n   */ const getNftProfileImage = async (imageUri, isNft)=>{\n        if (isNft) {\n            return `https://gateway.pinata.cloud/ipfs/${imageUri}`;\n        } else if (!isNft) {\n            return imageUri;\n        }\n    };\n    /**\n   * Gets all the tweets stored in Sanity DB.\n   */ const fetchTweets = async ()=>{\n        const query = `\n      *[_type == \"tweets\"]{\n        \"author\": author->{name, walletAddress, profileImage, isProfileImageNft},\n        tweet,\n        timestamp\n      }|order(timestamp desc)\n    `;\n        // setTweets(await client.fetch(query))\n        const sanityResponse = await _lib_client__WEBPACK_IMPORTED_MODULE_3__.client.fetch(query);\n        setTweets([]);\n        /**\n     * Async await not available with for..of loops.\n     */ sanityResponse.forEach(async (item)=>{\n            const profileImageUrl = await getNftProfileImage(item.author.profileImage, item.author.isProfileImageNft);\n            if (item.author.isProfileImageNft) {\n                const newItem = {\n                    tweet: item.tweet,\n                    timestamp: item.timestamp,\n                    author: {\n                        name: item.author.name,\n                        walletAddress: item.author.walletAddress,\n                        profileImage: profileImageUrl,\n                        isProfileImageNft: item.author.isProfileImageNft\n                    }\n                };\n                setTweets((prevState)=>[\n                        ...prevState,\n                        newItem\n                    ]\n                );\n            } else {\n                setTweets((prevState)=>[\n                        ...prevState,\n                        item\n                    ]\n                );\n            }\n        });\n    };\n    /**\n   * Gets the current user details from Sanity DB.\n   * @param {String} userAccount Wallet address of the currently logged in user\n   * @returns null\n   */ const getCurrentUserDetails = async (userAccount = currentAccount)=>{\n        if (appStatus !== 'connected') return;\n        const query = `\n      *[_type == \"users\" && _id == \"${userAccount}\"]{\n        \"tweets\": tweets[]->{timestamp, tweet}|order(timestamp desc),\n        name,\n        profileImage,\n        isProfileImageNft,\n        coverImage,\n        walletAddress\n      }\n    `;\n        const response = await _lib_client__WEBPACK_IMPORTED_MODULE_3__.client.fetch(query);\n        const profileImageUri = await getNftProfileImage(response[0].profileImage, response[0].isProfileImageNft);\n        setCurrentUser({\n            tweets: response[0].tweets,\n            name: response[0].name,\n            profileImage: profileImageUri,\n            walletAddress: response[0].walletAddress,\n            coverImage: response[0].coverImage,\n            isProfileImageNft: response[0].isProfileImageNft\n        });\n    };\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TwitterContext.Provider, {\n        value: {\n            appStatus,\n            currentAccount,\n            connectWallet,\n            tweets,\n            fetchTweets,\n            setAppStatus,\n            getNftProfileImage,\n            currentUser,\n            getCurrentUserDetails\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/shikhar/Code/mashtag-app/application/context/TwitterContext.js\",\n        lineNumber: 194,\n        columnNumber: 5\n    }, undefined));\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RixTQUFTLEtBQUssQ0FBVyxZQUFFLE1BQU07UUFFckMsS0FBSyxDQUFDbUMsS0FBSyxJQUFJO29DQUNpQixFQUFFVyxXQUFXLENBQUM7Ozs7Ozs7O0lBUTlDO1FBQ0EsS0FBSyxDQUFDQyxRQUFRLEdBQUcsS0FBSyxDQUFDbkQscURBQVksQ0FBQ3VDLEtBQUs7UUFFekMsS0FBSyxDQUFDYSxlQUFlLEdBQUcsS0FBSyxDQUFDaEIsa0JBQWtCLENBQzlDZSxRQUFRLENBQUMsQ0FBQyxFQUFFbkIsWUFBWSxFQUN4Qm1CLFFBQVEsQ0FBQyxDQUFDLEVBQUVwQixpQkFBaUI7UUFHL0J0QixjQUFjLENBQUMsQ0FBQztZQUNkQyxNQUFNLEVBQUV5QyxRQUFRLENBQUMsQ0FBQyxFQUFFekMsTUFBTTtZQUMxQm9CLElBQUksRUFBRXFCLFFBQVEsQ0FBQyxDQUFDLEVBQUVyQixJQUFJO1lBQ3RCRSxZQUFZLEVBQUVvQixlQUFlO1lBQzdCbkIsYUFBYSxFQUFFa0IsUUFBUSxDQUFDLENBQUMsRUFBRWxCLGFBQWE7WUFDeENvQixVQUFVLEVBQUVGLFFBQVEsQ0FBQyxDQUFDLEVBQUVFLFVBQVU7WUFDbEN0QixpQkFBaUIsRUFBRW9CLFFBQVEsQ0FBQyxDQUFDLEVBQUVwQixpQkFBaUI7UUFDbEQsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLDZFQUNIOUIsY0FBYyxDQUFDcUQsUUFBUTtRQUN0QkMsS0FBSyxFQUFFLENBQUM7WUFDTm5ELFNBQVM7WUFDVEUsY0FBYztZQUNkbUIsYUFBYTtZQUNiZixNQUFNO1lBQ05LLFdBQVc7WUFDWFYsWUFBWTtZQUNaK0Isa0JBQWtCO1lBQ2xCNUIsV0FBVztZQUNYTSxxQkFBcUI7UUFDdkIsQ0FBQztrQkFFQVgsUUFBUTs7Ozs7O0FBR2YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3R3aXR0ZXItd2ViMy8uL2NvbnRleHQvVHdpdHRlckNvbnRleHQuanM/N2RhNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcbmltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uL2xpYi9jbGllbnQnXG5cbmV4cG9ydCBjb25zdCBUd2l0dGVyQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKVxuXG5leHBvcnQgY29uc3QgVHdpdHRlclByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBjb25zdCBbYXBwU3RhdHVzLCBzZXRBcHBTdGF0dXNdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjdXJyZW50QWNjb3VudCwgc2V0Q3VycmVudEFjY291bnRdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjdXJyZW50VXNlciwgc2V0Q3VycmVudFVzZXJdID0gdXNlU3RhdGUoe30pXG4gIGNvbnN0IFt0d2VldHMsIHNldFR3ZWV0c10gPSB1c2VTdGF0ZShbXSlcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNoZWNrSWZXYWxsZXRJc0Nvbm5lY3RlZCgpXG4gIH0sIFtdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFjdXJyZW50QWNjb3VudCAmJiBhcHBTdGF0dXMgPT0gJ2Nvbm5lY3RlZCcpIHJldHVyblxuICAgIGdldEN1cnJlbnRVc2VyRGV0YWlscyhjdXJyZW50QWNjb3VudClcbiAgICBmZXRjaFR3ZWV0cygpXG4gIH0sIFtjdXJyZW50QWNjb3VudCwgYXBwU3RhdHVzXSlcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZXJlIGlzIGFuIGFjdGl2ZSB3YWxsZXQgY29ubmVjdGlvblxuICAgKi9cbiAgY29uc3QgY2hlY2tJZldhbGxldElzQ29ubmVjdGVkID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghd2luZG93LmV0aGVyZXVtKSByZXR1cm4gc2V0QXBwU3RhdHVzKCdub01ldGFNYXNrJylcbiAgICB0cnkge1xuICAgICAgY29uc3QgYWRkcmVzc0FycmF5ID0gYXdhaXQgd2luZG93LmV0aGVyZXVtLnJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6ICdldGhfYWNjb3VudHMnLFxuICAgICAgfSlcbiAgICAgIGlmIChhZGRyZXNzQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICBzZXRBcHBTdGF0dXMoJ2Nvbm5lY3RlZCcpXG4gICAgICAgIHNldEN1cnJlbnRBY2NvdW50KGFkZHJlc3NBcnJheVswXSlcblxuICAgICAgICBjcmVhdGVVc2VyQWNjb3VudChhZGRyZXNzQXJyYXlbMF0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3V0ZXIucHVzaCgnLycpXG4gICAgICAgIHNldEFwcFN0YXR1cygnbm90Q29ubmVjdGVkJylcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJvdXRlci5wdXNoKCcvJylcbiAgICAgIHNldEFwcFN0YXR1cygnZXJyb3InKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgTWV0YU1hc2sgd2FsbGV0IGNvbm5lY3Rpb25cbiAgICovXG4gIGNvbnN0IGNvbm5lY3RXYWxsZXQgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCF3aW5kb3cuZXRoZXJldW0pIHJldHVybiBzZXRBcHBTdGF0dXMoJ25vTWV0YU1hc2snKVxuICAgIHRyeSB7XG4gICAgICBzZXRBcHBTdGF0dXMoJ2xvYWRpbmcnKVxuXG4gICAgICBjb25zdCBhZGRyZXNzQXJyYXkgPSBhd2FpdCB3aW5kb3cuZXRoZXJldW0ucmVxdWVzdCh7XG4gICAgICAgIG1ldGhvZDogJ2V0aF9yZXF1ZXN0QWNjb3VudHMnLFxuICAgICAgfSlcblxuICAgICAgaWYgKGFkZHJlc3NBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNldEN1cnJlbnRBY2NvdW50KGFkZHJlc3NBcnJheVswXSlcbiAgICAgICAgY3JlYXRlVXNlckFjY291bnQoYWRkcmVzc0FycmF5WzBdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm91dGVyLnB1c2goJy8nKVxuICAgICAgICBzZXRBcHBTdGF0dXMoJ25vdENvbm5lY3RlZCcpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRBcHBTdGF0dXMoJ2Vycm9yJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhY2NvdW50IGluIFNhbml0eSBEQiBpZiB0aGUgdXNlciBkb2VzIG5vdCBhbHJlYWR5IGhhdmUgb25lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyQWRkcmVzcyBXYWxsZXQgYWRkcmVzcyBvZiB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyXG4gICAqL1xuICBjb25zdCBjcmVhdGVVc2VyQWNjb3VudCA9IGFzeW5jICh1c2VyQWRkcmVzcyA9IGN1cnJlbnRBY2NvdW50KSA9PiB7XG4gICAgaWYgKCF3aW5kb3cuZXRoZXJldW0pIHJldHVybiBzZXRBcHBTdGF0dXMoJ25vTWV0YU1hc2snKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB1c2VyRG9jID0ge1xuICAgICAgICBfdHlwZTogJ3VzZXJzJyxcbiAgICAgICAgX2lkOiB1c2VyQWRkcmVzcyxcbiAgICAgICAgbmFtZTogJ1VubmFtZWQnLFxuICAgICAgICBpc1Byb2ZpbGVJbWFnZU5mdDogZmFsc2UsXG4gICAgICAgIHByb2ZpbGVJbWFnZTpcbiAgICAgICAgICAnaHR0cHM6Ly9tYXNodGFnLm5ldC9pbWFnZS9tZXNodGFnMS1iZy5wbmcnLFxuICAgICAgICB3YWxsZXRBZGRyZXNzOiB1c2VyQWRkcmVzcyxcbiAgICAgIH1cblxuICAgICAgYXdhaXQgY2xpZW50LmNyZWF0ZUlmTm90RXhpc3RzKHVzZXJEb2MpXG5cbiAgICAgIHNldEFwcFN0YXR1cygnY29ubmVjdGVkJylcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcm91dGVyLnB1c2goJy8nKVxuICAgICAgc2V0QXBwU3RhdHVzKCdlcnJvcicpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBORlQgcHJvZmlsZSBwaWN0dXJlIFVSTCBvciByZXR1cm5zIHRoZSBpbWFnZSBVUkwgaWYgaXQncyBub3QgYW4gTkZUXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpbWFnZVVyaSBJZiB0aGUgdXNlciBoYXMgbWludGVkIGEgcHJvZmlsZSBwaWN0dXJlLCBhbiBJUEZTIGhhc2g7IGlmIG5vdCB0aGVuIHRoZSBVUkwgb2YgdGhlaXIgcHJvZmlsZSBwaWN0dXJlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNOZnQgSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHVzZXIgaGFzIG1pbnRlZCBhIHByb2ZpbGUgcGljdHVyZVxuICAgKiBAcmV0dXJucyBBIGZ1bGwgVVJMIHRvIHRoZSBwcm9maWxlIHBpY3R1cmVcbiAgICovXG4gIGNvbnN0IGdldE5mdFByb2ZpbGVJbWFnZSA9IGFzeW5jIChpbWFnZVVyaSwgaXNOZnQpID0+IHtcbiAgICBpZiAoaXNOZnQpIHtcbiAgICAgIHJldHVybiBgaHR0cHM6Ly9nYXRld2F5LnBpbmF0YS5jbG91ZC9pcGZzLyR7aW1hZ2VVcml9YFxuICAgIH0gZWxzZSBpZiAoIWlzTmZ0KSB7XG4gICAgICByZXR1cm4gaW1hZ2VVcmlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIHR3ZWV0cyBzdG9yZWQgaW4gU2FuaXR5IERCLlxuICAgKi9cbiAgY29uc3QgZmV0Y2hUd2VldHMgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcXVlcnkgPSBgXG4gICAgICAqW190eXBlID09IFwidHdlZXRzXCJde1xuICAgICAgICBcImF1dGhvclwiOiBhdXRob3ItPntuYW1lLCB3YWxsZXRBZGRyZXNzLCBwcm9maWxlSW1hZ2UsIGlzUHJvZmlsZUltYWdlTmZ0fSxcbiAgICAgICAgdHdlZXQsXG4gICAgICAgIHRpbWVzdGFtcFxuICAgICAgfXxvcmRlcih0aW1lc3RhbXAgZGVzYylcbiAgICBgXG5cbiAgICAvLyBzZXRUd2VldHMoYXdhaXQgY2xpZW50LmZldGNoKHF1ZXJ5KSlcblxuICAgIGNvbnN0IHNhbml0eVJlc3BvbnNlID0gYXdhaXQgY2xpZW50LmZldGNoKHF1ZXJ5KVxuXG4gICAgc2V0VHdlZXRzKFtdKVxuXG4gICAgLyoqXG4gICAgICogQXN5bmMgYXdhaXQgbm90IGF2YWlsYWJsZSB3aXRoIGZvci4ub2YgbG9vcHMuXG4gICAgICovXG4gICAgc2FuaXR5UmVzcG9uc2UuZm9yRWFjaChhc3luYyBpdGVtID0+IHtcbiAgICAgIGNvbnN0IHByb2ZpbGVJbWFnZVVybCA9IGF3YWl0IGdldE5mdFByb2ZpbGVJbWFnZShcbiAgICAgICAgaXRlbS5hdXRob3IucHJvZmlsZUltYWdlLFxuICAgICAgICBpdGVtLmF1dGhvci5pc1Byb2ZpbGVJbWFnZU5mdCxcbiAgICAgIClcblxuICAgICAgaWYgKGl0ZW0uYXV0aG9yLmlzUHJvZmlsZUltYWdlTmZ0KSB7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSB7XG4gICAgICAgICAgdHdlZXQ6IGl0ZW0udHdlZXQsXG4gICAgICAgICAgdGltZXN0YW1wOiBpdGVtLnRpbWVzdGFtcCxcbiAgICAgICAgICBhdXRob3I6IHtcbiAgICAgICAgICAgIG5hbWU6IGl0ZW0uYXV0aG9yLm5hbWUsXG4gICAgICAgICAgICB3YWxsZXRBZGRyZXNzOiBpdGVtLmF1dGhvci53YWxsZXRBZGRyZXNzLFxuICAgICAgICAgICAgcHJvZmlsZUltYWdlOiBwcm9maWxlSW1hZ2VVcmwsXG4gICAgICAgICAgICBpc1Byb2ZpbGVJbWFnZU5mdDogaXRlbS5hdXRob3IuaXNQcm9maWxlSW1hZ2VOZnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFR3ZWV0cyhwcmV2U3RhdGUgPT4gWy4uLnByZXZTdGF0ZSwgbmV3SXRlbV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUd2VldHMocHJldlN0YXRlID0+IFsuLi5wcmV2U3RhdGUsIGl0ZW1dKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCB1c2VyIGRldGFpbHMgZnJvbSBTYW5pdHkgREIuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyQWNjb3VudCBXYWxsZXQgYWRkcmVzcyBvZiB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyXG4gICAqIEByZXR1cm5zIG51bGxcbiAgICovXG4gIGNvbnN0IGdldEN1cnJlbnRVc2VyRGV0YWlscyA9IGFzeW5jICh1c2VyQWNjb3VudCA9IGN1cnJlbnRBY2NvdW50KSA9PiB7XG4gICAgaWYgKGFwcFN0YXR1cyAhPT0gJ2Nvbm5lY3RlZCcpIHJldHVyblxuXG4gICAgY29uc3QgcXVlcnkgPSBgXG4gICAgICAqW190eXBlID09IFwidXNlcnNcIiAmJiBfaWQgPT0gXCIke3VzZXJBY2NvdW50fVwiXXtcbiAgICAgICAgXCJ0d2VldHNcIjogdHdlZXRzW10tPnt0aW1lc3RhbXAsIHR3ZWV0fXxvcmRlcih0aW1lc3RhbXAgZGVzYyksXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHByb2ZpbGVJbWFnZSxcbiAgICAgICAgaXNQcm9maWxlSW1hZ2VOZnQsXG4gICAgICAgIGNvdmVySW1hZ2UsXG4gICAgICAgIHdhbGxldEFkZHJlc3NcbiAgICAgIH1cbiAgICBgXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuZmV0Y2gocXVlcnkpXG5cbiAgICBjb25zdCBwcm9maWxlSW1hZ2VVcmkgPSBhd2FpdCBnZXROZnRQcm9maWxlSW1hZ2UoXG4gICAgICByZXNwb25zZVswXS5wcm9maWxlSW1hZ2UsXG4gICAgICByZXNwb25zZVswXS5pc1Byb2ZpbGVJbWFnZU5mdCxcbiAgICApXG5cbiAgICBzZXRDdXJyZW50VXNlcih7XG4gICAgICB0d2VldHM6IHJlc3BvbnNlWzBdLnR3ZWV0cyxcbiAgICAgIG5hbWU6IHJlc3BvbnNlWzBdLm5hbWUsXG4gICAgICBwcm9maWxlSW1hZ2U6IHByb2ZpbGVJbWFnZVVyaSxcbiAgICAgIHdhbGxldEFkZHJlc3M6IHJlc3BvbnNlWzBdLndhbGxldEFkZHJlc3MsXG4gICAgICBjb3ZlckltYWdlOiByZXNwb25zZVswXS5jb3ZlckltYWdlLFxuICAgICAgaXNQcm9maWxlSW1hZ2VOZnQ6IHJlc3BvbnNlWzBdLmlzUHJvZmlsZUltYWdlTmZ0LFxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxUd2l0dGVyQ29udGV4dC5Qcm92aWRlclxuICAgICAgdmFsdWU9e3tcbiAgICAgICAgYXBwU3RhdHVzLFxuICAgICAgICBjdXJyZW50QWNjb3VudCxcbiAgICAgICAgY29ubmVjdFdhbGxldCxcbiAgICAgICAgdHdlZXRzLFxuICAgICAgICBmZXRjaFR3ZWV0cyxcbiAgICAgICAgc2V0QXBwU3RhdHVzLFxuICAgICAgICBnZXROZnRQcm9maWxlSW1hZ2UsXG4gICAgICAgIGN1cnJlbnRVc2VyLFxuICAgICAgICBnZXRDdXJyZW50VXNlckRldGFpbHMsXG4gICAgICB9fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1R3aXR0ZXJDb250ZXh0LlByb3ZpZGVyPlxuICApXG59XG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlUm91dGVyIiwiY2xpZW50IiwiVHdpdHRlckNvbnRleHQiLCJUd2l0dGVyUHJvdmlkZXIiLCJjaGlsZHJlbiIsImFwcFN0YXR1cyIsInNldEFwcFN0YXR1cyIsImN1cnJlbnRBY2NvdW50Iiwic2V0Q3VycmVudEFjY291bnQiLCJjdXJyZW50VXNlciIsInNldEN1cnJlbnRVc2VyIiwidHdlZXRzIiwic2V0VHdlZXRzIiwicm91dGVyIiwiY2hlY2tJZldhbGxldElzQ29ubmVjdGVkIiwiZ2V0Q3VycmVudFVzZXJEZXRhaWxzIiwiZmV0Y2hUd2VldHMiLCJ3aW5kb3ciLCJldGhlcmV1bSIsImFkZHJlc3NBcnJheSIsInJlcXVlc3QiLCJtZXRob2QiLCJsZW5ndGgiLCJjcmVhdGVVc2VyQWNjb3VudCIsInB1c2giLCJlcnIiLCJjb25uZWN0V2FsbGV0IiwidXNlckFkZHJlc3MiLCJ1c2VyRG9jIiwiX3R5cGUiLCJfaWQiLCJuYW1lIiwiaXNQcm9maWxlSW1hZ2VOZnQiLCJwcm9maWxlSW1hZ2UiLCJ3YWxsZXRBZGRyZXNzIiwiY3JlYXRlSWZOb3RFeGlzdHMiLCJlcnJvciIsImdldE5mdFByb2ZpbGVJbWFnZSIsImltYWdlVXJpIiwiaXNOZnQiLCJxdWVyeSIsInNhbml0eVJlc3BvbnNlIiwiZmV0Y2giLCJmb3JFYWNoIiwiaXRlbSIsInByb2ZpbGVJbWFnZVVybCIsImF1dGhvciIsIm5ld0l0ZW0iLCJ0d2VldCIsInRpbWVzdGFtcCIsInByZXZTdGF0ZSIsInVzZXJBY2NvdW50IiwicmVzcG9uc2UiLCJwcm9maWxlSW1hZ2VVcmkiLCJjb3ZlckltYWdlIiwiUHJvdmlkZXIiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./context/TwitterContext.js\n");

/***/ }),

/***/ "./lib/client.js":
/*!***********************!*\
  !*** ./lib/client.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"client\": () => (/* binding */ client)\n/* harmony export */ });\n/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sanity/client */ \"@sanity/client\");\n/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sanity_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst client = _sanity_client__WEBPACK_IMPORTED_MODULE_0___default()({\n    projectId: \"hin633mh\",\n    dataset: 'production',\n    apiVersion: 'v1',\n    token: \"skqwiSf2Zv2yxPuFrK9pfbpHsgsrOw4ixJDEM9EgMK2EdIDIfRVIH0TaL2O3pi3VQS6qAO19Qrv2Dt9ltfczIRZ5RSsB3uHrY116GsVWrEwgSkp8b4t1dg8lyplnUvDWAQ1J6fKWXsoblBPvduDAnZSLe3OmrhrqiqSA9UFTkvVyOUvuB9xo\",\n    useCdn: false\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvY2xpZW50LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF5QztBQUVsQyxLQUFLLENBQUNDLE1BQU0sR0FBR0QscURBQVksQ0FBQyxDQUFDO0lBQ2xDRSxTQUFTLEVBQUVDLFVBQXlDO0lBQ3BERyxPQUFPLEVBQUUsQ0FBWTtJQUNyQkMsVUFBVSxFQUFFLENBQUk7SUFDaEJDLEtBQUssRUFBRUwsc0xBQW9DO0lBQzNDTyxNQUFNLEVBQUUsS0FBSztBQUNmLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90d2l0dGVyLXdlYjMvLi9saWIvY2xpZW50LmpzP2U2OWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNhbml0eUNsaWVudCBmcm9tICdAc2FuaXR5L2NsaWVudCdcblxuZXhwb3J0IGNvbnN0IGNsaWVudCA9IHNhbml0eUNsaWVudCh7XG4gIHByb2plY3RJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0FOSVRZX1BST0pFQ1RfSUQsXG4gIGRhdGFzZXQ6ICdwcm9kdWN0aW9uJyxcbiAgYXBpVmVyc2lvbjogJ3YxJyxcbiAgdG9rZW46IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NBTklUWV9UT0tFTixcbiAgdXNlQ2RuOiBmYWxzZSxcbn0pXG4iXSwibmFtZXMiOlsic2FuaXR5Q2xpZW50IiwiY2xpZW50IiwicHJvamVjdElkIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NBTklUWV9QUk9KRUNUX0lEIiwiZGF0YXNldCIsImFwaVZlcnNpb24iLCJ0b2tlbiIsIk5FWFRfUFVCTElDX1NBTklUWV9UT0tFTiIsInVzZUNkbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./lib/client.js\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context_TwitterContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/TwitterContext */ \"./context/TwitterContext.js\");\n/* harmony import */ var _lib_hexStyles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/hexStyles.css */ \"./lib/hexStyles.css\");\n/* harmony import */ var _lib_hexStyles_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_hexStyles_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction MyApp({ Component , pageProps  }) {\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_TwitterContext__WEBPACK_IMPORTED_MODULE_2__.TwitterProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/Users/shikhar/Code/mashtag-app/application/pages/_app.tsx\",\n            lineNumber: 9,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/shikhar/Code/mashtag-app/application/pages/_app.tsx\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, this));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBOEI7QUFFNkI7QUFDOUI7U0FFcEJDLEtBQUssQ0FBQyxDQUFDLENBQUNDLFNBQVMsR0FBRUMsU0FBUyxFQUFXLENBQUMsRUFBRSxDQUFDO0lBQ2xELE1BQU0sNkVBQ0hILG9FQUFlOzhGQUNiRSxTQUFTO2VBQUtDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCLENBQUM7QUFFRCxpRUFBZUYsS0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovL3R3aXR0ZXItd2ViMy8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnXG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnXG5pbXBvcnQgeyBUd2l0dGVyUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0L1R3aXR0ZXJDb250ZXh0J1xuaW1wb3J0ICcuLi9saWIvaGV4U3R5bGVzLmNzcydcblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxUd2l0dGVyUHJvdmlkZXI+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9Ud2l0dGVyUHJvdmlkZXI+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHBcbiJdLCJuYW1lcyI6WyJUd2l0dGVyUHJvdmlkZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./lib/hexStyles.css":
/*!***************************!*\
  !*** ./lib/hexStyles.css ***!
  \***************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@sanity/client":
/*!*********************************!*\
  !*** external "@sanity/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@sanity/client");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();