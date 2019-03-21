module.exports = {
    "testEnvironment": "node",
    "roots": [
        "<rootDir>/src",
        "<rootDir>/lab"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testMatch": ["<rootDir>/**/*Spec.+(ts|tsx|js)"],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "globals": {
        "ts-jest": {
            "tsConfig": "tsconfig.spec.json"
        }
    }
}