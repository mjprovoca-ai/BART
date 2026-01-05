import { Switch, Route } from "wouter";
import Home from "@/pages/home";
import Whitepaper from "@/pages/whitepaper";
import Tokenize from "@/pages/tokenize";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/whitepaper" component={Whitepaper} />
      <Route path="/tokenize" component={Tokenize} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
