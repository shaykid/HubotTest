module.exports = (robot) => {
  robot.respond(/hej|hello|hi/i, (res) => {
    res.send('Hej! Jag är Ingrid, din Mars Cheap Flights-agent. Hur kan jag hjälpa dig idag?');
  });

  robot.respond(/schedule|time|when/i, (res) => {
    res.send('Vi har dagliga flyg till Mars. Vilken dag föredrar du att resa?');
  });

  robot.respond(/thank you|thanks/i, (res) => {
    res.send('Varsågod! Ha en fantastisk dag.');
  });
};
