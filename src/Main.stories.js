import React from "react";

import Connection from "./Connection";

const MainStory = () => <Connection />;

MainStory.story = {
    name: "Main"
};

export { MainStory };

export default {
    title: "Test",
    parameters: {
        component: Connection
    }
};
