import { Switch, Route } from "wouter";
import Home from "@/pages/home";
import Whitepaper from "@/pages/whitepaper";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/whitepaper" component={Whitepaper} />
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
