import { useEffect, useState } from "react";

const Footer = () => {
  const userName = "Hyperbarry1024";
  const apiKey = process.env.APITOKEN;
  const [lfm, setLfm] = useState({});
  useEffect(() => {
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${userName}&api_key=${apiKey}&limit=1&format=json`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("error");
      })
      .then((data) => setLfm(data) && console.log(data))
      .catch(
        () =>
          setLfm({ error: "Whoops! Something went wrong with Last.fm" }) &&
          console.log("error")
      );
  }, []);
  const buildLastFmData = () => {
    const track = lfm?.recenttracks?.track;

    if (!track) {
      return <p>Loading . . </p>;
    }

    const [
      {
        name: songName,
        artist: { "#text": artistName },
        image: [{}, { "#text": imageSrc }] = {},
      } = {},
    ] = track;

    return (
      <p>
        <img src={imageSrc} alt="logo" align="middle" />I am listening to{" "}
        {songName} by {artistName}
      </p>
    );
  };
  return buildLastFmData();
};

export default Footer;
