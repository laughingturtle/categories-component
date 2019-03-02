import React from "react";
import RecentBroadcasts from "./RecentBroadcasts.jsx";
import RecentHighlights from "./RecentHighlights.jsx";
import PopularClips from "./PopularClips.jsx";
import AllVideos from "./AllVideos.jsx";
import { Switch, HashRouter, Route } from "react-router-dom";
// const gameData = require('../../database/gameData_webpImages.js');
// const gameData = require('../../database/gameData.js');

/*
For faster loading static page, un-comment path to gameData_webpImages.js, above.
And for non-optimized static page, un-comment path to gameData.js.
*/

export default class Categorized_Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* for dynamic page */
      allVideos: null,
      recentBroadcasts: null,
      recentHighlights: null,
      popularClips: null

      /* for static page */
      // allVideos: gameData.allVideos,
      // recentBroadcasts: gameData.recentBroadcasts,
      // recentHighlights: gameData.recentHighlights,
      // popularClips: gameData.popularClips,
    };
  }

  /* for static page, comment out entire componentDidMount function */
  componentDidMount() {
    let allVideos = {};
    fetch("http://localhost:3000/recent-broadcasts")
      // .then(response => {
      //   console.log("response", response);
      //   response.json();
      // })
      .then(response => response.json())
      .then(data => {
        allVideos.recentBroadcasts = data;
        return fetch("http://localhost:3000/recent-highlights");
      })
      .then(response => response.json())
      .then(data => {
        allVideos.recentHighlights = data;
        return fetch("http://localhost:3000/popular-clips");
      })
      .then(response => response.json())
      .then(data => {
        allVideos.popularClips = data;
        return allVideos;
      })
      .then(allVideos => {
        console.log(allVideos);
        let all = allVideos.recentBroadcasts.concat(
          allVideos.recentHighlights,
          allVideos.popularClips
        );
        this.setState({
          allVideos: all,
          recentBroadcasts: allVideos.recentBroadcasts,
          recentHighlights: allVideos.recentHighlights,
          popularClips: allVideos.popularClips
        });
      });
  }

  render() {
    if (
      this.state.recentBroadcasts === null ||
      this.state.recentHighlights === null ||
      this.state.popularClips === null
    ) {
      return <div data-testid="loading-div">Loading ...</div>;
    } else {
      return (
        <HashRouter>
          <Switch>
            <Route
              exact={true}
              path="/"
              render={() => (
                <div data-testid="main-container">
                  <RecentBroadcasts videos={this.state.recentBroadcasts} />
                  <RecentHighlights videos={this.state.recentHighlights} />
                  <PopularClips videos={this.state.popularClips} />
                  <AllVideos videos={this.state.allVideos} />
                </div>
              )}
            />
            <Route
              exact={true}
              path="/videos"
              render={() => (
                <div data-testid="main-container">
                  <RecentBroadcasts videos={this.state.recentBroadcasts} />
                  <RecentHighlights videos={this.state.recentHighlights} />
                  <PopularClips videos={this.state.popularClips} />
                  <AllVideos videos={this.state.allVideos} />
                </div>
              )}
            />
            <Route
              path="/videos/:videoId"
              render={() => (
                <div data-testid="main-container">
                  <RecentBroadcasts videos={this.state.recentBroadcasts} />
                  <RecentHighlights videos={this.state.recentHighlights} />
                  <PopularClips videos={this.state.popularClips} />
                  <AllVideos videos={this.state.allVideos} />
                </div>
              )}
            />
          </Switch>
        </HashRouter>
      );
    }
  }
}
