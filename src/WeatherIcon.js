export default function WeatherIcon(props) {
    const iconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${props.code}.png`;
  
    return (
      <img
        src={iconUrl}
        alt="weather icon"
        width={props.size}
        height={props.size}
      />
    );
  }