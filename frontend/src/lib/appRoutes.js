const routes = {
  home: { route: "/", page: "Home" },
  sender: { route: "/sender", page: "Sender" },
  recipient: { route: "/recipient", page: "Recipient" },
  title: { route: "/title", page: "Title" },
  decorate: { route: "/decorate", page: "Design Your Cassette" },
  build: { route: "/build", page: "Build Your Mixtape" },
  notImplemented: { route: "/not-implemented", page: "Not Implemented" },
  playlist: { route: "/playlist/:id", page: "Playlist" },
};

export default routes;
