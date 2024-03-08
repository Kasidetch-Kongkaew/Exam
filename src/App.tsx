import { Toaster } from "react-hot-toast";
import "./App.css";
import FormInput from "./Component/FormInput";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <FormInput />
    </>
  );
}

export default App;
