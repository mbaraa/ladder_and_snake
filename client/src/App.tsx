import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Player from "./models/player";
import Games from "./pages/Games";
import Login from "./pages/Login";
import PlayerRequests from "./utils/player_requests";
import { sleep } from "./utils";

const App = (): React.ReactElement => {
  const [player, setPlayer] = React.useState<Player | null>(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      setPlayer(await PlayerRequests.loginWithToken());
      await sleep(1000);
      setLoading(false);
    })();
  }, []);

  if (loading && player !== null) {
    return <>Loading...</>;
  }

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Games player={player as Player} />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </>
  );
};

export default App;
