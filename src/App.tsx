import React from "react";
import { Camera } from "lucide-react";
import { Theme } from "@radix-ui/themes";
import { BaseButton } from "./components/ui/button";

function App(): React.ReactElement {
  return (
    <Theme>
      <div className="App">
        <h1>Hello World</h1>
        <Camera color="#000" size={48} />

        <BaseButton>Let's go</BaseButton>

      </div>
    </Theme>
  );
}

export default App;
