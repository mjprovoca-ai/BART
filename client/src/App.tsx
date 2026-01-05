import { Switch, Route } from "wouter";
import Home from "@/pages/home";
import Whitepaper from "@/pages/whitepaper";
import Tokenize from "@/pages/tokenize";
import Marketplace from "@/pages/marketplace";
import Profile from "@/pages/profile";
import DAO from "@/pages/dao";
import Sale from "@/pages/sale";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/whitepaper" component={Whitepaper} />
      <Route path="/tokenize" component={Tokenize} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/profile" component={Profile} />
      <Route path="/dao" component={DAO} />
      <Route path="/sale" component={Sale} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />
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
