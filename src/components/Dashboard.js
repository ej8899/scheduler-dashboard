import React, { Component } from "react";

import Loading from "./Loading";
import classnames from "classnames";
import Panel from "./Panel";

// test data
const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];


class Dashboard extends Component {
  state = { 
    loading: false,
    focused: null,
  };

  selectPanel(id) {
    console.log("selected id:",id)
    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id
    }));
  }

  render() {
    // map data to create a Panel component for each item
    const panels = (this.state.focused ? data.filter(panel => this.state.focused === panel.id) : data)
      .map((panel) => (
        <Panel
          key={panel.id}
          id={panel.id}
          label={panel.label} 
          value={panel.value}
          //onSelect={this.selectPanel}
          onSelect = { event => this.selectPanel(panel.id)}
        />
      ));

    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
    });

    if(this.state.loading) {
      return <Loading />;
    }

    return ( 
    <main className={dashboardClasses}>{panels}</main>
    );
  }
}

export default Dashboard;
