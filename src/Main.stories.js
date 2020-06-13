import React from "react";

import Main from "./Main.js";

const MainStory = () => <Main />;

MainStory.story = {
    name: "Main"
};

export { MainStory };

export default {
    title: "Test",
    parameters: {
        component: Main
    }
};
