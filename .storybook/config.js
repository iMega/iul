import React from "react";
import { addDecorator } from "@storybook/react";

import Normalize from "../src/Normalize.js";

addDecorator(story => (
    <React.Fragment>
        <Normalize />
        {story()}
    </React.Fragment>
));
