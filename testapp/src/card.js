import React from "react";
var Panel = require("react-bootstrap").Panel;
var Grid = require("react-bootstrap").Grid;
var Image = require("react-bootstrap").Image;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
function handleClick() {
  alert("You have clicked on me");
}
var align = {
  textAlign: "left",
  backgroundColor: "blue",
  width: "25%",
  height: "100%"
};

function card(props) {
  return (
    <Panel style={{ width: "60%", marginLeft: "20%" }} onClick={handleClick}>
      <div>
        <p style={{ fontSize: "20pt" }}>props.title</p>
        <Grid>
          <Row>
            <Col md={2}>
              <Image
                src="http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg"
                responsive
              />
            </Col>
            <Col style={{ marginLeft: "22%" }} md={3}>
              some text
            </Col>
          </Row>
        </Grid>
      </div>
    </Panel>
  );
}

export default card;
